# Product Roadmap

**Sistema:** Plataforma Integral de Generación de Demanda - Templados AL13  
**Versión:** 1.0 (Estrategia B2B / B2C Visual)  
**Fecha:** Febrero 2026  

**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Visión Holística del Ecosistema B2B (The North Star)
El objetivo de Templados AL13 no es vender software; el objetivo es que el **Contractor B2B local facture obras de $5M COP en $3\text{ Minutos}$ desde su celular en obra sucia.** 

El mapa de ruta está cimentado en bloques medibles (Epics) que incrementan el embudo comercial (Lead Gen) mes a mes, apoyados en la invulnerabilidad de la base de datos `Postgres` soberana.

---

## 2. Línea de Tiempo de Ejecución (Milestones)

### 2.1 Fase Q1 2026: El Blindaje Transaccional (Lead Capture Core)
**Meta:** Lanzar el Motor de Precios B2B y el Catálogo Estático (Cero fricción comercial).

*   **[M1] Arquitectura Híbrida Viva (Semana 1-2):**
    *   Setup Monolito Astro (`templados-core`).
    *   Dockerización base de datos (`PostgreSQL` / Entidades Zod Strict).
    *   Pipeline CI Cloudflare WAF (Linter + Typings + Build SSG Edge).
*   **[M2] La Calculadora Determinista (Semana 3-5):**
    *   Programación B2B de **Svelte** (State Machine). Matriz de algoritmos de Viento y tolerancias del Vidrio ($8\text{mm}$ vs $10\text{mm}$).
    *   Ingestor Edge-Function `POST /api/leads` (hacia **Supabase**).
    *   Disparo SMTP Asíncrono al dueño de la Empresa.
*   **[M3] The Visual Hero y PWA Core (Semana 6):**
    *   Landing pública SEO (LCP $< 1.8s$). Portafolios e Imágenes optimizadas 2D (Galería en **Tailwind CSS**). 
    *   Rendimiento Core Web Vitals $\to 100/100$ Auditado.
    *   Activación de **Progressive Web App (PWA)** vía `@vite-pwa/astro`. Caché offline básico y manifiesto para "Añadir a Pantalla de Inicio" (Sustituyendo el desarrollo nativo móvil).

### 2.2 Fase Q2 2026: El CMS Soberano y Reanimación 3D (The Eye-Candy Expansion)
**Meta:** Autonomía operativa para el Administrador (Dueño AL13) y diferenciación B2C pura con WebGL.

*   **[M4] Panel de Control Admin (Semana 7-8):**
    *   Bouncer de Auth JWT Segura (Zero-Trust Endpoint).
    *   Dashboard `admin/leads` (Kaban de Ventas Status).
    *   Formularios de Subida CMS (`Direct to S3 Presigned-Uploads`).
    *   Triggers de compilación Webhooks (On-Demand SSG Revalidation).
*   **[M5] El Render Engine (Semana 9-11):**
    *   Pipeline 3D: Carga estresante de archivos `.glb` con textura PBR (Roughness, Metalness de Perfilería Corrediza).
    *   Despliegue Experimental **Threlte**.
    *   SRE Fallback Tester (Degradación controlada 2D para Smartphones viejos).

### 2.3 Fase Q3 2026: Escalamiento Predictivo (The Conversion Loop)
*   **[M6] Algoritmos de Analítica CRM:**
    *   Paneles Grafana Internos / Dashboards: "¿Qué perfilería cotizan más los Lunes los B2B?".
    *   A/B Testing CDN Estático (Color botones Quoter).
*   **[M7] SEO Programático Orgánico:**
    *   Generador automático de Landing Pages (`/catalogo/puertas-bano-vidrio-templado-barrio-X`). SSR Dinámico atrae demanda hiper-local en Google Search.

---

## 3. Exploración de I+D y Futuro Expandido (Horizons / Moonshots)

Funciones que **han sido aplazadas y baneadas del Q1-Q2** por el equipo de ingeniería para proteger el SLA, pero que están en el radar de negocio a largo plazo:

1.  **Integración ERP Bancaria (Pasarela de Pagos Dura):** E-Commerce B2C transaccional total (Wompi, MercadoPago). Requiere PCI Compliance y certificaciones bancarias severas, distrayendo al momento la captura de volumen (Leads).
2.  **WebXR (Realidad Aumentada Inmersiva):** El cliente B2C usa el botón "Probar en mi Sala" abriendo la cámara del iPhone mapeando LiDAR la puerta del baño en tiempo real (Soporte actual muy verde globalmente, pero `model-viewer` ya lo empuja).
3.  **Chatbot AI Especializado en Medidas:** RAG Engine de ChatGPT interceptando leads B2C dudosos *"¿Cuánto me cobra si es solo 1 metrito?"* liberando tiempo del asesor humano.

---
*Fin Documentación Roadmap Producto. Las fechas son estimadas pero el flujo vectorial de componentes (M1 antes que M4 imperativamente) es la ley de la física de desarrollo AL13.*
