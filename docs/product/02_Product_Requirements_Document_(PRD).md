

# Product Requirements Document (PRD)
**Proyecto:** Plataforma Integral de Generación de Demanda y Gestión (CMS/CRM Propietario) - Templados AL13  
**Versión:** 3.0 (Especificación Profunda Big Tech Standard - Custom Backend Pivot)  
**Fecha:** Febrero 2026  
**Estado:** Proposed & Under Review  
**Autores (Meta):** Agente Arquitecto Inteligencia Artificial (Antigravity Framework)

> 
> **Propósito Meta:** Este documento opera como el *Golden Template* fundacional del framework de *Specification-Driven Development* (SDD). Ha sido reconstruido con la densidad, el rigor y la exhaustividad que exigen empresas de la talla de FAANG (Meta, Amazon, Apple, Netflix, Google), adaptado al pivote arquitectónico de "Soberanía de Datos" dictado por la gerencia.
> 
> **Protocolo Operativo para Agentes de Software Futuros:**
> 1. **Prohibición de SaaS Externos:** Todo Agente de IA tiene estrictamente prohibido proponer o implementar dependencias en CRMs/CMS en la nube (Hubspot, GHL, Contentful, Sanity). El ecosistema debe ser gobernado 100% por código local y bases de datos propias (ej. PostgreSQL/Supabase autogestionado).
> 2. **Trazabilidad Absoluta:** Ninguna línea de código debe escribirse si no está mapeada directa y unívocamente a un Requisito Funcional (ej. `REQ-F-042`) detallado en este documento.
> 3. **Parsabilidad:** Identificadores únicos estandarizados para validación de Linter CI/CD.

---

## 1. Introducción

El presente Product Requirements Document (PRD) establece la especificación exhaustiva, funcional y estratégica para el replanteamiento absoluto de la presencia digital de **Templados AL13**. La iniciativa no es una mera "actualización de portal web", sino el desarrollo de un Ecosistema de Software Integral: un motor de ventas Edge de alto rendimiento (Frontend) fusionado íntimamente con un **Gestor de Contenidos (CMS) a medida y un Gestor de Relaciones (CRM) propietario** (Backend).

En el ecosistema B2B y B2C del año 2026, la captura ética de datos propios (*First-Party Data*) es el vector de escalabilidad. El dominio `templados-al13.principalwebsite.com` será transformado en una Aplicación Multipágina (MPA) de hidratación parcial (*Islands Architecture*) para dominar el SEO en Riohacha, La Guajira, mientras la administración del negocio quedará blindada bajo `admin.templados-al13.com`.

## 2. Contexto del Problema

La viabilidad comercial prolongada de Templados AL13 se encuentra asediada por vectores de fricción críticos:

### 2.1. Fricción Transaccional en B2B (Contractors / Archs)
Los procesos de cotización actuales requieren intervención humana sincrónica. Múltiples horas gastadas en calcular tolerancias de perfiles (ej. 5020, 7038) que resultan en pérdida de negocios frente a contratistas apresurados.

### 2.2. Brecha Cognitiva Geométrica B2C (End Consumers)
Los consumidores finales adolecen de un problema crónico de visualización. Texturas de aluminio (Maderato) y vidrios fallan en convencer mediante fotos planas, estancando cierres de $1,000+ USD.

### 2.3. Colapso SEO, Extracción de Datos y Dependencia de Agencia
*   **Vulnerabilidades SEO:** `alt-tags` vacíos (`!()`) y WCAG roto.
*   **Vulnerabilidades Competitivas:** Precios estáticos expuestos en folletos digitales son extraídos (scraped) por la competencia. MasVidrios y La 12 Ltda. atacan digitalmente.
*   **Acaparamiento Tecnológico:** El dueño del negocio no puede instanciar un simple nuevo proyecto de obra en su web sin rogarle a desarrolladores externos una actualización manual.

## 3. Objetivos del Producto (Formato OKR)

**Objetivo Estratégico 1 (O1): Convertir la plataforma en el principal motor autónomo y soberano de First-Party Data de La Guajira.**
*   **KR 1.1:** Lograr una tasa de conversión (opt-in rate) del 8% de visitantes únicos en la herramienta "Calculadora Paramétrica" protegida por First-Party Gate.
*   **KR 1.2:** Desplazar el 100% de la gestión de prospectos de libretas/Excel al nuevo módulo *CRM Propietario* dentro del Q1 post-lanzamiento.

**Objetivo Estratégico 2 (O2): Establecer hegemonía absoluta en rendimiento técnico y SEO Semántico regional.**
*   **KR 2.1:** *Largest Contentful Paint (LCP)* < 2.5s sostenido bajo emulaciones locales 3G.
*   **KR 2.2:** *Interaction to Next Paint (INP)* < 200ms bajo pruebas de saturación táctil.
*   **KR 2.3:** Auditar cero errores de accesibilidad según WCAG 2.2 Nivel AAA. Target mínimo imperativo de 24x24 px.

**Objetivo Estratégico 3 (O3): Otorgar Independencia Total de Maniobra (CMS Proprietario).**
*   **KR 3.1:** Reducir al 0% el "Tiempo de Dependencia de Devs (TDD)" para subir inventario, modificar variables descriptivas o gestionar proyectos visuales (Galerías Drag-and-Drop) desde el panel Admin.

## 4. Stakeholders y Matriz RACI

(R: Responsible - A: Accountable - C: Consulted - I: Informed)

| Stakeholder / Rol | Backend (CMS/CRM Database) | Frontend (Edge / WebGL) | QA & Funcionalidad |
| :--- | :--- | :--- | :--- |
| **Gerencia General (AL13)** | A, R | C | A |
| **Equipo de Ventas local** | C | I | R (Flujo CRM Leads) |
| **System Architect (IA/Devs)** | R | A, R | R |
| **Usuarios Finales (B2B/B2C)**| N/A | C (Telemetría) | I |

## 5. Personas de Usuario (Análisis Profundo)

### 5.1. Persona 1: Héctor, El Arquitecto de Volumen (B2B)
*   **JTBD:** "*Necesito* cotizar asincrónicamente cargas de viabilidad para fachadas y perfiles de inmediato, *para* mandar licitaciones velozmente".
*   **Interacción:** Interactúa extensamente con modelos 3D y Calculadora Paramétrica. Elude precios públicos (no existen) y espera el PDF al correo vía el CRM backend invisible.

### 5.2. Persona 2: Camila, La Reformista Residencial (B2C)
*   **JTBD:** "*Necesito* saber exactamente qué textura de aluminio y reflectividad de baño obtendré, *para* pagar miles de dólares sintiéndome segura del contratista guajiro".
*   **Interacción:** Juega emotivamente con PBR renders (**Threlte**), navega una galería seductora subida por el CMS interno del dueño.

### 5.3. Persona 3: El Administrador (Gerente AL13)
*   **JTBD:** "*Necesito* subir mis obras ejecutadas ayer, modificar especificaciones de mis vidrios y responder a los Leads calificados que llegan, *para* controlar mi negocio centralizadamente sin tocar código".
*   **Interacción:** Panel CRUD (`/admin`) blindado. Experiencia de bloques intuitivos (drag-and-drop). Generación automática de versiones de imagen modernas WebP/AVIF al servir de base de datos (`Supabase`/`PostgreSQL`).

## 6. User Journeys (Mapa Narrativo Detallado)

### 6.1. Journey de Soberanía Operativa: Alta de Proyecto por Administrador
1.  **Ingreso Seguro:** El Gerente navega a `admin.templados-al13.com`. Sistema emite login seguro (JWT Tokenizado).
2.  **Operatividad Intuitiva:** Accede a la vista `Dashboard > Proyectos Creados`. Hace clic en "Nuevo Proyecto".
3.  **Gestión Dinámica:** Escribe "División Acústica Calle 15", arrastra 4 JPGs de 5MB desde el escritorio, y hace "Publicar".
4.  **Procesamiento en Edge Computing:** El Backend procesa la solicitud. Transcodifica asincrónicamente a WebP de optimizado, genera atributos `alt` semánticos, invoca revalidación (On-Demand Revalidation) en Cloudflare, y el nuevo proyecto se publica globalmente sin intervención de despliegue manual.

### 6.2. Journey Transaccional B2B: Cotización Directa a Base de Datos Propia
1.  **Interacción de Valor:** Arquitecto ingresa en móvil a "Isla Calculadora". Coloca 2.4x2.1 mts en Perfilería 7038.
2.  **Validación Inteligente:** Motor CSS (`:has(:invalid)`) y JS Front corrigen proporciones (Carga de Viento permitida).
3.  **Captura Soberana:** Modal solicita Email para despejar PDF. Una vez enviado, la UI no se bloquea.
4.  **Bucle de Retención Local:** El Payload entra a la Base de Datos AL13 (Propia). El Endpoint CRM Backend clasifica al arquitecto como "HOT LEAD" y notifica al empleado comercial (local) directamente bajo una interfaz de tickets internos.

## 7. Casos de Uso (Especificación Granular)

*   **UC-01 (Autogestión de CMS):** Como Administrador, uso un editor de bloques para poblar el catálogo, subir GLB models (<15MB) e inyectar test de proyectos para que el sitio público lo refleje dinámicamente.
*   **UC-02 (Pipeline Local de Leads - CRM):** Como Vendedor, abro la pestaña de "Prospectos CRM", recojo a Héctor (Lead #402), verifico las tolerancias que calculó en la web y muevo su estado estilo Kanban de "Nuevo" a "Cotizado Manualmente".
*   **UC-03 (Manipulación Espacial B2C - 3D):** Como consumidor, roto un modelo web de *Puerta Ventana 7038* evaluando reflexión lumínica bajo motor *Threlte* con transmitancia de 0.95 en Canvas hidratado asincrónicamente.
*   **UC-04 (Animación Nativa Cross-Page):** Navegación fluida de catálogo usando API *View Transitions* interpolando imágenes en el viewport.

## 8. Funcionalidades Principales Estratégicas

1.  **Fundación Frontend Zero-JS (Astro 6.0):** Modelado SSG/Islands que consume datos directamente desde Supabase inyectando View Transitions.
2.  **Panel de Administración Backend Completo (CMS + CRM):** Frontend privado conectado a Database central (**Supabase**) con encriptación RLS para gestionar inventario, roles, y flujos de embudo de prospectos. Drag-and-Drop enabled.
3.  **Motor 3D Paramétrico PBR:** Embebedor ligero en la web (Threlte) calibrado materialmente (Specular 0, Transmissibility alta) y comprimido glTF/Draco estricto.
4.  **Calculadora Edge SSR/CSR:** Funciones lógicas que corren en el cliente bajo *islas de Svelte* blindando la API/DB privada de scraping y comunicándose con seguridad al CRM local.

## 9. Requisitos Funcionales Extremos (FR)

| ID | Regla | Aceptación Condicional (Gherkin/Logic) |
| :--- | :--- | :--- |
| **FR-01** | Lead Capture Obligatorio | `IF` Usuario solicita PDF métrico, `THEN` Inputs Email & Perfil Rol deben ser validados, sino, `DISABLE` Sumisión Algorítmica. |
| **FR-02** | Animaciones Ininterrumpidas | Todo elemento de imagen miniatura de catálogo requiere una variable de instancia CSS estricta `view-transition-name: item-[id]` atada a la renderización del CMS, permitiendo vuelo fluido hacia vista descriptiva. |
| **FR-03** | Endpoints API Bi-direccionales de Base de Datos Propia | Formularios estáticos no pueden depender de Typeform. Toda subida JSON debe procesarse por Rutas Autorizadas `POST /api/internal/ingest` hacia el cluster propietario de la compañía. |
| **FR-04** | Flexibilidad Tipográfica Text-Boxes y UI Fluid | Cajas de texto B2B para comentarios mutables crecerán nativamente usando CSS `field-sizing: auto`. Formularios adoptan esquema OS forzando uso `light-dark()` para mitigar FOUC. |
| **FR-05** | CMS "No-Code" Interface | El panel de control debe tener componentes interactables y tolerar subidas multiparte generadas por interacciones Drag/Arrastrar mouse o toque en pantallas táctiles sin obligar formato JSON crudo al administrador. |

## 10. Requisitos No Funcionales Core (NFRs)

### 10.1. Seguridad y Soberanía (NFR-SEC)
*   **NFR-SEC-01:** La BD de administración será resguardada centralmente. Ningún token, identificador cruzado o *tracking-pixel* de un proveedor SaaS (Airtable / Salesforce) extraerá First-Party Data de AL13.
*   **NFR-SEC-02:** Conexiones SSL Encriptadas y JWT Auth obligatorio de persistencia corta para operaciones de CMS.

### 10.2. UX / Hardware Vitals (NFR-VITALS)
*   **NFR-VITALS-01:** LCP sub 2.5s y INP $\le 200$ milisegundos certificados matemáticamente sobre CPU emulada "Fast 3G".
*   **NFR-VITALS-02:** Límite Estricto de Memoria Tridimensional. Para salvaguardar la RAM de los usuarios B2C, la interfaz de carga de Modelos del CMS rechazará archivos glTF/glb superiores a **15 MB**.

### 10.3. Inclusión Universal Pura (NFR-A11Y)
*   **NFR-A11Y-01:** Todos los controles táctiles de 3D, validadores CRM, iconos de contacto miden **24 x 24 píxeles CSS estricto** [WCAG 2.5.8 Nivel AA].
*   **NFR-A11Y-02:** Uso implacable de `scroll-padding-top` anclado a valores variables para impedir ocultación visual de elementos en foco del Tabulador [WCAG 2.4.12 Nivel AAA Focus Not Obscured].

## 11. Reglas de Negocio Vitales

1.  **Protección de Precios (Anti-Scraping):** Jamás se imprimirán costos de proyectos pesados estáticos en el DOM. El prospecto *debe* pagar con su dato primario para obtener una cifra formalizada humanochequeada.
2.  **Autonomía Perimetral:** El Administrador General es el único propietario intelectual de los Textos y del DataLake almacenado del CRM. Todo es control internally owned.

## 12. Flujos del Ciclo Orgánico B2B (Data Pipe Flow)

`[Usuario en La Guajira] -> [Busca "Acústica Riohacha"] -> [Click SEO Result Astro SSG] -> [Visita Catálogo Fluido] -> [Juega Componente 3D (Isla Idle)] -> [Abre Calculadora Tolerancias Carga Viento] -> [Inputs OK -> Rinde Email en Gated Content] -> [Ruta API Edge de Ingreso dispara POST backend propio] -> [CRM local AL13 Database inserta Record] -> [Team AL13 es alertado vía dashboard propio interno en tiempo real].`

## 13. Componentes de Métrica de Éxito y KPIs

*   **Tasa de Revalidación (CMS Uptime Sync):** 100% autogestión humana sin devs. Reducción absoluta a 0 horas la espera mensual por cambios del sitio.
*   **Lead to Opportunity Ratio:** Auditoría directa del CMS/CRM Propio: Total Oportunidades Válidas originadas de la Web $/$ Leads Totales Generados por Calculadora Paramétrica.

## 14. Mapa de Dependencias y Riesgos (RACI de Fallo)

| Identificador Riesgo | Vector | Exposición | Gravedad | Plan y Estrategia de Choque Inmediato |
| :--- | :--- | :--- | :--- | :--- |
| **RI-DB-1** | Gestión de Seguridad Privada | Backend Hacking de CRM Crudo y Fugas PII | Alto | Cifrado perimetral TLS obligatorio, Tokenización de Auth en el Panel CMS y bloqueos CORS estáticos a URIs amigas. Backup diario Cloud persistente (PostgreSQL o equivalente). |
| **RI-PERF-2** | Tasa Tasa de FPS Móvil 3D | Caída PBR WebGL en celulares viejos baratos | Medio | "Lazy Evaluation". Condicional en Astro detectando Hardware Limit *pre-lanzamiento* de Canvas. Si GPU es pobre, inyecta `fallback_img.webp` estático originado por CMS automáticamente. |

## 15. Plan de Despliegue en Fases (Roadmap)

1.  **Semanas 1-3 (Fase Alpha Core Backend):** Esquematización de DB propietaria. Diseño API endpoints para CMS (Actualización de bloques informativos, almacenamiento S3 imágenes bucket, compresión de activos). Desarrollo del *Mini-CRM* de Leads crudos en vistas Dashboard.
2.  **Semanas 4-6 (Fase Beta Fronend SSG/CSS):** Conexión API a interfaces híbridas de Astro (**Svelte**). Adopción profunda de lógicas algorítmicas `Container Queries` bajo **Tailwind CSS**, y transiciones cross-page dualidad Light/Dark mode.
3.  **Semanas 7-8 (Fase Release-Candidate Render):** Montaje en Astro Island del Engine **Threlte**, y validación B2B Lead Generator hacia Supabase probando latencias bajo simuladores de tráfico de La Guajira.
4.  **Semanas 9-10 (Producción Sólida):** Cierre final de testing Cypress E2E. Entrega de claves superadmin del Panel Propietario a la gerencia AL13. Despliegue de red de Borde (Cloudflare/Vercel) final.

## 16. Alcances Removidos (Fuera para MVP)
**E-commerce Transaccional Asíncrono Completo.** Ninguna pasarela de pago (Stripe, Wompi, ePayco) se codificará. El sector es excesivamente ad-hoc. Toda canalización se retendrá en etapa previa (B2B Leads en CRM propio), derivando a representantes de venta humanos de Templados AL13 el cobro post-negociación.

---
*Este PRD re-ingeniado asume control estructural y arquitectónico totalizando un modelo Backend Propietario bajo estándares inamovibles Big Tech SDD Spec.*
