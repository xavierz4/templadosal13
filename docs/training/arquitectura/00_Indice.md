**ESTADO DID:** `[DID_CERTIFIED]`

# 🏛️ Máster en Arquitectura de Software: De Código Espagueti a Ingeniería de Élite

Bienvenido al curso fundamental de arquitectura de sistemas, patrones de diseño y buenas prácticas. Este material ha sido estructurado con un **enfoque holístico e histórico**, para que no solo memorices "qué hacer", sino que entiendas **por qué** la humanidad tuvo que inventar estas reglas para evitar colapsar la economía mundial por bugs de software.

La carpeta contenedora de este curso es `docs/training/arquitectura/`.

## 📖 Índice del Curso

### [Módulo 1: La Era Oscura y el Nacimiento de las Reglas (Historia)](01_Historia_del_Software.md)
*   **La crisis del software (1960s):** Cuando el hardware era más barato que la memoria humana.
*   **GOTO y el Código Espagueti:** El villano que originó el caos.
*   **La Programación Estructurada (Dijkstra):** El primer rescate.
*   **La Revolución Orientada a Objetos (OOP):** Simulando el mundo real en silicio.

### [Módulo 2: Los Principios Inquebrantables (SOLID & Clean Code)](02_Principios_SOLID_y_Clean_Code.md)
*   **¿Qué es Clean Code?** El pacto de lectura entre humanos.
*   **S.O.L.I.D:** Los 5 mandamientos de Robert C. Martin (Uncle Bob).
    *   Single Responsibility (Responsabilidad Única).
    *   Open/Closed (Abierto/Cerrado).
    *   Liskov Substitution (Sustitución de Liskov).
    *   Interface Segregation (Segregación de Interfaces).
    *   Dependency Inversion (Inversión de Dependencias).

### [Módulo 3: Patrones de Diseño Clásicos (The Gang of Four)](03_Patrones_de_Diseno_Clasicos.md)
*   **¿Qué es un patrón de diseño?** Recetas universales para problemas repetitivos.
*   **Patrones Creacionales:** Factory, Singleton (y por qué ahora se odia).
*   **Patrones Estructurales:** Adapter (El enchufe universal), Facade.
*   **Patrones de Comportamiento:** Observer (Eventos reactivos), Strategy.

### [Módulo 4: La Evolución de la Arquitectura (De Monolitos a Microservicios)](04_Evolucion_Arquitectonica.md)
*   **El MVC Clásico (Data-Driven):** Model, View, Controller y la tiranía de la Base de Datos.
*   **Clean Architecture & Arquitectura Hexagonal:** Aislando el dominio de los periféricos.
*   **Domain-Driven Design (DDD):** Hablando el idioma del negocio (El "Ubiquitous Language").
*   **Monolitos vs Microservicios:** La guerra moderna.

### [Módulo 5: Arquitecturas Modernas de Frontend (Isomorfismo y Vertical Slices)](05_Arquitecturas_Frontend.md)
*   **SPA vs SSG vs SSR:** Next.js, Astro y la reconciliación con el servidor.
*   **Vertical Slice Architecture (VSA):** Rompiendo las capas invisibles.
*   **El Manifiesto HSA (Hex-Sovereign Architecture):** La síntesis purista (Core, Shared, Modules) que rige a Templados AL13.

### [Módulo 6: La Arquitectura del Estado (State Management)](06_Arquitectura_del_Estado_y_Reactividad.md)
*   La trampa del Global State y la Muerte de Redux.
*   Variables Derivadas y Memorización.
*   Signals y NanoStores: El puente atómico entre Svelte y Astro para B2B.

### [Módulo 7: Arquitectura de Pruebas (TDD & Fail-Fast)](07_Arquitectura_de_Pruebas_y_TDD.md)
*   El código no termina cuando compila, termina cuando pasa las pruebas.
*   La Pirámide de Testing (Unit, Integration, E2E) con Vitest y Playwright.
*   Test-Driven Development (TDD) en el Ecosistema B2C.

### [Módulo 8: Seguridad Integral (Zero-Trust & Auth)](08_Seguridad_Zero_Trust_y_Auth.md)
*   Vulnerabilidades XSS y el suicidio del `localStorage`.
*   El Péndulo Criptográfico: Argon2id y Supabase GoTrue.
*   Cookies `HttpOnly` y Protección CSRF perimetral.

### [Módulo 9: Comunicación Asíncrona y Resiliencia (APIs)](09_Comunicacion_Asincrona_y_APIs.md)
*   Rest vs tRPC vs GraphQL.
*   Manejo de Errores Fronterizos (Boundary Catchers) y Rate Limiting.
*   Estados Offline y Dead Letter Queues para resiliencia B2B.

### [Módulo 10: Caso de Estudio - Arquitectura de Templados AL13](10_Caso_Estudio_Arquitectura_AL13.md)
*   **La Decisión Híbrida:** Por qué elegimos Astro + Supabase frente a un Monorepo tradicional (Nx/Turborepo) o un Monolito Node.js.
*   **Estructura HSA (Hex-Sovereign Architecture):** Diseccionando `core`, `shared` y `modules`.
*   **Protección por Compilador:** Ejemplos prácticos de cómo mantener secretos a salvo sin separar carpetas de Front y Back.
*   **PWA (Progressive Web App):** La estrategia para dominar el ecosistema móvil B2B/B2C sin React Native.

---

> *"Cualquier tonto puede escribir código que un ordenador entienda. Los buenos programadores escriben código que los humanos puedan entender."* — Martin Fowler
