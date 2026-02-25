# Data Model Document

**Subsistema:** Base de Datos Relacional (PostgreSQL / Supabase SOV)  
**Versión:** 1.0 (Esquema B2B/B2C Soberano)  
**Fecha:** Febrero 2026  

**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Diseño Entidad-Relación Lógico (ERD)

La arquitectura AL13 requiere un almacén relacional transaccional (ACID compliant). El esquema huye de bases NoSQL/Documentales (ej. MongoDB/Firebase Firestore) dado que las cotizaciones (`Leads`) están fuertemente vinculadas a las listas de precios e inventario físico (`Products`), exigiendo Integridad Referencial dura (`FOREIGN KEY`) para evitar cotizar perfiles descontinuados.

### 1.1 Entidades Núcleo (Core Entities)
1.  **`profiles_admin` (Gerencia AL13):** Usuarios autorizados del CMS In-house. Separada de los leads para jamás mezclar vectores de ataque Auth.
2.  **`inventory_products` (El Catálogo CMS):** El escaparate material (Vidrios, Aluminio).
3.  **`crm_leads` (El Motor B2B):** Prospects entrantes encapsulando su intención de compra y datos físicos (cotas).
4.  **`storage_assets` (El Repositorio S3):** Tabla conectora de binarios transcodificados.

---

## 2. Diccionario de Datos Físico (Data Dictionary DDL)

### 2.1 Tabla `inventory_products` (SOT Catálogo CMS)
Esta tabla es de lectura intensiva (`Read-Heavy`). Alimenta el Edge Computing.

| Columna | Tipo de Dato | Llave | Constraint/Regla (Check) | Descripción / Función |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `UUID` | **PK** | `uuid_generate_v4()` | Clave primaria opaca. |
| `slug` | `VARCHAR(100)` | UQ | `NOT NULL` | URL SEO amigable (ej: `puerta-8025`). |
| `name` | `VARCHAR(150)` | - | `NOT NULL, length > 3` | Título H1 renderizado. |
| `system_type` | `ENUM` | - | `[BATIENTE, CORREDIZA, FIJA, CORTINA]` | Filtro lógico categorización. |
| `base_price_sqm`| `DECIMAL(10,2)`| - | `> 1000.00` | Coste base x metro cuadrado (Módulo Cotizador). |
| `has_3d_model` | `BOOLEAN` | - | `DEFAULT FALSE` | Flag Booleano para inyectar Isla `<model-viewer>` en frontend Astro. |
| `is_published` | `BOOLEAN` | IDX | `DEFAULT FALSE` | *Kill-Switch*. Si False, Astro borra la URL en SSG. |
| `updated_at` | `TIMESTAMPTZ` | - | `NOW()` | Audit-trail |

### 2.2 Tabla `crm_leads` (El First-Party Data Invaluable)
Esta tabla es de mutación intensiva y alta seguridad (Índices PII enmascarados).

| Columna | Tipo de Dato | Llave | Constraint/Regla (Check) | Descripción / Función |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `UUID` | **PK** | `uuid_generate_v4()` | Ref opaca. |
| `client_email` | `VARCHAR(255)`| IDX | `UNIQUE`, Email Genérico Regex | Llave de deduplicado. |
| `segment` | `ENUM` | - | `[B2B_ARCHITECT, B2C_HOME, BUILDER]` | Tag de ruteo para el Vendedor Humano AL13. |
| `product_id` | `UUID` | **FK** | `REFERENCES inventory_products(id)` | Si AL13 borra el producto, se hace ON DELETE SET NULL. No borrar al cliente. |
| `raw_dimensions`| `JSONB` | - | Esquema Interno Válido | Json nativo. `{ w: 300, h: 210, g: "8mmT" }`. Permite analítica compleja B2B sin re-migrar columnas. |
| `status` | `ENUM` | - | `[NEW, QUOTED, WON, LOST]` | Estado en Embudo (Kanban Admin). |

### 2.3 Tabla Conectora `storage_assets` (Gestor de S3 - Cloudflare R2)
Separa la URL física pesada del producto de texto, para auditoría de Orfandad (Garbage Collection de fotos vírgenes).

| Columna | Tipo de Dato | Llave | Constraint/Regla (Check) | Descripción / Función |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `UUID` | **PK** | `uuid_generate_v4()` | Identificador |
| `product_id` | `UUID` | **FK** | `REFERENCES inventory_products(id) ON DELETE CASCADE`| Ligar activo 3D/Foto al Modelo base. |
| `bucket_key` | `TEXT` | UQ | `NOT NULL` | (ej. `obras/2026/fachada-oro.avif`) |
| `asset_type` | `ENUM` | - | `[IMAGE_WEBP, GLB_3D, PDF_MANUAL]`| Descriptor Render Engine. |
| `byte_size` | `INTEGER` | - | `MAX 15728640 (15 MB)` | Candado duro 3D en la BD impidiendo inyección Gygabyte B2C. |

---

## 3. Seguridad de Capa de Datos (Data Governance)

Dado que Templados AL13 aloja First-Party Data B2B (Mina de Oro de Prospectos), se instruyen tácticas severas (Row Level Security):

### 3.1 Aislamiento de Mutaciones (RLS Policies)
La BD Postgres activará la Seguridad a Nivel de Fila (`ENABLE ROW LEVEL SECURITY`). Esto asegura que si el servidor intermedio (Worker Edge Node) sufre un RCE (Remote Code Execution) y alguien corre una querie global `SELECT * FROM crm_leads;`, Postgres devolverá $0$ resultados porque el RLS restringe las lecturas únicamente al JWT validado con Claim explícito de Rol Gerencial Administrativo.

### 3.2 Índices Predictivos de Operación CMS
Para velar por el *Performance* del filtro de Catálogo del Dueño de AL13 cuando alcance 10,000 obras, se impone un Índice Compuesto B-Tree para el Dashboard:
`CREATE INDEX idx_products_cmscache ON inventory_products(is_published, updated_at DESC);`
(Recurso vital para el Query principal que arma el SSG de Astro velozmente).

---
*Fin Documentación de Estructura de Datos (Data Model). Base fundacional atómica, libre de acoplamientos y redundancias, lista para instanciar migraciones Prisma u ORMs asíncronos limpios.*
