# 🧠 Biblioteca de Prompts Profesionales (Agentic Framework)

Esta carpeta (`.agents/prompts/`) contiene los **Prompts de Sistema y Flujos de Trabajo** agnósticos y reutilizables. 

## ¿Por qué separar esto de `docs/`?
- **`docs/`** es para humanos y el estado actual del proyecto (ej. "Cómo funciona la API de pagos").
- **`.agents/`** es el "cerebro" y las instrucciones de los Agentes IA (ej. "Cómo debes programar un nuevo endpoint de pagos usando TDD"). 
Al separarlos, evitamos que los agentes se confundan entre *lo que es el proyecto* y *cómo deben construir el proyecto*.

## Estructura Espejo
La estructura de esta biblioteca imita a `docs/` para mantener trazabilidad:

- 📂 `product/`: Prompts para idear, planificar y definir requerimientos (Product Manager Agent).
- 📂 `design/`: Prompts para sistemas de diseño, UI/UX (Designer Agent).
- 📂 `architecture/`: Prompts para decisiones de infraestructura y diagramas (Architect Agent).
- 📂 `engineering/`: Prompts operativos para escribir código, tests y refactorizar (Coder Agent).
- 📂 `security/` & 📂 `testing/`: Prompts para auditorías y QA (Reviewer Agent).

---
*💡 Tip de Senior Agentico: Usa estos prompts como plantillas base y pégalos en la IA al iniciar una nueva tarea en cada fase del ciclo de vida del software.*
