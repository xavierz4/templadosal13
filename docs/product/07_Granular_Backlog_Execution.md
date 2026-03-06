

# Backlog Granular de Ejecución (Dinámico y Exhaustivo)

Este documento contiene la hoja de ruta de ejecución atómica EXTENSA para la plataforma **Templados AL13**. Cada Épica está desarrollada hasta su nivel más bajo operable por IAs.

### 🧬 Protocolo de Evolución Dinámica (The Mutation Protocol)
Las tareas marcadas con `[ ]` están pendientes. Las nuevas subtareas orgánicas (bugs/cambios) se inyectarán debajo del bloque afectado usando prefijos:
- `[FIX]` : Resolución de bugs (Ej. Conflictos de dependencias).
- `[REF]` : Refactorización de código legado o ineficiente.
- `[ADD]` : Nuevo requerimiento atómico (Feature Request).

---

## 🏗️ Epic 1: Scaffolding y Arquitectura Base (Cimientos)
**Objetivo:** Establecer el entorno de desarrollo, linters, CI/CD y conexión a base de datos segura.

- **Task 1.1: Inicializar el Monolito Front-end (Astro + Svelte 5)**
    - [x] 1.1.1: Ejecutar `npm create astro@latest` (template `basics`, estricto, sin UI, TypeScript `strict`). *(Nuclear Reset)*
    - [x] 1.1.2: Inicializar repositorio Git y añadir `.gitignore` estándar de Node/Astro/Entorno.
    - [x] 1.1.3: Limpiar archivos basura generados por defecto (CSS global, SVG de muestra en `public/`).
    - [x] 1.1.4: Ejecutar `npx astro add svelte` para integrar el motor reactivo de UI.
    - [x] 1.1.5: Configurar `astro.config.mjs` para asegurar compatibilidad de Svelte 5 (Runes).
    - [x] 1.1.6: Crear estructura base: `core/`, `shared/`, `modules/`, `pages/` (HSA Strict Mode).
    - [x] 1.1.7: Escribir test unitario básico (Vitest) para asegurar el montaje Astro-Svelte.
    - [x] 1.1.8: Commit base de andamiaje ("chore: init astro svelte workspace strict mode").

- **Task 1.2: Configurar Sistema UI y Tailwind CSS (Glassmorphism)**
    - [x] 1.2.1: Ejecutar `npx astro add tailwind` o configuración manual de PostCSS.
    - [x] 1.2.2: Modificar `tailwind.config.mjs` / `global.css` incrustando paleta Hex AL13 (Oscuros, Dorados/Plateados industriales).
    - [x] 1.2.3: Definir en Tailwind opacidades personalizadas para desenfoques `backdrop-blur`.
    - [x] 1.2.4: Instalar y configurar web fonts (Inter para lectura, Outfit para Headers) vía `@fontsource`.
    - [x] 1.2.5: Crear `src/core/theme/global.css` implementando utilitarios puros pre-compilados (`.glass-panel`, `.text-gradient`).
    - [x] 1.2.6: Componentizar un `Badge.svelte` de prueba aplicando Glassmorphism para validar diseño.

- **Task 1.3: Setup de Repositorio de Datos (Supabase/PostgreSQL)**
    - [x] 1.3.1: Instalar Supabase CLI v1 y ejecutar `supabase init` localmente.
    - [x] 1.3.2: Generar y configurar archivos `.env.example` y obligar `.env` en Gitignore.
    - [x] 1.3.3: Diseñar e implementar DDL (migration SQL) `001_initial_schema.sql` (Usuarios, Roles, Perfil AL13).
    - [x] 1.3.4: Diseñar DDL (migration SQL) `002_leads_schema.sql` (Cotizaciones, Status Kanban, Valores $).
    - [x] 1.3.5: [CLOUD] Configurar proyecto en Supabase Cloud (Dashboard) y vincular credenciales URL/ANON_KEY en `.env`.
    - [x] 1.3.6: [CLOUD] Generar tipos TypeScript estáticos directamente desde Supabase Cloud (`supabase gen types typescript --project-id <tu-id> > src/lib/database.types.ts`).

- **Task 1.4: Protocolos DevOps y Calidad (CI/CD)**
    - [x] 1.4.1: Instalar ESLint y Prettier Plugins para Astro y Svelte.
    - [x] 1.4.2: Configurar `.prettierrc` (Tabulaciones, comillas simples, line width).
    - [x] 1.4.3: Instalar `husky` y `lint-staged` para ganchos `pre-commit` automáticos.
    - [x] 1.4.4: Escribir GitHub Action `.github/workflows/ci.yml` para correr Linting + TypeCheck en cada PR.
    - [x] 1.4.5: [ADD] Instalar `commitlint` + hook `.husky/commit-msg` para validar Conventional Commits automáticamente.
    - [x] 1.4.6: [ADD] Configurar ESLint `no-restricted-syntax` para bloquear imports relativos `../../` (REGLA 0 de Aliases Absolutos).
    - [x] 1.4.7: [ADD] Instalar `@vitest/coverage-v8` y configurar umbral mínimo 80% (lines/functions/statements) en `src/core/domain/`.
    - [x] 1.4.8: [ADD] Ampliar `.github/workflows/ci.yml` con: commitlint check, coverage report, Codecov upload.
    - [x] 1.4.9: [ADD] Crear `AGENTS.md` v4.0 con 16 reglas + MANDATORY WORKFLOW determinista + mapa de documentación.
    - [x] 1.4.10: [ADD] Crear `.agents/workflows/code_review.md` (slash command `/code_review`).

---

## 🎨 Epic 2: The Visual Hero & Landing Page B2B/B2C (First Impression)
**Objetivo:** Crear un escaparate público cinemático que asegure tiempos de carga hiper-rápidos (SEO Edge).

- **Task 2.1: Layout Maestro Público**
    - [x] 2.1.1: Crear componente envolvente `PublicLayout.astro` manejando `<head>`, meta tags y SEO Title/Description dinámicos.
    - [x] 2.1.2: Implementar componente genérico Header/Nav (`Navbar.svelte`) con logo AL13 y scroll-spy (cambia color a transparente).
    - [x] 2.1.3: Implementar componente genérico Footer estático (Enlaces, Términos Legales, Redes).

- **Task 2.2: Componente "Hero Section" Premium**
    - [x] 2.2.1: Escribir tests unitarios Vitest definiendo existencia de textos principales y CTA de botón.
    - [x] 2.2.2: Construir HTML semántico de `Hero.svelte` (Título h1 impactante y Párrafo "Boutique Industrial").
    - [x] 2.2.3: Aplicar clases CSS `glass-panel` creadas en la Epic 1.2.
    - [x] 2.2.4: Refinar el botón CTA OnHover: Transición de 300ms a `scale(1.02)` y brillo interior sutil (Shadow).
    - [x] 2.2.5: Injectar un video de fondo comprimido (o imagen oscura abstracta) con overlay oscuro para contraste del texto.

- **Task 2.3: Value Proposition (Grid de Beneficios B2B / B2C)**
    - [x] 2.3.1: Crear componente aislado de grilla UI `ValueProposition.svelte` (Íconos Lucide, Títulos, Descripción).
    - [x] 2.3.2: Integrar datos mockeados (Pilares AL13) y renderizado Glassmorphism en Svelte.
    - [x] 2.3.3: [REF] Reemplazar AOS por `svelte-motion` (Framer Motion API). Integrar animaciones de resorte atadas al scroll para revelar tarjetas.

- **Task 2.4: Optimización Image Delivery y Web Vitals**
    - [x] 2.4.1: Convertir de lote todos los `png/jpg` a `webp/avif` usando componente nativo o API `getImage` de Astro.
    - [x] 2.4.2: Asegurar carga diferida `loading="lazy"` en todas las imágenes por debajo del "fold" (NA/Optimizado).
    - [x] 2.4.3: Revisar métricas Lighthouse CLI locales buscando puntuación perfecta en Performance/Accessibilidad.

---

## 🧮 Epic 3: Validador Técnico de Viabilidad B2B (Core Logic)
**Objetivo:** Permitir validación geométrica en vivo (State Machine Svelte) y captura asíncrona de Leads sin exponer ni depender de bases de datos de precios mantenibles.

- **Task 3.1: Backend - Endpoint de Ingestión de Validación (Leads)**
    - [x] 3.1.1: Crear archivo de API nativa en Astro `src/pages/api/leads.ts` (`POST`).
    - [x] 3.1.2: Validar Payload JSON de entrada usando librería `Zod` (Medidas, Nombre, Empresa, Teléfono, Resultado Técnico).
    - [x] 3.1.3: Cifrar datos o prevenir Inyecciones SQL usando el ORM/Supabase SDK.
    - [x] 3.1.4: Grabar el `Lead` en la BD Supabase y retornar Status 201 (Created) con Lead_ID.
    - [x] 3.1.5: Escribir test de integración enviando POST falso al endpoint y verificando validación Zod.

- **Task 3.2: Frontend - UI Svelte State Machine (The Validator Engine)**
    - [x] 3.2.1: Definir Runes (`$state`) para almacenar las selecciones del usuario en el navegador (Paso a Paso).
    - [x] 3.2.2: Construir UI Paso 1: Selección visual del tipo de producto (Puerta de Baño, Ventanal, etc).
    - [x] 3.2.3: Construir UI Paso 2: Input de Medidas (Alto x Ancho) con validadores kinéticos de Motion (rechazo animado).
    - [x] 3.2.4: Construir UI Paso 3: Tipos de Vidrio y Perfilería requeridos (Sugeridos por la física, no por el precio).
    - [x] 3.2.5: Construir UI Paso 4: Formulario final para "Solicitar Asesoría y Validación Oficial" (Lead Gate).

- **Task 3.3: Motor Físico y Geométrico (Physics Tolerances)**
    - [x] 3.3.1: Aislar la clase/lógica JS en `src/core/domain/physicsEngine.ts` (Cálculo de deflexión y dimensiones límite, CERO precios).
    - [x] 3.3.2: Escribir tests unitarios que verifiquen las alertas de peligro de las medidas contra las normas NSR-10.
    - [x] 3.3.3: Implementar condición: Si Alto > 2100mm = Advertencia Viento / Forzar vidrio 10mm.
    - [x] 3.3.4: Conectar retorno del JS lógico a la vista final para asombrar al Arquitecto con expertise técnico.

- **Task 3.4: Notificaciones Asíncronas Push (El CEO se entera)**
    - [x] 3.4.1: Integrar Resend SDK dentro del endpoint `/api/leads.ts` (fire-and-forget, sin bloquear respuesta HTTP).
    - [x] 3.4.2: Diseñar plantilla HTML de correo ("Nuevo Lead B2B de $XX COP") en `src/core/infrastructure/emailTemplate.ts`.
    - [x] 3.4.3: Testear envío asíncrono hacia correo corporativo del CEO AL13.

- **Task 3.5: [REF] Refactorización Arquitectónica SOLID (Inversión de Dependencias + Strategy Pattern)**
    - [x] 3.5.1: Crear interfaces abstractas `ILeadRepository` y `IEmailService` en `src/core/domain/repositories/` y `services/`.
    - [x] 3.5.2: Crear adaptadores concretos `SupabaseLeadRepository` y `ResendEmailService` en `src/core/infrastructure/`.
    - [x] 3.5.3: Refactorizar `src/pages/api/leads.ts` para inyectar dependencias vía interfaces (Dependency Inversion).
    - [x] 3.5.4: Crear interfaz `IPhysicsStrategy` e implementar 4 estrategias concretas: `CabinaDuchaStrategy`, `DivisorOficinaStrategy`, `FachadaMonumentalStrategy`, `PuertaPivotanteStrategy`.
    - [x] 3.5.5: Refactorizar `physicsEngine.ts` para usar registry de estrategias (Open/Closed Principle).
    - [x] 3.5.6: Migrar todos los imports relativos `../../` a aliases absolutos `@core/*`, `@shared/*`, `@modules/*` en los archivos de infraestructura.
    - [x] 3.5.7: Corregir todos los `catch (error: any)` a `catch (error: unknown)` con narrowing `instanceof`.
    - [x] 3.5.8: Actualizar tests en `leads.test.ts` para mockear interfaces (no SDKs directos).

- **Task 3.6: [ADD] Integración Omnicanal del Cotizador**
    - [x] 3.6.1: Conectar evento de click en "Cotizar Este Sistema" (vista `/catalogo/interactivo`) para que redirija fluidamente al `TechnicalValidator`.
    - [x] 3.6.2: Añadir inyección de parámetros URL (`?product=puerta_pivotante`) para asegurar que el cotizador preseleccione automáticamente el elemento vitrineado.

---

## 🛡️ Epic 4: El Panel de Control Admin (CMS Privado Soberano)
**Objetivo:** Interfaz secreta y altamente segura para gestión comercial, Kanban y cambios de catálogo.

- **Task 4.1: Bouncer de Seguridad y Auth Routing**
    - [x] 4.1.1: Crear componente `/admin/login` con formulario de acceso único (Supabase Auth Email/Password).
        - [x] Schema Zod: `src/core/domain/loginSchema.ts` (con sanitizeHtml XSS — REGLA 5)
        - [x] Tests del schema: `src/core/domain/loginSchema.test.ts`
        - [x] UI Svelte 5: `src/modules/admin/ui/LoginForm.svelte` (Glassmorphism, Runes $state/$derived — REGLA 4 UI Dumb)
        - [x] Barrel File: `src/modules/admin/index.ts` (REGLA 3 — FSD)
        - [x] Auth Client HTTP: `src/modules/admin/api/authClient.ts` (loginAdmin + logoutAdmin)
        - [x] API Endpoint POST: `src/pages/api/auth/login.ts` (Hexagonal — Zod → SupabaseAuthService → HTTP — REGLA 2)
        - [x] API Endpoint POST: `src/pages/api/auth/logout.ts`
        - [x] Tests del endpoint: `src/pages/api/auth/login.test.ts`
        - [x] Página Astro SSR: `src/pages/admin/login.astro` (prerender=false, meta noindex)
    - [x] 4.1.2: Implementar SSR Layout `AdminLayout.astro` que intercepte Cookies JWT de Supabase en cada request.
        - [x] Layout SSR: `src/shared/ui/AdminLayout.astro` (prerender=false, JWT guard, sidebar, topbar con logout)
        - [x] Auth guard: `supabase.auth.getSession()` → redirect 302 a `/admin/login` si sin sesión
        - [x] Dashboard index: `src/pages/admin/index.astro` (stat cards + auth banner + roadmap de proximas tasks)
        - [x] Logout: botón en topbar con fetch POST `/api/auth/logout` + redirect client-side
    - [x] 4.1.3: Redireccionar forzosamente a `/admin/login` si la Cookie de Sesión está expirada, previniendo acceso estático o cliente.
        - [x] `src/pages/admin/login.astro`: chequea sesión activa → redirect 302 a `/admin` si ya autenticado


- **Task 4.2: CRM Dashboard B2B (Módulo Kanban de Leads)**
    - [x] 4.2.1: Crear ruta SSR `/admin/leads` que haga fetch de todos los Leads Ordenados (`ORDER BY created_at DESC`).
        - [x] Tipos de dominio: `src/core/domain/leadAdminSchema.ts` (`LeadStatus` enum, `AdminLead` interface, `LeadStatusUpdateSchema` Zod)
        - [x] Extender `ILeadRepository`: métodos `getAll()` y `updateStatus()` añadidos al contrato
        - [x] Implementar en `SupabaseLeadRepository`: DI constructor para client SSR, `getAll()` + `updateStatus()`
        - [x] Página SSR: `src/pages/admin/leads.astro` (AdminLayout, stats row, `KanbanBoard client:load`)
    - [x] 4.2.2: Construir componente Svelte `KanbanBoard` compuesto por columnas "Nuevo", "Cotizado", "Cerrado Ganado", "Perdido".
        - [x] `src/modules/admin/ui/KanbanBoard.svelte` (Svelte 5 Runes, 4 columnas, DnD nativo, optimistic UI)
        - [x] `src/modules/admin/ui/KanbanCard.svelte` (componente dumb: glassmorphism, datos del lead, teléfono, medidas)
    - [x] 4.2.3: Implementar librería de Drag-and-Drop (DND) ligera vinculada a Runes en Svelte.
        - [x] HTML5 Drag and Drop API nativa (YAGNI — sin dependencia extra)
        - [x] Optimistic UI: tarjeta se mueve inmediatamente, revierte si el servidor falla con error banner
    - [x] 4.2.4: Crear endpoint interno (PATCH) en Astro para mutar el status de un Lead en la Base de Datos al soltar la tarjeta de arrastre (Drop).
        - [x] Endpoint: `src/pages/api/admin/leads/[id].ts` (auth guard, Zod validation, DI SSR client)
        - [x] Client HTTP: `src/modules/admin/api/leadsAdminClient.ts` (`updateLeadStatus()` — REGLA 4)
        - [x] Barrel file: `src/modules/admin/index.ts` actualizado con `KanbanBoard` y `KanbanCard`


- **Task 4.3: CMS de Catálogo (Uploader a Buckets S3/Supabase Storage)**
    - [x] 4.3.1: Crear tabla/esquema en Base Datos para "Catálogo de Productos".
        - [x] Migración SQL: `supabase/migrations/20260227000000_catalog_schema.sql` (RLS, índice, bucket instructions)
        - [x] Tipos de dominio: `src/core/domain/catalogSchema.ts` (CatalogProject, CatalogProjectInputSchema, PresignRequestSchema)
        - [x] Contrato: `src/core/domain/repositories/ICatalogRepository.ts` (5 métodos: getAll, getPublished, create, togglePublish, delete)
        - [x] Implementación: `src/core/infrastructure/repositories/SupabaseCatalogRepository.ts` (DI constructor SSR)
    - [x] 4.3.2: Construir UI en Svelte: Formulario "Añadir Proyecto Exitoso".
        - [x] `src/modules/admin/ui/ProjectUploadForm.svelte` (3 pasos: form → upload XHR con progreso → confirmación)
        - [x] `src/modules/admin/ui/CatalogGrid.svelte` (grid responsive, toggle publish, delete con confirm)
        - [x] `src/modules/admin/api/catalogAdminClient.ts` (getPresignedUrl, uploadImageToStorage, createProject, togglePublish, deleteProject)
        - [x] Página SSR: `src/pages/admin/catalog.astro` (AdminLayout, stats row, islands Svelte)
        - [x] Barrel: `src/modules/admin/index.ts` actualizado con ProjectUploadForm y CatalogGrid
    - [x] 4.3.3: Programar función de subida presigned de imágenes directo al bucket optimizado ignorando NodeJS proxy.
        - [x] `src/core/infrastructure/storage/SupabaseStorageService.ts` (createPresignedUploadUrl, deleteFile)
        - [x] Endpoint: `src/pages/api/admin/catalog/presign.ts` (POST, auth guard, Zod image/* validation)
        - [x] Endpoint: `src/pages/api/admin/catalog/index.ts` (POST, crea registro en BD)
        - [x] Endpoint: `src/pages/api/admin/catalog/[id].ts` (PATCH toggle publish, DELETE con Storage cleanup)
    - [x] 4.3.4: Revalidar Caché SSG de Astro programáticamente si una imagen pública es actualizada.
        - [x] Resuelto por diseño: `/admin/catalog` y catálogo público usan `prerender = false` (SSR on-demand). No hay caché que revalidar.

- **Task 4.4: [ADD] Seed Inicial del Catálogo Público (Mockups B2B)**
    - [x] 4.4.1: Subir los 12 Renders/Mockups generados fotorealistas (Estética Cyan/Emerald) al Supabase Storage Bucket `catalog-images`.
    - [x] 4.4.2: Ejecutar Script de Seed o inserción manual CMS para popular la tabla `catalog_projects` y eliminar el 404 general en el frontend `/catalogo`.


---

## 🔮 Epic 5: The Render Engine (Interacción WebGL B2C 3D)
**Objetivo:** Funcionalidad Eye-Candy que destruya a la competencia visual, donde el usuario final pueda rotar un vidrio templado 3D en su móvil.

- **Task 5.1: Setup Core 3D (Threlte Engine)**
    - [x] 5.1.1: Instalar la dependencia oficial `three` y `@threlte/core` compatible con Svelte 5.
    - [x] 5.1.2: Montar componente de Canvas maestro (`3DCanvas.svelte`) asegurando z-index debajo del texto UI pero arriba del fondo.

- **Task 5.2: Ingesta de Escenarios PBR (Modelos y Materiales)**
    - [x] 5.2.1: Optimizar modelo crudo de aluminio `.glb` mediante `gltf-pipeline` o Draco compression en terminal (Reducción MBs).
    - [x] 5.2.2: Cargar el modelo en Threlte asíncronamente (Suspense Loader UI).
    - [x] 5.2.3: Programar shaders fotorrealistas (MeshPhysicalMaterial) asignando "Transmission = 1.0", "Roughness < 0.1", e IOR (Índice de refracción) equivalente a vidrio clásico para el target 3D.
    - [x] 5.2.4: Asignar coloración "Anodizado/Mate" a las estructuras del perfil perimetral metálico en ThreeJS.

- **Task 5.3: Coreografías de Cámara (Orbiting)**
    - [x] 5.3.1: Inyectar `<OrbitControls />` limitando el pitch polar a rangos normales (el usuario no puede ver la ducha "desde abajo" u horizontes absurdos).
    - [x] 5.3.2: Auto-rotación sutil y lenta (`autoRotate={true} autoRotateSpeed={0.5}`) si el usuario no interactúa en 5 segundos.

- **Task 5.4: Degradación SRE (Site Reliability Engineering / Fallback)**
    - [x] 5.4.1: Programar detector (script muy veloz) de capabilities WebGL en el navegador del cliente antes del montaje.
    - [x] 5.4.2: Destruir el Canvas 3D e inyectar una "Imagen 2D de Alta Calidad (AVIF)" inmediatamente si el teléfono es obsoleto o carece de Aceleración de Hardware.

- **Task 5.5: [ADD] Gemelo Digital Realista (Digital Twin Models)**
    - [x] 5.5.1: Sustituir el cubo de *debug* primitive en `<Scene3DCanvas />` por la carga asíncrona de archivos GLB/GLTF arquitectónicos reales y optimizados.
    - [x] 5.5.2: Configurar reactividad en Svelte (Runes) para que el selector 2D de la UI mute los shaders (`roughness`, `transmission`, `color`) del modelo GLTF en tiempo real (ej. Vidrio Transparente a Gris Humo).

---

## 💎 Epic 7: [ADD] Completitud de Ecosistema y Polish Final (The B2B Premium Finish)
**Objetivo:** Eliminar vacíos muertos (Stubs, 404s) interceptados en la auditoría y solidificar la narrativa corporativa total.

- **Task 7.1: Despliegue de Páginas Informativas (Zero Stubs)**
    - [x] 7.1.1: Reemplazar el cascarón de `/nosotros` (Filosofía) maquetando la historia de la marca, propuesta de valor AL13 y ventaja competitiva del cristal templado estructural.
    - [x] 7.1.2: Revitalizar `/contacto` (Portal B2B) más allá del cotizador, integrando canales en frío, un formulario directo de contacto, y listado de sedes corporativas.

- **Task 7.2: Cumplimiento Legal B2B**
    - [x] 7.2.1: Crear `<StaticPageLayout>` limpio para textos pesados y enrutar `/privacidad` y `/terminos` solventando los hipervínculos rotos del Footer.
    - [x] 7.2.2: Redactar estructura estática Markdown asumiendo Políticas de Privacidad estándar para un negocio B2B/SaaS en Latinoamérica.

---

## 📈 Epic 6: Scalado Programático Orgánico y Telemetría (Growth)
**Objetivo:** Expansión hiper-escalable del sitio sin intervención humana a todos los barrios y ciudades, soportado por data real.

- **Task 6.1: Motor Generador Programático de Rutas SSR/SSG (Local SEO)**
    - [x] 6.1.1: Diseñar esquema en Supabase `seo_locations` y `seo_systems` poblado con Seed Data estratégico del área de influencia real (Riohacha, Maicao, Uribia, Fonseca, San Juan del Cesar, Santa Marta, Valledupar).
    - [x] 6.1.2: Programar la ruta dinámica Astro `src/pages/catalogo/[sistema]/[ubicacion].astro`.
    - [x] 6.1.3: Escribir la función `getStaticPaths()` asíncrona que haga fetch a Supabase para pre-renderizar en build time combinaciones hiper-locales (ej. "mamparas de vidrio templado en riohacha" o "fachadas comerciales en maicao").
    - [x] 6.1.4: Inyectar metadatos atómicos (Title, Meta Description, JSON-LD Schema de Empresa Local) en el `PublicLayout` condicionalmente según la ruta generada.
    - [x] 6.1.5: [ADD] Integrar `@astrojs/sitemap`. Configurar generación dinámica de `sitemap.xml` que auto-indexe todas las miles de URL creadas y subirlas a Google Search Console.

- **Task 6.2: Dashboard de Telemetría Interna (Business Intelligence)**
    - [x] 6.2.1: En Supabase, crear "Database Views" y Funciones RPC (Remote Procedure Calls) que agrupen la cantidad de Leads por Mes, Producto y Estado del Kanban.
    - [x] 6.2.2: Construir UI en Svelte para la ruta `/admin/analytics` utilizando una librería ligera (ej. `LayerCake` o `Chart.js`) que consuma el RPC y renderice: Conversion Rates y Volumen en Pipeline ($).
    - [x] 6.2.3: Programar Edge Function en Supabase (Deno) que se dispare cada semana vía CRON tabulando un resumen ejecutivo en PDF y enviándolo al CEO por Resend.
        - [x] `supabase/functions/weekly-report/index.ts` (Deno Edge Function con jsPDF + autoTable + Resend API)
        - [x] `supabase/functions/weekly-report/deno.json` (Configuración Deno)
        - [x] `supabase/migrations/20260304000000_weekly_report_cron.sql` (pg_cron + pg_net, Lunes 08:00 UTC)
        - [x] Pendiente despliegue: configurar secrets en Supabase Dashboard (`RESEND_API_KEY`, `REPORT_RECIPIENT_EMAIL`) y reemplazar placeholder de ProjectRef en la migración SQL
    - [x] 6.2.4: Instaurar Frontend Observability: Captura de excepciones globales JS (`window.onerror`) enviando un POST asíncrono silencioso a una tabla `client_logs` en Supabase para cacería proactiva de bugs.
    - [x] 6.2.5: [ADD] Tracking de Atribución (UTMs): Capturar parámetros `utm_source` y `utm_campaign` desde la URL en el Frontend y persistirlos silenciosamente en la tabla `leads`, para enlazar cada cotización con su respectivo origen de pauta (Meta Ads / Google Ads).
    - [x] 6.2.6: [ADD] Webhooks de Emisión (Realtime B2B): Implementar un Triggers en PostgreSQL (Supabase) que, al insertar un nuevo Lead, dispare un Webhook saliente hacia Zapier/Make. Esto habilitará notificaciones instantáneas a WhatsApp, Slack o la ingesta en CRMs externos (Salesforce/Hubspot) sin tocar el código base.

---

## 🎩 Epic 8: World-Class UI/UX Polish & Conversion Rate Optimization (CRO)
**Objetivo:** Elevar la experiencia estética B2B a un estándar internacional estelar mediante cinetismo, prueba social persuasiva y micro-interacciones web inmersivas.

- **Task 8.1: Hero Section Inmersivo (Magnetic UI)**
    - [ ] 8.1.1: Implementar efecto Tilt 3D (Parallax Inverso) en el panel derecho (Glassmorphism), logrando que el cristal siga el movimiento interactivo del cursor.
    - [ ] 8.1.2: Sustituir el actual slider estático de imágenes por un Hero cinemático con Video Loop en segundo plano, ultra-comprimido (WebM), enseñando reflejos y cortes industriales.
    - [ ] 8.1.3: Refinar overlay y gradientes CSS para preservar el Local Contrast y la legibilidad absoluta del Copy Principal SEO.

- **Task 8.2: Propuesta de Valor Editorial (Storytelling Z-Pattern)**
    - [ ] 8.2.1: Desechar la cuadrícula estandarizada y reconstruir `ValueProposition.svelte` usando un patrón de zig-zag "Z-Pattern" (flujo óptico asimétrico de revista).
    - [ ] 8.2.2: Reemplazar los iconos genéricos Lucide por Macrofotografía hiperrealista (acercamientos milimétricos al aluminio anodizado y biseles PBR).
    - [ ] 8.2.3: Programar Tipografía Cinética (Staggered Reveal) atada al ScrollSpy para hacer aparecer los textos como cortina abriéndose fluido tras hacer scroll.

- **Task 8.3: Validador Paramétrico Sensorial (Geometry Feedback)**
    - [ ] 8.3.1: Diseñar Componente interactivo SVG de Plano Arquitectónico junto al Input de Medidas en el Cotizador Ducha/Baño B2C.
    - [ ] 8.3.2: Vincular Reactividad Svelte 5 para que el polígono SVG escale su aspecto (Ancho y Alto) en milisegundos reales mientras el usuario digita medidas.
    - [ ] 8.3.3: Vincular el Core de Tolerancias NSR-10 para hacer un Fill Transition rojo alertando fallas espaciales/físicas instantáneamente frente a los ojos del comprador.

- **Task 8.4: Prueba Social y Autoridad Industrial (Trust Engine)**
    - [ ] 8.4.1: Maquetar un Ticker Infinito (carrusel animado por GPU) conteniendo Logotipos en escala de grises (opacidad 30%) de Aliados, Marcas ISO, o Constructoras (Autoridad Estática).
    - [ ] 8.4.2: Insertar un bloque de Impacto Numérico Cuantitativo con mega-tipografías exponiendo "10+ Años Promedio", "Extrusión Calibre 2mm" para la mentalidad del Ingeniero Civil.

- **Task 8.5: Enrutamiento de Embudo B2B (Sticky Call-To-Action)**
    - [ ] 8.5.1: Transformar el Header NavBar para alojar una inyección en vivo asíncrona ("Solicitar Cotización"), una vez rebasado el umbral Y del Hero Image.
    - [ ] 8.5.2: Investigar UX A/B para botón FAB (Floating Action Button) persistente que nunca abandone la órbita inferior derecha del usuario en páginas transaccionales largas.
