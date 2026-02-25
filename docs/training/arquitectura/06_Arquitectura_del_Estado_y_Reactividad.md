

# Módulo 6: La Arquitectura del Estado (State Management)

El manejo del estado (State Management) es la causa número uno de bugs, cuellos de botella y código espagueti en las aplicaciones Frontend modernas. Entender *cuándo* y *dónde* guardar un dato es la diferencia entre un Junior y un Lead Engineer.

## 1. La Trampa del Global State y la Muerte de Redux

A principios de la era React (2015-2018), Facebook implantó la idea de que **todo** el estado de la aplicación debía vivir en un único gran árbol global inmutable, popularizando herramientas como **Redux**.

*   **El Error:** Se metía *todo* ahí dentro. Desde el `currentUser` hasta si un dropdown minúsculo del menú estaba "abierto" o "cerrado".
*   **La Consecuencia:** Para cambiar un mísero color de botón, debías escribir 4 archivos (Actions, Reducers, Types, Selectors). El *Boilerplate* (código repetitivo de configuración) ralentizó el desarrollo global a niveles absurdos. Redux resolvió un problema de grandes corporaciones, pero masacró a las Startups.

## 2. Los 3 Niveles del Estado Moderno

Hoy en día, el estado no se trata como una masa uniforme, sino que se categoriza arquitectónicamente:

1.  **Estado Local (Component State/UI State):**
    *   *Ejemplo:* Un `<input>` donde escribes tu nombre o un acordeón desplegado.
    *   *Regla:* Este estado **nace, vive y muere** dentro de su componente. En Svelte usas simplemente `let isOpen = false;`. **NUNCA** eleves esto a una variable global.
2.  **Estado del Servidor (Server/Cache State):**
    *   *Ejemplo:* La lista de leads del CRM o el catálogo de productos.
    *   *Regla:* Este dato **no es tuyo**, es prestado de la Base de Datos. Utilizas herramientas de mutación y caché asíncrona que entienden de "Loading", "Error" y "Refetching". No lo guardes en una variable global tuya; deja que la caché lo maneje.
3.  **Estado Global Compartido (Application State):**
    *   *Ejemplo:* El Token del usuario logueado o el modo Oscuro/Claro (`theme`). Cosas que realmente 50 componentes dispares necesitan leer a la vez.

## 3. Signals y NanoStores: El Puente B2B (Ecosistema Astro)

En el contexto profundo de **Astro (Islands Architecture)**, donde convergen islas separadas que no se hablan fácilmente (Ej: El Botón de Comprar B2B y el Carrito B2C), los "Contextos" tradicionales mueren.

### La Revolución de los Signals (Atomic State)
Un *Signal* (Señal) es una envoltura alrededor de un valor que notifica automáticamente a los suscriptores cuando su valor cambia. No renderiza la página entera, solo re-pinta la variable exacta que cambió en el DOM.

### NanoStores en Templados AL13
Para comunicar la *Calculadora Paramétrica Svelte* con la *Barra de Notificaciones Astro*, usamos **NanoStores**.
*   **Zero-Dependency:** No amarra tu framework. Funciona con Svelte, React y Vanilla JS.
*   **Átomos Ligeros:** Creas "Átomos" minúsculos: `export const cartItems = atom([]);`. Ambos componentes importan la variable y reaccionan en microsegundos, sin bloqueos del Thread Principal.

> **Lección de Lead Architect:** Limita el Estado Global a cero. Trata de mantener todo local. Si dos islas deben hablar obligatoriamente (Ej: El Panel de Filtros y la Galería de Obras), usa un Átomo de NanoStores. Nada más.
