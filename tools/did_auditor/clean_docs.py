import os
import re

docs_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'docs')

def clean_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove DID state
    new_content = content.replace("**ESTADO DID:** `[DID_CERTIFIED]`\n\n", "")
    new_content = new_content.replace("**ESTADO DID:** `[DID_CERTIFIED]`\n", "")
    
    # Remove old feedback blocks
    pattern = re.compile(r"---\n> 🛡️ \*\*\[REPORTE DID.*?---\n", re.DOTALL)
    new_content = re.sub(pattern, "", new_content)
    
    pattern2 = re.compile(r"> 🔴 \*\*\[MENSAJE DE DID.*?---\n\n", re.DOTALL)
    new_content = re.sub(pattern2, "", new_content)
    
    # Clean up empty lines at start
    new_content = new_content.lstrip()

    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Limpiado: {os.path.basename(file_path)}")

if os.path.exists(docs_dir):
    for root, dirs, files in os.walk(docs_dir):
        for f in files:
            if f.endswith('.md'):
                clean_file(os.path.join(root, f))
