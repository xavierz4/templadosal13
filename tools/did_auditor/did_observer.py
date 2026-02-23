import os
import time
import logging
import json
import textstat
import argparse
import chromadb
import networkx as nx
from langchain_text_splitters import MarkdownHeaderTextSplitter
from openai import OpenAI
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configuración
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOCS_DIR = os.path.join(BASE_DIR, "docs")
SRC_DIR = os.path.join(BASE_DIR, "src")
LOG_FORMAT = "%(asctime)s - %(levelname)s - %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)

# Intentar instanciar cliente OpenAI (Compatible con OpenRouter / OpenAI nativo)
# Por defecto buscará OPENAI_API_KEY o OPENROUTER_API_KEY en .env
client = None
try:
    if os.getenv("OPENROUTER_API_KEY"):
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=os.getenv("OPENROUTER_API_KEY")
        )
        MODEL_NAME = os.getenv("DID_MODEL", "google/gemini-pro") # U otro modelo de OpenRouter
    elif os.getenv("OPENAI_API_KEY"):
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        MODEL_NAME = os.getenv("DID_MODEL", "gpt-4-turbo")
except Exception as e:
    logging.warning(f"No se pudo inicializar el cliente LLM: {e}")

# Configuración Serverless
DID_DATA_DIR = os.getenv("DID_DATA_DIR", os.path.join(BASE_DIR, ".did_data"))
VECTOR_DIR = os.path.join(DID_DATA_DIR, "vectors")
GRAPH_FILE = os.path.join(DID_DATA_DIR, "graph.json")

def get_chroma_client():
    os.makedirs(VECTOR_DIR, exist_ok=True)
    return chromadb.PersistentClient(path=VECTOR_DIR)

def load_local_graph():
    if os.path.exists(GRAPH_FILE):
        try:
            with open(GRAPH_FILE, 'r') as f:
                data = json.load(f)
            return nx.node_link_graph(data)
        except Exception as e:
            logging.warning(f"Error cargando grafo: {e}")
            return nx.DiGraph()
    return nx.DiGraph()

def save_local_graph(G):
    os.makedirs(DID_DATA_DIR, exist_ok=True)
    data = nx.node_link_data(G)
    with open(GRAPH_FILE, 'w') as f:
        json.dump(data, f, indent=4)

def build_hybrid_index():
    """Indexa documentos [DID_CERTIFIED] en ChromaDB Local (Persistente) y NetworkX (Grafo en RAM -> Disco)."""
    chroma_client = get_chroma_client()
    local_graph = nx.DiGraph()

    # Preparar ChromaDB
    try:
        collection = chroma_client.get_or_create_collection(name="did_docs")
        if collection.count() > 0:
            chroma_client.delete_collection(name="did_docs")
            collection = chroma_client.get_or_create_collection(name="did_docs")
    except Exception as e:
        logging.error(f"Error con colección Chroma Local: {e}")
        return

    # Text Splitter CAC
    headers_to_split_on = [
        ("#", "Header 1"),
        ("##", "Header 2"),
        ("###", "Header 3"),
    ]
    markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers_to_split_on)

    docs_indexed = 0
    if os.path.exists(DOCS_DIR):
        for root, _, files in os.walk(DOCS_DIR):
            for file in files:
                if file.endswith('.md'):
                    path = os.path.join(root, file)
                    try:
                        with open(path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            if "[DID_CERTIFIED]" in content:
                                # 1. ChromaDB (Context-Aware Chunking)
                                chunks = markdown_splitter.split_text(content)
                                for i, chunk in enumerate(chunks):
                                    chunk_id = f"{file}_chunk_{i}"
                                    collection.add(
                                        documents=[chunk.page_content],
                                        metadatas=[{**chunk.metadata, "source": file}],
                                        ids=[chunk_id]
                                    )
                                
                                # 2. NetworkX Graph Insertion (Documento -> Contiene -> Sección)
                                local_graph.add_node(file, type="Document", status="DID_CERTIFIED")
                                for chunk in chunks:
                                    section = chunk.metadata.get("Header 1", "General")
                                    local_graph.add_node(section, type="Section")
                                    local_graph.add_edge(file, section, relation="CONTAINS")
                                        
                                docs_indexed += 1
                                logging.info(f"✅ Indexado en Grafo/Vector Local: {file}")
                    except Exception as e:
                        logging.error(f"Error indexando {file}: {e}")

    save_local_graph(local_graph)
    logging.info(f"🎯 Reindexación completa. {docs_indexed} documentos procesados. Almacenado en {DID_DATA_DIR}")

def get_hybrid_context(query_text):
    """Obtiene contexto dinámico desde ChromaDB y Neo4j basado en el documento."""
    context_str = "--- [RAG HÍBRIDO (VECTORES + GRAFO)] ---\n"
    
    # 1. ChromaDB Vectors
    chroma_client = get_chroma_client()
    if chroma_client:
        try:
            collection = chroma_client.get_collection(name="did_docs")
            results = collection.query(
                query_texts=[query_text[:1000]], # Consultar con las primeras líneas
                n_results=3
            )
            context_str += "FRAGMENTOS VECTORIALES SIMILARES (CHROMA):\n"
            for i, doc in enumerate(results['documents'][0]):
                meta = results['metadatas'][0][i]
                context_str += f"- De {meta.get('source', 'unknown')} ({meta.get('Header 1','')}): {doc[:300]}...\n"
        except Exception:
            context_str += "Base Vectorial vacía o inaccesible.\n"

    # 2. NetworkX Graph
    G = load_local_graph()
    if len(G.nodes) > 0:
        context_str += "\nESTRUCTURA DE GRAFOS LOGICOS (NetworkX):\n"
        docs_graph = [n for n, attr in G.nodes(data=True) if attr.get("type") == "Document"]
        for doc in docs_graph[:5]:
            sections = [v for u, v, d in G.edges(data=True) if u == doc and d.get("relation") == "CONTAINS"]
            context_str += f"- El documento '{doc}' legisla sobre las secciones: {', '.join(sections)}\n"
    else:
        context_str += "Grafo vacío.\n"

    return context_str + "--------------------------------------\n"

def get_codebase_map():
    """Retorna un mapa profundo del código leyendo configs reales (Anti-Drift)."""
    code_map = []
    
    # 1. Leer dependencias crudas (package.json)
    package_json = os.path.join(BASE_DIR, "package.json")
    if os.path.exists(package_json):
        try:
            with open(package_json, 'r') as f:
                data = json.load(f)
                deps = list(data.get("dependencies", {}).keys()) + list(data.get("devDependencies", {}).keys())
                code_map.append(f"DEPENDENCIAS REALES INSTALADAS: {', '.join(deps)}")
        except Exception:
            pass

    # 2. Análisis del árbol de src/
    if os.path.exists(SRC_DIR):
        code_map.append("\nESTRUCTURA DE CÓDIGO:")
        for root, dirs, files in os.walk(SRC_DIR):
            dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'dist', 'build']]
            level = root.replace(SRC_DIR, '').count(os.sep)
            indent = ' ' * 4 * (level)
            code_map.append(f"{indent}{os.path.basename(root)}/")
            subindent = ' ' * 4 * (level + 1)
            for f in files:
                code_map.append(f"{subindent}{f}")
                
    return "\n".join(code_map) if code_map else "No se detectó configuración ni directorio /src."

DID_SYSTEM_PROMPT_TEMPLATE = """
Eres el Agente DID 2.0 (Directiva de Integridad Documental), Arquitecto Senior de BigTech L8.
Tu misión es actuar como el "filtro de verdad" que impide que la documentación del sistema se degrade.
Actúas como QA de los agentes Layer 1 (como "The Scriber").

Capacidades:
A. Auditoría de Densidad de Datos: Exige reemplazo de abstracciones por métricas y especificaciones.
B. Fact-Check Cross-Reference (Knowledge Graph):
   TIENES ACCESO A LA MEMORIA VERDADERA DEL SISTEMA (Documentos Certificados).
   Si el documento que auditas contradice lo ya certificado, RECHÁZALO INMEDIATAMENTE por 'Fact-Drift'.
C. Anti Code-Drift:
   Tienes visión del árbol del código real. Si el documento dice que usamos "React" pero el /src tiene archivos ".astro", RECHÁZALO.
D. Detección de Vacíos Estructurales: Evalúa Seguridad, Escalabilidad, Errores y Costo.
E. Trazabilidad: Valida que los requisitos funcionales florezcan desde la visión a la implementación.

--- [MEMORIA DE RED: DOCUMENTOS YA CERTIFICADOS] ---
{knowledge_graph}
----------------------------------------------------

--- [ÁRBOL DE CÓDIGO FUENTE REAL: /src] ---
{code_map}
-------------------------------------------

ESTADOS DID QUE PUEDES ASIGNAR:
1. [DID_REJECTED]: Falla en densidad, hay contradicción con el Knowledge Graph o hay Code-Drift.
2. [DID_PARTIAL]: Forma correcta pero hay vacíos de información o suposiciones sin base.
3. [DID_CERTIFIED]: Documento inmutable, denso y coherente sistémicamente.

REGLAS DE RESPUESTA:
- Realiza tu auditoría del documento proporcionado.
- Si el documento está perfecto y no contradice al Grafo, responde SOLO con `[DID_CERTIFIED]`.
- Si fallan las premisas matemáticas, lógicas o de código, comienza con `[DID_REJECTED]` o `[DID_PARTIAL]` y da un feedback HIPER-INCISIVO.
"""

# Archivo persistente para Circuit Breaker
STATE_FILE = os.path.join(DOCS_DIR, ".did_state.json")

class DIDAuditor:
    def __init__(self):
        self.state = self.load_state()
        self.issues_file = os.path.join(DOCS_DIR, ".did_issues.json")

    def load_state(self):
        if os.path.exists(STATE_FILE):
            try:
                with open(STATE_FILE, 'r') as f:
                    return json.load(f)
            except json.JSONDecodeError:
                return {}
        return {}

    def save_state(self):
        with open(STATE_FILE, 'w') as f:
            json.dump(self.state, f, indent=4)

    def process_file(self, file_path):
        if not file_path.endswith('.md'):
            logging.error("❌ El archivo debe ser un markdown (.md)")
            return

        if not os.path.exists(file_path):
            logging.error(f"❌ No se encontró el archivo: {file_path}")
            return

        logging.info(f"🔍 [DID Auditor] Iniciando auditoría bajo demanda: {os.path.basename(file_path)}")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Circuit Breaker Check
            filename = os.path.basename(file_path)
            reject_count = self.state.get(filename, 0)
            
            if reject_count >= 3:
                logging.error(f"🔌 [DID Circuit Breaker] El archivo {filename} ha superado los 3 rechazos límite.")
                cb_message = "[DID_CIRCUIT_BREAKER_TRIPPED] Intervención humana requerida. Solucionar el archivo, y eliminar el registro de issues manualmente para rearmar el circuito."
                self.apply_feedback(file_path, content, cb_message, track_reject=False)
                return

            if "[DID_CERTIFIED]" in content:
                logging.info(f"✅ [DID Auditor] Archivo ya certificado. Ignorando: {filename}")
                if filename in self.state:
                    del self.state[filename]
                    self.save_state()
                return

            # Textstat Linguistic Check (Flesch Reading Ease)
            # Scores: 0-30 (Excesivamente complejo/Universitario), 90-100 (Muy fácil)
            flesch_score = textstat.flesch_reading_ease(content)
            logging.info(f"📊 [DID Textstat] Índice Flesch: {flesch_score}")
            if flesch_score < 10:
                logging.warning(f"🛑 [DID Textstat] Contenido matemáticamente ininteligible. Score: {flesch_score}. Se rechaza preventivamente.")
                self.apply_feedback(file_path, content, "[DID_REJECTED]\nEl texto tiene una complejidad ciclomática lingüística inaceptable (Flesch Score < 10). Reestructura en viñetas, tablas o oraciones más cortas.")
                return

            logging.info(f"🧠 [DID Observer] Iniciando evaluación LLM para {filename}...")
            
            # Recolectar contexto global (GraphRAG On-Demand)
            hybrid_knowledge = get_hybrid_context(content)
            codebase_map = get_codebase_map()
            dynamic_prompt = DID_SYSTEM_PROMPT_TEMPLATE.format(
                knowledge_graph=hybrid_knowledge,
                code_map=codebase_map
            )

            if client is None:
                logging.error("❌ Cliente LLM no configurado. Simulación local.")
                feedback = "[DID_PARTIAL]\n[Simulación] Cliente LLM no configurado. Revisa la densidad del contenido."
            else:
                response = client.chat.completions.create(
                    model=MODEL_NAME,
                    temperature=0.2,
                    messages=[
                        {"role": "system", "content": dynamic_prompt},
                        {"role": "user", "content": f"Documento actual a revisar:\n\n{content}"}
                    ]
                )
                feedback = response.choices[0].message.content.strip()

            self.apply_feedback(file_path, content, feedback)

        except Exception as e:
            logging.error(f"❌ Error al procesar el archivo {file_path}: {e}")

    def apply_feedback(self, file_path, original_content, feedback, track_reject=True):
        logging.info(f"📝 [DID Auditor] Emitiendo veredicto para el archivo...")
        filename = os.path.basename(file_path)
        
        # Cargar archivo de issues
        issues = {}
        if os.path.exists(self.issues_file):
            try:
                with open(self.issues_file, 'r') as f:
                    issues = json.load(f)
            except Exception:
                pass

        # Si el LLM decide que está perfecto
        if feedback.startswith("[DID_CERTIFIED]") or "[DID_CERTIFIED]" in feedback[:50]:
            logging.info(f"🏆 [DID Auditor] El documento ha sido CERTIFICADO.")
            new_content = f"**ESTADO DID:** `[DID_CERTIFIED]`\n\n{original_content}"
            if filename in self.state:
                del self.state[filename]
                self.save_state()
            if filename in issues:
                del issues[filename]

            # Escribir el sello en el Markdown (es la ÚNICA vez que lo tocamos)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            logging.warning(f"🛑 [DID Auditor] El documento fue RECHAZADO o requiere trabajo.")
            if track_reject:
                self.state[filename] = self.state.get(filename, 0) + 1
                self.save_state()
            
            # Guardar el feedback en el archivo de issues JSON separando de la vista pura del Markdown
            issues[filename] = {
                "status": "REJECTED_OR_PARTIAL",
                "failures_count": self.state.get(filename, 1),
                "did_feedback": feedback
            }

        # Guardar issues file
        with open(self.issues_file, 'w', encoding='utf-8') as f:
            json.dump(issues, f, indent=4)
            
        logging.info(f"✅ [DID Auditor] Veredicto procesado. Feedback guardado en {os.path.basename(self.issues_file)} (si aplica).")

def main():
    parser = argparse.ArgumentParser(description="DID Auditor (On-Demand)")
    parser.add_argument("file", nargs="?", help="Ruta al archivo Markdown a auditar.")
    parser.add_argument("--reindex", action="store_true", help="Reindexa todos los documentos certificados en el motor GraphRAG (Neo4j/ChromaDB).")
    args = parser.parse_args()

    auditor = DIDAuditor()

    if args.reindex:
        logging.info("🛠️ [DID Motor] Iniciando reindexación GraphRAG/CAC...")
        build_hybrid_index()
        return

    if args.file:
        auditor.process_file(args.file)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
