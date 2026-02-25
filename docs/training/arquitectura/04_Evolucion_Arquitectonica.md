

# Módulo 4: Evolución Arquitectónica (De Monolitos a DDD)

A nivel holístico, hay una máxima atemporal en la informática estructural orientada a negocio: *"El software refleja los cuellos de botella de la época en la que fue concebido".*

## 1. El Paradigma Original: Data-Driven Development 
*(Años 70s - 2000s: La dictadura del Administrador de Base de Datos - DBA)*

En las primeras décadas empresariales (Sistemas transaccionales, SAPs tempranos), **el Dios del sistema era la Base de Datos Relacional (Oracle/SQL).** 
La arquitectura se diseñaba al revés de como lo hacemos hoy: 
1. Se dibujaba el diagrama de la Base de Datos.
2. Se construían vistas (UI) simples cuyo único propósito era hacer un "CRUD" hacia esas tablas maestras.

Aquí predominó el **Patrón MVC (Model-View-Controller)** en frameworks pesados (Rails, Django, Spring).
*   **El Problema:** Que el "Modelo" (el objeto de negocio) estaba fuertemente acoplado (ActiveRecord) a una tabla específica de la base de datos. Si tratabas de simular una lógica matemática volátil antes de guardarla, te enfrentabas a rigideces monstruosas dictadas por llaves foráneas.

## 2. La Liberación del Negocio: Domain-Driven Design (DDD)
*(2003: Eric Evans publica The Blue Book)*

El mundo se dio cuenta de algo crítico: **La Base de Datos es un detalle técnico, no el alma de la aplicación.** El alma de un software bancario no es MySQL; es la lógica de cuánto cobrar por interés bancario.

DDD revolucionó la arquitectura dictando:
1.  **Ubiquitous Language (Lenguaje Ubicuo):** Programadores y dueños del negocio (Stakeholders) deben hablar igual. Si ventas usa la palabra "Cotización Abierta", en la línea de código la variable debe llamarse `openQuotation`, no `dataReqRow`.
2.  **Domain Isolation:** Toda la lógica pesada del negocio se modela en el centro absoluto del sistema (El Domain). No importa MySQL, no importa si se renderiza en HTML o en la consola; las reglas de las matemáticas son agnósticas.

## 3. Clean Architecture y Arquitectura Hexagonal
*(2010s: Uncle Bob & Alistair Cockburn)*

Para soportar físicamente el concepto DDD, nacieron estas dos super-arquitecturas. Visualmente, se las llama "The Onion Architecture" (La Cebolla).

**La regla de oro del Grafo de Dependencias:**
Los círculos externos pueden apuntar e importar código de los círculos internos, pero NUNCA al revés.

1.  **Entidades de Dominio (Núcleo Central inmutable).** Matemáticas y validaciones base.
2.  **Casos de Uso (Aplicación).** La coreografía: "Obtén datos, valida, guarda usando puertos de infraestructura".
3.  **Adaptadores de Interfaz.** (Controladores, presentadores de JSON HTTP).
4.  **Frameworks & Drivers (El Anillo Externo).** React, Axios, PostgreSQL, Angular, Svelte. Las herramientas descartables que la industria reemplaza cada 4 años. 

> *Nota histórica de Lead Architect: La separación estricta protege el núcleo del sistema de los caprichos del hype tecnológico (No nos importa si se puso de moda GraphQL o Rust).*

## 4. La Era de Escalar: Monolito vs Microservicios
Con el paradigma en la nube AWS/Azure en su pico, las FAANG introdujeron un debate mortal:

*   **Monolito Majestic:** Todo el despliegue (El carrito, el login, catalogación) vive en un solo servidor maestro. Es fácil de probar, fácil de desplegar, pero difícil de escalar organizativamente si 5,000 personas editan la misma rama de git.
*   **Microservicios distribuidos:** El código se fragmenta en 200 pequeños miniprogramas con sus mini-bases de datos propias (El microservicio de Login no toca la DB del carrito). Hablan JSON entre ellos.
    *   *El fracaso oculto:* El 90% de las empresas que trataron de imitar a Netflix cayeron en desgracia. Reemplazaron la complejidad de un código espagueti con la infinita complejidad de "Redes colapsadas, latencias, latencias inter-nodo e inconsistencia eventual". Microservicios resuelven un problema de **Organización Humana**, no un problema técnico.

> *Para el año 2026, gigantes como Prime Video revirtieron partes de sus microservicios a Monolitos hiper-modulares para ahorrar millones.*
