# Módulo 10: Caso de Estudio Práctico - La Arquitectura Definitiva de Templados AL13

**ESTADO DID:** `[DID_CERTIFIED]`

Bienvenidos a la guinda del pastel del Máster en Arquitectura de Software. Hasta ahora, hemos hablado de teoría, historia y patrones abstractos. En este módulo, aterrizamos en el mundo real, en la trinchera del proyecto **Templados AL13**.

Daremos una mirada quirúrgica a *qué* decisiones tomamos, pero lo más importante, **por qué** las tomamos, huyendo de las modas y priorizando el flujo de caja, la escalabilidad táctica y la seguridad.

---

## 1. El Dilema Inicial: ¿Cómo empaquetamos el proyecto?

Imagina que eres el Lead Architect de AL13. Necesitas un Frontend rápido para vender (Landing SEO, Catálogo) y un Backend seguro para cotizar (B2B Quoter) y administrar (CMS).

**La opción Clásica de Big Tech (Monorepo Físico - Turborepo):**
En una corporación gigante, la regla es separar físicamente. Tendrías una carpeta `apps/frontend` y otra `apps/backend`.
*   **¿Por qué es ideal teóricamente?** Porque si el Frontend y el Backend están en diferentes "islas" físicas, es imposible que un desarrollador Junior mezcle código y mande accidentalmente claves secretas al navegador del cliente.
*   **El Problema en el Mundo Startup (AL13):** Cuando eres un equipo ágil (o estás iterando rápido con IA), mantener dos proyectos distintos duplica el trabajo. Tienes que compilar ambos, copiar tipos (Tipados TS) del backend al frontend para que no haya errores, y lidiar con dolores de cabeza de configuración de librerías cruzadas.

**La Decisión AL13: El Monolito Modular (Framework Astro BFF)**
Optamos por juntar Frontend y Backend en la misma estructura base `src/`, utilizando el concepto de **BFF (Backend for Frontend)** provisto por Astro.

### **Ejemplo de Por Qué esto es superior para AL13:**
Imagina que necesitas añadir el campo "Descuento VIP" a la cotización B2B.
*   **En la Arquitectura Big Tech:**
    1. Abre el repositorio/carpeta del Backend. Modifica el Endpoint `POST /cotizar`.
    2. Modifica la Base de Datos.
    3. Copia el nuevo tipado TS. Cierra el repositorio Backend.
    4. Abre el repositorio/carpeta del Frontend. Pega el tipado.
    5. Modifica la UI de Svelte para añadir el Input "Descuento". 
    *   *Fricción total. Pérdida de contexto.*

*   **En nuestra Arquitectura HSA con Astro (La decisión real):**
    1. Vas a `src/modules/QuotingB2B/`.
    2. Modificas `calculator_ui.svelte` (Añades el input).
    3. Abres el archivo de al lado, `api_handler.ts` (modificas la lógica de backend).
    *   *Cero fricción. Atomicidad pura. Todo está en la misma carpeta del módulo.*

---

## 2. La Magia de la Separación Lógica: Si están juntos, ¿Cómo evitamos hackeos?

La principal preocupación de juntar Frontend y Backend es la seguridad. Si la lógica de la base de datos (Supabase) está al lado del botón de Svelte, ¿podría filtrarse la contraseña de la base de datos al navegador del usuario?

Aquí es donde entra la magia moderna de los compiladores como **Astro y Vite**, usando **Barreras de Runtime**.

### **Ejemplo Práctico de Barrera de Seguridad:**

Asume esta estructura en AL13:
```text
src/
└── modules/
    └── QuoterB2B/
        ├── ui.svelte       (FRONTEND)
        └── db_actions.ts   (BACKEND)
```

Dentro del archivo `db_actions.ts`, importas tu clave secreta de base de datos desde el archivo `.env`:
```typescript
import { SUPABASE_SECRET_KEY } from 'astro:env/server'; // Llave maestra
```

**Escenario de Error Humano:**
Un desarrollador inexperto (o un error tipográfico) hace que el botón de `ui.svelte` importe una función de `db_actions.ts` por accidente. O peor, manda la LLAVE MAESTRA al HTML.

**La Solución Tecnológica:**
En el año 2012, eso hubiera significado un hackeo masivo porque el código Javascript se mandaba entero al cliente. En 2026, **Astro intercepta esto en el momento de compilar**.

Si Astro detecta que un archivo frontend (`.svelte`) intenta importar un módulo que usa la librería nativa `astro:env/server` o dependencias puras de Node (como `pg` o conectores DB), **el compilador bloquea la construcción y arroja un error rojo chillón en la terminal**.

> *"Oye, estás intentando enviar un secreto de servidor al cliente. Compilación Abortada."*

Gracias a esto, mantenemos el confort de desarrollar Front y Back en la misma carpeta (`modules/`), pero con la **Seguridad Cero-Holo** (Zero-Leak) de una arquitectura de Pentágono.

---

## 3. Estructura FSD/HSA (Feature-Sliced Design / Hex Sovereign)

En lugar de separar todo por "Tipos de Archivos" (Ej. una carpeta gigante llena de cien `components/`), lo separamos por **Funcionalidad (Dominio)**.

Así vivirá nuestro código en la carpeta `src/`:

### 📥 1. `core/` (Las Leyes de la Física)
Aquí guardamos cosas "tontas" pero fundamentales. No hay UI. No hay reglas de negocio (como el precio de un vidrio). Solo hay cimientos.
*   **Ejemplo:** La conexión genérica a Supabase o los esquemas globales Zod de validación.

### 🧩 2. `shared/` (El Sistema de Diseño)
Aquí viven los componentes visuales que nacieron mudos y dóciles. ¡Es UI estúpida! (En el buen sentido).
*   **Ejemplo:** `Button.svelte`. Este botón recibe texto y un color. **NO PUEDE** hacer magia. `Button.svelte` *jamás* debería hacer un `fetch('/api/ventas')`. Solo emite clics. Si un botón de aquí hace una petición HTTP, rompiste la arquitectura.

### 🧠 3. `modules/` (El Cerebro)
Aquí agrupamos por rebanadas verticales (Vertical Slices). El verdadero código valioso.
*   **Ejemplo: El módulo `QuotingB2B`**.
    *   Este módulo importa el botón mudo de `shared/ui/`. Le pone texto "Cotizar".
    *   Aquí está la **Isla Interactiva Svelte** que sabe de cristales y aluminios.
    *   Este módulo es el único que manda la información sucia a los *Endpoints* del Backend para inyectar en la base de datos de Supabase.

---

## 4. Evolución Móvil: ¿React Native? No. Progessive Web Apps (PWA)

El Roadmap incluía abarcar el mercado móvil con fuerza para los contratistas en obra que necesitan cotizar rápido.

**La Decisión Típica:**
*   *"Lanzamos la web, y en 6 meses contratamos a un programador de React Native para que nos haga una app iOS y Android".*

**El Problema:**
*   Hay que pagar licencia a Apple ($99/año), rogar que aprueben la app, construir otro repositorio paralelo con lógica de negocio duplicada y, lo peor, los usuarios odian buscar apps comerciales en tiendas y esperar 200MB de descarga.

**La Decisión de Alta Ingeniería AL13: Astro PWA**
Hemos integrado `@vite-pwa/astro` y *Workbox* en el corazón del Orquestador de Astro.

### **Ejemplo del Cambio de Juego de la PWA:**

*   **Paso 1:** El contratista entra a la web normal (`templadosal13.com`) desde su iPhone.
*   **Paso 2:** El navegador le ofrece un botón: *"Añadir Templados AL13 a Inicio"*.
*   **Paso 3:** Se crea el ícono en su teléfono idéntico a una app nativa. Sin App Store. A costo cero para nosotros.
*   **La Magia Backend (Service Workers):** Si el contratista viaja a un pueblo sin señal de internet 3G y abre la "App", la calculadora Svelte de cotizaciones **seguirá funcionando al instante**, porque el *Service Worker* (el conserje de nuestra web) guardó (caché) todos los algoritmos 3ds y reglas estáticas de vidrio en memoria secundaria del teléfono.

---

### Resumen del Capítulo

Al combinar **Astro** (que purga JavaScript innecesario) con un flujo **PWA** (instalación móvil) y basando nuestra persistencia en el **Supabase Soberano** con RLS (Seguridad en Filas), logramos una arquitectura de **Monolito Modular Híbrido**.

Tenemos la comodidad de una Startup programadora en una sola base de código `src/`, y el cerrojo de acorazado militar digno de un banco internacional, a un costo operativo ridículamente bajo.
