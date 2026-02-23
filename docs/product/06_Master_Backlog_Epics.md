# Master Backlog & Epics (Templados AL13)

Este documento es el ancla de ejecución. Traduce el Roadmap Estratégico (`docs/product/05_Product_Roadmap.md`) en Epicas y Tareas Atómicas accionables para el equipo de Agentes IA (Antigravity).

---

## 🏗️ Epic 1: El Scaffolding y Arquitectura Base (Cimientos)
**Objetivo:** Establecer el entorno de desarrollo, linters, CI/CD y conexión a base de datos.
- [ ] **Task 1.1:** Inicializar el Monolito Front-end (Astro + Svelte 5).
- [ ] **Task 1.2:** Configurar Tailwind CSS, tipografía AL13 y variables de diseño (Glassmorphism).
- [ ] **Task 1.3:** Configurar Supabase/PostgreSQL (Esquema inicial de usuarios/roles) usando Docker o SDK.
- [ ] **Task 1.4:** Configurar CI/CD Edge (Cloudflare/Vercel) y Git Hooks (pre-commit linters).

## 🎨 Epic 2: The Visual Hero & Landing Page (First Impression)
**Objetivo:** Crear la experiencia visual pública (SEO, LCP < 1.8s) B2B/B2C.
- [ ] **Task 2.1 (Práctica Actual):** PRD y Componente "Hero Section" (Animaciones, Hover states, tipografía).
- [ ] **Task 2.2:** Componente "Value Proposition" (Grid de beneficios B2B).
- [ ] **Task 2.3:** Integración de Galería de Imágenes Optimizadas (WebP/AVIF).
- [ ] **Task 2.4:** Auditoría Core Web Vitals (Performance Test 100/100).

## 🧮 Epic 3: La Calculadora Determinista B2B (Core Business Logic)
**Objetivo:** Motor de precios y captura de leads en < 3 minutos.
- [ ] **Task 3.1:** Diseño de BD (Esquema de variables: Viento, Tolerancias, Medidas).
- [ ] **Task 3.2:** State Machine en Svelte para el flujo de la calculadora (Pasos 1 al 4).
- [ ] **Task 3.3:** Algoritmo TDD de cálculo de precios en el Edge (Astro Server Endpoint).
- [ ] **Task 3.4:** Ingestor `POST /api/leads` (Guardar en Supabase).
- [ ] **Task 3.5:** Notificación SMTP Asíncrona (Aviso de nuevo Lead al CEO).

## 🛡️ Epic 4: Panel de Control Admin (CMS Soberano)
**Objetivo:** Interfaz privada de gestión de leads y contenido.
- [ ] **Task 4.1:** Autenticación JWT y Middlewares de seguridad (Rutas protegidas `/admin`).
- [ ] **Task 4.2:** Dashboard de Leads (Kanban View) con lectura en tiempo real de Supabase.
- [ ] **Task 4.3:** Formularios de carga de imágenes (Direct to S3/Supabase Storage).
- [ ] **Task 4.4:** Panel de configuración de precios base (Variables del algoritmo).

## 🔮 Epic 5: The Render Engine (Experiencia 3D Premium)
**Objetivo:** Diferenciación visual extrema B2C usando Threlte/WebGL.
- [ ] **Task 5.1:** Setup de Pipeline 3D (Threlte) y carga de archivos `.glb`.
- [ ] **Task 5.2:** Renderizado de texturas PBR (Vidrio interactivo, metalness, roughness).
- [ ] **Task 5.3:** Controles de órbita y zoom en móviles.
- [ ] **Task 5.4:** Sistema SRE Fallback (Mostrar imagen 2D si WebGL falla en dispositivos antiguos).

## 📈 Epic 6: Analítica y SEO Programático (Scale)
**Objetivo:** Expansión automática basada en datos.
- [ ] **Task 6.1:** Ingestión de eventos de usuario (Telemetría de clics en la calculadora).
- [ ] **Task 6.2:** Generador SSR (Astro) de Landing Pages locales (ej. `/catalogo/mamparas-bogota`).
- [ ] **Task 6.3:** Dashboard de métricas B2B.

---
*Nota del Lead AI: Este backlog es orgánico. A medida que superemos los tickets de la Epic 1 y 2, es muy probable que la Epic 4 o 5 requieran ajustes basados en la deuda técnica o aprendizajes arquitectónicos de las primeras fases.*
