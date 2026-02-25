# Testing Strategy Document

**Sistema:** Aseguramiento de Calidad Continua (QA/CI) AL13  
**Versión:** 1.0 (Test-Driven Specs)  
**Fecha:** Febrero 2026  

**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Topología del Testing (Automated CI Pyramid)

La Arquitectura Híbrida (Astro + SSR Soberano) no puede testearse monolitícamente. Se separa la "Pirámide B2B/B2C" del "Testing de APIs Backend".

1.  **Bottom: Unidades Isomorfas (Unit Testing - Vitest):** Algoritmos puros (Matemáticas, Validadores lógicos, Zod Schemas). Estas corren en fracciones de milisegundo y son agnósticas a Cloudflare o Node.
2.  **Middle: Pruebas de Integración (Edge/DB Mocking):** Probamos si el Edge Worker puede insertar data en el **Supabase API** usando Base de Datos Dockerizada local en Semilla (`seed.sql`).
3.  **Top: E2E Front-to-Back (Playwright Browsers):** Casos Clínicos completos del Lead Capture simulando clicks, tipeos y WebGL (**Threlte**) Canvas Loading en Chromium, WebKit (iOS Simulator) y Mobile Firefox.

---

## 2. Tipología y Herramientas (The Stack Tools)

### 2.1 E2E Ecosistema Visual (Playwright Test)
Se descarta `Cypress` por su debilidad en manejo cross-browser genuino de WebKit y múltiples ventanas. Se elige `Playwright`.

**Objetivo E2E:** "El Camino Crítico". No se testea CSS trivial, se testean flujos de dinero.
*   *Test 1:* Renderizar Isla de Calculadora.
*   *Test 2:* Bloquear `submit()` si Ancho = $5m$ (Validando Edge-Case Zod).
*   *Test 3:* Aprobar Flujo Correcto e Inyección Mock de CRM.
*   *Mandato:* Playwright disparará el script capturando Traces (Trazabilidad) `.zip`. Si el Test Falla en CI GitHub Actions, subirá a los Artefactos el video y HTML interactivo exacto de dónde falló el botón.

### 2.2 Core Lógico y Frontend Helpers (Vitest)
Se descarta `Jest` por latencia extrema en Monorepos TypeScript moderno (ESM). Se exige `Vitest` (Soporte nativo Astro / Vite).
*   **Métrica de Cobertura (Coverage Mandate):** La carpeta `/src/server/services` y `/src/islands/quoter_logic` **DEBEN** tener $100\%$ de *Branch Coverage*. Si falla una condición `if` no probada, el GitHub Action falla.

### 2.3 Pruebas de Tensión / Bombardeo API (Load Testing HTTP/3)
Deseamos asegurar el WAF Anti-DDoS. Se impone `k6 (Grafana Labs)`.
*   *Mecánica:* Disparador de $500$ Virtual Users (VUs) continuos sobre `POST /api/internal/ingest`.
*   *Afirmación (Assertion):* Validamos que al Request #6 por IP se gatille `HTTP 429 Too Many Requests`. Esto asegura que los *Rate Limits* del Edge operan efectivamente.

---

## 3. Ambientes de Pipeline (CI/CD Gates)

Ningún programador humano hace *Merge* a la rama `main` sin superar el Tribunal de QA Robot (GitHub Actions V2).

### 3.1 GitHub PR Checks (El Filtro)
1.  **Linter Gate:** `ESLint Strict` y `Prettier Check` -> Previene ruido visual (Formatting).
2.  **Type Check Gate:** `tsc --noEmit` + `svelte-check` -> Verificador absoluto de Typescript y Svelte. Impide crasheos de Undefined Exceptions en sub-componentes Maderato Threlte 3D.
3.  **Vitest Run:** Pruebas Lógicas B2B (Mils).
4.  **Astro Build:** `npm run build` -> Si la hidratación SSG tira error al generar las tarjetas CMS, la PR se traba. Imposible subir código "que corre en mi máquina, pero falla en Build Server".

### 3.2 Post-Merge E2E (Release Sanity)
1.  **Staging Deployment:** Desplegar rama main a Branch Cloudflare (`staging.templados-al13.com`).
2.  **Playwright Run:** Correr la Suite pesada contra la URL *Viva* (Live Environment).
3.  **Promoción de Rama (Swap):** Si el paso 2 retorna verde, y la DB Staging mutó bien, Cloudflare enruta Aliasing hacia Producción primaria.

## 4. Pruebas de Accesibilidad Automatizadas (A11Y CI)
*   **Axe-Core TDD:** Playwright correrá inyectando `@axe-core/playwright`. Se aborta el ciclo de Build si el contraste de color o los Labels ARIA para el CRM Panel del dueño fallan el WCAG 2.1 (Nivel AA) dictaminado en el SRS.

---
*Fin Documentación QA. No se permite despliegue por fé. El sistema Astro compila y Playwright confirma la interactividad de Isla, certificando 0 Bug escapado a Producción Frontal.*
