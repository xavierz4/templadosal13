# ADR-001: Islands Architecture sobre SPAs Monolíticas (React/Next.js)

**Título:** Adopción de Astro (Islands Architecture) y Descarte de SPAs Tradicionales para el Ecosistema Core AL13.  
**Fecha:** Febrero 2026  
**ESTADO:** `[APROBADO]`  
**Instanciado por:** Revisión Arquitectónica y Auditoría de Impacto Comercial PVD v4.0.  

---

## 1. Contexto (Context)
El requerimiento base de negocio dictamina la captura B2B transaccional asíncrona ("Lead Capture en Edge") y visualización en tiempo real B2C (Modelos 3D WebGL PBR) sobre redes de latencia variable en Cundinamarca/La Guajira. 
Históricamente, el desarrollo web estándar acudiría a *Single Page Applications* (SPA) como React crudo o meta-frameworks como Next.js/Nuxt.js. Sin embargo, estas opciones inyectan hidratación total del cliente (Hydration Overhead) arrastrando MegaBytes de código (Virtual DOM) para renderizar textos o galerías estáticas.

## 2. Problema que se intenta resolver (The Problem)
En un dispositivo Android mid-range (Ej: Snapdragon serie 600, 4GB RAM) en una conexión 3G:
*   Si usamos Next.js para renderizar una tarjeta de catálogo, el teléfono debe parsear e hidratar $150 \text{ KB}$ de React JS antes de que los botones sean interactivos (*Time to Interactive alto*).
*   Simultáneamente, el `Three.js` (Canvas WebGL) exige $\ge 80 \text{ MB}$ de RAM para el tensor de texturas `.glb`.
*   *El Choque:* La CPU del usuario móvil se ahoga tratando de ejecutar la reconciliación de ReactJS y calcular los polígonos del WebGL al mismo tiempo. El hilo principal (Main Thread) colapsa, el navegador se engatilla, y el cliente cierra la pestaña por frustración, incurriendo en lucro cesante (Pérdida del Lead $).

## 3. Decisión (The Decision)
Se impone el framework **Astro** y su paradigma arquitectónico de **Islands Architecture** (Arquitectura de Islas).
1.  **HTML Zero-JS:** Todo el catálogo público, textos, headers, hero images y layouts generales del CMS son enviados al cliente 100% desnudos de código JavaScript. 
2.  **Aislamiento Atómico:** Las únicas burbujas de **Svelte** permitidas son (A) La Calculadora de Cotización y (B) El componente WebGL impulsado por **Threlte**. Estas correrán hidrataciones `client:idle` (cuando la CPU esté descansada) o `client:visible` (cuando el usuario haga scroll hacia la zona).
3.  **Client Router Nativo:** Se incorpora la `View Transitions API` usando el enrutador de Astro para simular transiciones nativas (No Flash) sin requerir el peso masivo del cliente.

## 4. Consecuencias (Consequences)

### 4.1 Impacto Positivo (Beneficios Tangibles)
*   **TTFB / LCP Destructivo (Anti-competencia):** El tiempo de pintura del elemento contentivo más grande (LCP) se pulveriza $\le 1.8 \text{ segundos}$. Garantía de primer lugar SEO técnico local por "Pasar" (Pass) verde los Core Web Vitals auditados por Google.
*   **Conservación Térmica/Batería:** Al no ejecutar `VirtualDOM diffing` estéril en páginas de texto o listado, preservamos la vida de la batería del Contratista en obra (User Persona 1).
*   **Agnosticismo de UI:** El sistema se inmuniza de frameworks pesados. Si el día de mañana se requiere, una Isla Svelte puede reemplazarse fácilmente sin reescribir la página completa ni impactar el tiempo de carga total del usuario.

### 4.2 Impacto Negativo (Trade-offs / Deuda Potencial)
*   **Manejo de Estado Global Doloroso (Global State):** Compartir un carro transaccional (Estado Svelte) con un Header estático (Estado Astro) es friccionado.
*   *Mitigación:* Implantación mandatoria de `NanoStores` (Estado Atómico isomorfo) para puentear datos reactivos por fuera del VirtualDOM.
*   **Fricción de Desarrollo (DX):** Exige mayor rigor a los ingenieros. Deben decidir deliberadamente si cada `<div>` merece hidratarse y ser dinámico o si puede permanecer estático (Desaprender el automatismo de frameworks de una Sola Página).

## 5. Estrategias Alternativas Descartadas (Rejected Candidates)
*   **Next.js 15 (App Router - RSC):** Aunque los *React Server Components* mejoran el bundle, Next.js en Vercel fuerza a lógicas Serverless Edge pesadas de la corporación. No se alinea al LCP purista que exige "0 JS Total" en renders estáticos.
*   **Qwik (Resumability Framework):** Prometedor e isomorfo instantáneo, pero carece del ecosistema maduro de integraciones que la gerencia AL13 necesita para integrar su sistema WebGL (**Threlte** / Svelte) de forma orgánica y sin fricciones adicionales. Astro.js posee soporte absoluto de comunidad y estabilidad `v5` comprobada.

---
*Fin ADR 001. Aprobación inamovible como pilar tecnológico.*
