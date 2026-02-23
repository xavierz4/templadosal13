import os
import stat
import sys

HOOK_CONTENT = """#!/usr/bin/env bash

# GIT PRE-COMMIT HOOK: Agente DID (Directiva de Integridad Documental)
# Este script bloquea el commit si hay archivos .md modificados en /docs
# que no tengan el sello corporativo [DID_CERTIFIED] en la cabecera.

DOCS_DIR="docs"

# Obtener lista de archivos .md que están staged y dentro de /docs
files=$(git diff --cached --name-only --diff-filter=ACM | grep "^$DOCS_DIR/.*\.md$")

if [ -z "$files" ]; then
    exit 0 # No hay doc stageados, continuar.
fi

echo -e "\\e[33m🔍 [DID Hook] Analizando integridad documental pre-commit...\\e[0m"

FAILED=0

for file in $files; do
    # Buscar el sello en las primeras 20 líneas para eficiencia
    if ! head -n 20 "$file" | grep -q "\[DID_CERTIFIED\]"; then
        echo -e "\\e[31m❌ [DID REJECTED] El archivo '$file' NO ESTÁ CERTIFICADO.\\e[0m"
        echo -e "\\e[31m   El Agente DID debe evaluarlo y asignar [DID_CERTIFIED] antes de pushear a producción.\\e[0m"
        FAILED=1
    else
        echo -e "\\e[32m✅ [DID APPROVED] '$file' contiene el sello de certificación.\\e[0m"
    fi
done

if [ $FAILED -eq 1 ]; then
    echo -e "\\e[1;41m BLOQUEO CRÍTICO: Commit abortado por el Agente DID. \\e[0m"
    echo "Asegúrate de ejecutar 'python did_observer.py' y corregir el feedback de la IA."
    exit 1
fi

exit 0
"""

def install_hook():
    git_dir = os.path.join(os.getcwd(), '.git')
    
    if not os.path.exists(git_dir):
        print("❌ Error: No se encontró el directorio '.git'. Ejecuta 'git init' primero.")
        sys.exit(1)

    hooks_dir = os.path.join(git_dir, 'hooks')
    if not os.path.exists(hooks_dir):
        os.makedirs(hooks_dir)

    hook_path = os.path.join(hooks_dir, 'pre-commit')

    try:
        with open(hook_path, 'w', encoding='utf-8') as f:
            f.write(HOOK_CONTENT)
        
        # Dar permisos de ejecución
        st = os.stat(hook_path)
        os.chmod(hook_path, st.st_mode | stat.S_IEXEC)
        
        print(f"🎯 [DID Success] Hook 'pre-commit' instalado exitosamente en {hook_path}")
        print(f"🛡️  A partir de ahora, DID bloqueará cualquier commit de documentación no certificada.")
    except Exception as e:
        print(f"❌ Error al instalar el hook: {e}")
        sys.exit(1)

if __name__ == "__main__":
    install_hook()
