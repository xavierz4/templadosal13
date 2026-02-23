# Templados AL13 - Documentation eBook

*A comprehensive compilation of all Templados project documentation, organized for mobile reading.*

## Table of Contents

- [Product Vision Document (PVD)](#product-vision-document-pvd)
- [Product Requirements Document (PRD)](#product-requirements-document-prd)
- [User Stories Document (USD)](#user-stories-document-usd)
- [Software Requirements Specification (SRS)](#software-requirements-specification-srs)
- [Product Roadmap](#product-roadmap)
- [Master Backlog & Epics (Templados AL13)](#master-backlog--epics-templados-al13)
- [Backlog Granular de Ejecución (Dinámico y Exhaustivo)](#backlog-granular-de-ejecución-dinámico-y-exhaustivo)
- [Architecture Document](#architecture-document)
- [Transformación Digital y Arquitectura Web 2026 para Templados AL13: Análisis Crítico y Estrategia de Modernización](#transformación-digital-y-arquitectura-web-2026-para-templados-al13-análisis-crítico-y-estrategia-de-modernización)
- [Software Design Document (SDD)](#software-design-document-sdd)
- [Technical Specification (Tech Spec)](#technical-specification-tech-spec)
- [UI/UX & Motion System Document](#uiux--motion-system-document)
- [Data Model Document](#data-model-document)
- [RFC-001: Arquitectura de Islas (Astro), Despliegue Haces/Edge, y Soberanía Backend (CMS/CRM Propietario)](#rfc-001-arquitectura-de-islas-astro-despliegue-hacesedge-y-soberanía-backend-cmscrm-propietario)
- [ADR-001: Islands Architecture sobre SPAs Monolíticas (React/Next.js)](#adr-001-islands-architecture-sobre-spas-monolíticas-reactnextjs)
- [API Specification Document](#api-specification-document)
- [Security Design Document](#security-design-document)
- [PROTOCOLO MAESTRO: THE SCRIBE V2.0 (The Architect-Scribe)](#protocolo-maestro-the-scribe-v20-the-architect-scribe)
- [Coding Standards Document](#coding-standards-document)
- [Engineering Guidelines Document](#engineering-guidelines-document)
- [DevOps & Deployment Document](#devops--deployment-document)
- [Observability Document](#observability-document)
- [SRE & Reliability Document](#sre--reliability-document)
- [Runbook / Operations Manual](#runbook--operations-manual)
- [Testing Strategy Document](#testing-strategy-document)
- [🧠 El Manual del Lead AI Engineer: Especialidad en Agentes Autónomos](#-el-manual-del-lead-ai-engineer-especialidad-en-agentes-autónomos)
- [Incident Postmortem Document](#incident-postmortem-document)
- [BigTech Software Documentation Framework](#bigtech-software-documentation-framework)

---

**ESTADO DID:** `[DID_CERTIFIED]`

# Product Vision Document (PVD)
Documentación Profesional de Desarrollo de Software: Templados AL13

## Fase 1: Product Vision Document (PVD) - Versión 4.0 (Arquitectura Soberana In-House)

### 1.1 Introducción y Contexto del Proyecto

En el contexto operativo de 2026, la industria de la construcción, remodelación y provisión de materiales arquitectónicos (vidrio templado y aluminio) requiere digitalización mediante ecosistemas propietarios para mantener competitividad. El dominio `templados-al13.principalwebsite.com` opera actualmente como un catálogo estático, sin visibilidad en motores de búsqueda transaccionales en la región de Riohacha, La Guajira.

Este *Product Vision Document (PVD)* enmarca la hoja de ruta para migrar la infraestructura actual y desplegar una **Plataforma Integral de Generación de Demanda y Operación Autónoma**. El desarrollo consiste en una arquitectura bi-nuclear:
1.  **Núcleo Externo (Frontend):** Un portal público propulsado por Arquitectura de Islas (Astro + **Svelte**) y Edge Computing, diseñado para barrer la competencia en captación SEO y captura de datos mediante simuladores asíncronos 3D (**Threlte**) y paramétricos.
2.  **Núcleo Interno (Backend Soberano):** La absoluta erradicación de Software as a Service (SaaS) de terceros. Implementación de un Gestor de Contenidos (CMS) in-house y un Gestor de Relaciones (CRM) propietario (**Supabase/PostgreSQL**) para atrincherar y capitalizar el *First-Party Data* (datos propios), devolviendo el control absoluto de la estrategia comercial al CEO de Templados AL13.

### 1.2 El Abismo del Mercado Actual (Definición del Problema)

El ecosistema B2B (Arquitectos, Contratistas) y B2C (Remodeladores Residenciales) sufre ineficiencias devastadoras, mientras que la empresa padece una pérdida silenciosa de patrimonio digital. El diagnóstico clínico revela cuatro patologías críticas:

*   **Fricción Operativa (El Cuello de Botella Humano):** El modelo de negocio actual es hiper-sincrónico. Si un arquitecto necesita saber la resistencia a carga de viento de un ensamble corredizo Referencia 5020 a las 11:00 PM, o el costo proyectado en metros cuadrados de vidrio 8mm de impacto, no tiene canales para autoservirse. Esto fuerza al equipo de ventas a gastar horas diarias en llamadas repetitivas y correos reactivos, dilatando el cierre de negocios ágiles.
*   **Brecha de la Visualización Táctil (La Ceguera del Cliente B2C):** Un cliente final invirtiendo ~$2,000 USD en divisiones de baño se enfrenta a fricción por el uso de catálogos PDF 2D. La incapacidad de renderizar la incidencia de luz sobre acabados (ej. "Aluminio Maderato" vs "Aluminio Champaña") genera falta de validación visual, reduciendo el índice *Sales Velocity*.
*   **Vulnerabilidad Estructural (Deuda Técnica SEO):** El portal legado `templados-al13` violenta los estándares de 2026. Al carecer de atributos `alt` en la semántica de imágenes e indexación jerárquica, es un "agujero negro" para Google. Mientras tanto, depredadores regionales como *MasVidrios* capturan la intención de compra transaccional utilizando cupones tóxicos del 30% para minar datos, y corporaciones como *Vidrio y Aluminios del Sur* monopolizan el tráfico espacial (Waze, GMB).
*   **Acaparamiento Digital y Secuestro Tecnológico:** Templados AL13 depende de terceros para la actualización de su inventario. El gerente general no puede actualizar el portafolio de instalaciones recientes (Zero-Day Content) sin someterse al SLA, latencia y costos operativos de agencias externas. No hay autonomía de inventario.

### 1.3 La Oportunidad de Negocio y el Enfoque en Valor Radical

La refactorización busca establecer dominancia técnica local mediante asimetría de software, inyectando **Valor Explícito y Medible**:

*   **Para el Dueño del Negocio (Retorno de Propiedad y Eficiencia):**
    *   *Autogestión Instantánea:* Al poseer un Panel de Administración (CMS) Drag-and-Drop, el dueño puede subir una foto de alta calidad desde su smartphone y el servidor la codifica dinámicamente, refrescando la galería del mundo entero instantáneamente (Zero Dev Dependency).
    *   *Propiedad de Embudo Inmutable:* Al interceptar leads (nombre, email, requerimientos métricos B2B) y alojarlos en un CRM Propietario local (Base de Datos protegida de AL13), el dueño blinda el activo más costoso de la era digital: su base de prospectos frente a posibles caídas de plataformas externas.
    *   *Automatización de Tareas de Muy Bajo Valor:* El motor de validación paramétrica descarta a curiosos no cualificados y entrega al vendedor un lead "tibio-caliente" con el 80% del trabajo geométrico ya validado por el software.
*   **Para el Usuario Final B2B/B2C (Inmediatez y Certidumbre):**
    *   *Disminución de la Ansiedad de Compra:* Implementando la etiqueta de renderizado interactivo impulsada por **Threlte**, el cliente residencial (B2C) rota y evalúa modelos PBR con conservación de reflejo, sintiéndose seguro del acabado estético sin salir de casa, con perfecta gestión de memoria móvil.
    *   *Rapidez Competitiva:* El Arquitecto (B2B) introduce cotas y recibe su cálculo/validación a través de un PDF despachado por el micro-backend a su correo casi instantáneamente, logrando incluir a AL13 en su licitación el mismo día.

### 1.4 Propuesta de Valor (Alineación Comercial)

**Para el Mercado (Contratistas y Dueños de Casa):**
> "La única plataforma de La Guajira que erradica la espera. Diseña tu proyecto arquitectónico en 3D volumétrico, calcula tolerancias milimétricas en tiempo real desde tu móvil 3G, y recibe cotizaciones exactas asincrónicas sin persecuciones de ventas."

**Para el Negocio (Templados AL13 - Gerencia):**
> "Un ecosistema de software a medida libre de rentas a terceros que actúa como el mejor vendedor top-performer de la compañía 24/7/365. Cero latencia SEO (Score 100/100 LCP), y un Panel de Control Administrativo que le otorga el poder absoluto para publicar contenido y gobernar la bandeja de Leads comerciales sin tocar una sola línea de código."

### 1.5 Arquitectura de Audiencias: Personas de Usuario (Análisis Psicológico)

Para no construir características en el vacío (Feature Bloat), todo desarrollo se supeditara a aportar a tres agentes:

1.  **Persona 1: El Profesional / Contratista (Sector B2B - El Multiplicador de Volumen)**
    *   *Arquetipo:* Ingeniero residente, Maestro instalador mayorista, Firma arquitectónica en Riohacha.
    *   *Contexto Físico:* Usualmente en obra o en tránsito, con conectividad celular intermitente (latencia alta, <5 Mbps). Tolerancia nula a interfaces no optimizadas (TTI alto). Realiza pedidos de volumen iterativos.
    *   *Lo que el Software le resuelve:* Precisión y tiempo. Necesita confirmar si el "vidrio de 8mm sobre una luz de 3 metros soporta presión acústica". El cotizador algorítmico Frontend actúa como su validador. El Backend CMS le asegura manuales de ingeniería en PDF disponibles siempre 24/7.
2.  **Persona 2: El Cliente Final / Propietario (Sector B2C - El Comprador Emocional)**
    *   *Arquetipo:* Familia renovando su apartamento, profesionales jóvenes construyendo su primera casa.
    *   *Contexto Físico:* Navegando desde un sofá a últimas horas de la noche (iOS / Android Dark Mode activado nativamente por CSS `light-dark()`).
    *   *Lo que el Software le resuelve:* Certeza empírica. Tiene pavor a arrepentirse de pagar por "Maderato" y que en la vida real parezca plástico barato. El modelo interactivo PBR inmersivo calma esa fricción al replicar el rebote lumínico con fiabilidad casi nanométrica.
3.  **Persona 3: La Ciber-Gerencia (Dueño del Negocio AL13 - El Operador Omnisciente)**
    *   *Arquetipo:* Dirección Operativa de Templados AL13.
    *   *Contexto Físico:* Oficina u operando dinámicamente desde un portátil en sitio. No es programador y su tiempo vale cientos de dólares la hora.
    *   *Lo que el Software le resuelve:* Soberanía y Rapidez Directiva. Entra a `admin.templados-al13.com`, usa un modelo Drag-and-Drop y publica un artículo sobre su última fachada instalada con SEO automatizado, aplastando estratégicamente el posicionamiento estático de la competencia local en cuestión de segundos.

### 1.6 Objetivos Estratégicos (Mandatos de Negocio C-Level)

El roadmap prioriza el éxito comercial sobre la pirotecnia tecnológica:

1.  **Mandato de Conversión Asíncrona (North Star):** Lograr que la captación del First-Party Data sea un subproducto natural del flujo. Convertir a AL13 en un repositorio masivo de leads locales usando las calculadoras matemáticas y descargables como cebo incondicional ("Gated Content").
2.  **Mandato de Supresión de Tiempos Muertos:** Erradicar radicalmente la intermediación técnica (Desarrolladores/Agencias) de operaciones banales como cambiar inventario de ventanería, centralizando ese poder en el Administrador y acelerando la iteración de lanzamientos semanales a cero (0) horas de Time-to-Publish.
3.  **Mandato de Hegemonía Performance:** Superar los estándares regionales (Costa Norte de Colombia) logrando métricas Top-Percentile mundiales (Core Web Vitals). Un LCP < 2.5s garantizado mediante framework SSG Híbrido (Astro) para minimizar la tasa de rebote.
4.  **Mandato de Retención Cinematográfica:** Uso inexorable de View Transitions API. El sitio público no recarga, fluye sin ataduras, subcomunicando psicológicamente al usuario: *"Si cuidamos estos detalles micrométricos en nuestra tecnología frontal (Premium), nuestra ventanería presencial posee la misma exactitud microscópica".*

### 1.7 Mástil Analítico: KPIs de Producto y Validación Comercial

Implementaremos la filosofía "Lo que no se mide empíricamente, no existe":

| KPI Fundamental | Definición Táctica y Cómputo | Punto de Referencia (Baseline actual) | Meta T+12 Meses |
| :--- | :--- | :--- | :--- |
| **Lead to Opportunity Ratio** | (Oportunidades filtradas cualificadas en admin CRM / Leads basura o crudos) x 100. Valida si la Calculadora filtra correctamente el ruido y trae prospectos serios al vendedor. | Inexistente (~0) | **45%** |
| **Tasa de Independencia TDD** | (Tiempo en dependencias de desarrolladores / Mantenimiento general). Cuantifica el poder otorgado a gerencia AL13. | 100% | **0% (100% Autónomo)** |
| **Tiempo LCP en RUM Chrome UX** | Tiempo real de renderizado del texto / imagen hero base capturado ciegas en conexiones 3G-LTE Riohacha. SEO Rank Factor #1. | Desconocido (Critico) | **< 2000 ms** (P75)|
| **Opt-in de Visor 3D / Calculadora** | Sesiones únicas que accionan el Canvas WebGL (Threlte) Y completan el submit hacia nuestro Backend nativo propietario (Supabase). | 0% | **8% Conversión Fija** |

### 1.8 Exclusión de Ruido: Fuera de Alcance y Mitigación de E-commerce
Para salvaguardar las ventanas de lanzamiento y ceñirse al ROI, **se excluye dictatorialmente** (Scope Creep):
*   La implementación de carritos de compras sincrónicos o pasarelas de pago directas (tipo E-commerce Stripe/Wompi). La arquitectura de aluminio es compleja, altamente dimensionable y requiere verificación de un técnico humano post-cotización. **El e-commerce mata la conversión por parálisis de riesgo en altas sumas.** Todo desemboca en Leads al CRM interno para cierre asistido.

### 1.9 El Cimiento Legal B2B/B2C (Casos de Riesgos Técnicos)

| Vectores de Falla de Sistema | Impacto Directivo | Plan Resolutivo de Mitigación Inmediata |
| :--- | :--- | :--- |
| **Fuga de Base de Datos B2B** | Catastrófico (Robo Competitivo) | **Securización Base:** Al no usar CRMs de agencias, alojar la DB relacional (ej. PostgreSQL) con estrictos mandatos RBAC. Tokenización JWT profunda y encriptación en vuelo `HTTP/3` forzada por Cloudflare Edge. |
| **"Memory Choke" B2C 3D Render** | Alto (Destrozo UI/UX) | **Barrera Dura Archivos:** La UI de panel de carga del dueño AL13 bloqueará el `submit()` de cualquier archivo volumétrico (`.glb`) que exceda los `15MB`, empujando la compresión Dracco o mesh decimation para cuidar RAM móvil de los clientes. |
| **Pérdida Transaccional 3G/LTE**| Crítico (Rebote) | **Fallback de Hidratación (Islands):** Aislar todo peso JavaScript a zonas no críticas. Astro entregará HTML funcional. Si el JS del Cotizador colapsa en red asimétrica, la web muestra estado de Error semántico o degrada grácilmente a un mailto estático (`href="mailto:"`) rescatando el contacto. |

---
*Fin Documento de Visión. Validado como Pilar Fundacional "Big Tech" para iteración atómica hacia especificaciones DRD/RFC correspondientes. El ecosistema es 100% orientado al impacto de valor comercial y soberanía de los activos digitales.*

---

**ESTADO DID:** `[DID_CERTIFIED]`

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


---

# User Stories Document (USD)

**Proyecto:** Plataforma de Generación de Demanda y Operación Autónoma - Templados AL13  
**Versión:** 1.0 (Especificación Ejecutable BDD)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Transmutador:** The Scribe V2.0  


## 1. Topología de Épicas (Epics Overview)

Para evitar la fragmentación lógica, las historias interactúan bajo tres super-estructuras o Épicas:

*   **EPIC-01: El Motor de Autogestión (CMS/CRM Soberano).** Permite a la gerencia de Templados AL13 operar la plataforma como administrador de bases de datos, catálogos y prospectos comerciales sin latencia de terceros.
*   **EPIC-02: La Máquina de Cotización Paramétrica (B2B).** Capacita a los arquitectos a calcular volumetrías e inyectar Leads altamente calificados directo a la DB de AL13.
*   **EPIC-03: Visualización Táctil de Alta Fidelidad (B2C).** Renderizado de componentes PBR con **Threlte** para clientes residenciales, con topes de seguridad en red 3G.

---

## 2. Historias de Usuario: EPIC-01 (CMS/CRM Soberano)

### US-101: Autenticación del Gerente (Zero-Trust)
**Como** Administrador de Templados AL13  
**Quiero** autenticarme en un panel de control privado  
**Para** acceder a los datos de mi negocio y actualizar el catálogo sin depender de externos.

*   **Prioridad:** Crítica (P0) | **Estimación:** 3 Story Points
*   **Dependencias:** Backend Auth Server, Base de datos PostgreSQL/Supabase.
*   **Notas Técnicas:** Uso obligatorio de JWT Access Token (15 min lifespan) y HTTP-Only Refresh Token. No se permite almacenamiento en localStorage.

**Criterios de Aceptación (Gherkin/BDD Executable):**
```gherkin
Feature: Admin Secure Login
  Scenario: Ingreso Exitoso y Generación de Sesión Segura
    Given el usuario navega a "https://admin.templados-al13.com"
    And el certificado SSL es válido
    When el usuario ingresa sus credenciales administrativas correctas
    And hace clic en el botón "Iniciar Sesión"
    Then el servidor emite un status HTTP 200 OK
    And el navegador recibe una cookie HTTP-Only "refresh_token"
    And la UI es redirigida al Dashboard Principal
  
  Scenario: Resistencia a Fuerza Bruta (Rate Limiting)
    Given la IP del usuario ha fallado 5 intentos en los últimos 3 minutos
    When el usuario intenta un 6to logueo, incluso con clave correcta
    Then el API Edge (Cloudflare Worker) emite un HTTP 429 Too Many Requests
    And el Payload devuelve "Account locked temporally" para evitar intrusión a la BD interna.
```

### US-102: Ingesta Fotográfica Optimizada Automática (CMS Upload)
**Como** Administrador de Templados AL13  
**Quiero** arrastrar y soltar (Drag-and-Drop) fotos crudas de 5MB en mi panel  
**Para** publicar nuevas obras instaladas sin tener que saber comprimirlas en Photoshop.

*   **Prioridad:** Crítica (P0) | **Estimación:** 5 Story Points
*   **Dependencias:** Edge Transcoder (WebP/AVIF API), Almacenamiento S3 Compatible.

**Criterios de Aceptación (Gherkin/BDD Executable):**
```gherkin
Feature: Dynamic Edge Image Compression
  Scenario: Compresión al Vuelo y Almacenamiento Soberano
    Given que el administrador está en "/admin/portfolio/nuevo"
    When arrastra una imagen .JPG de 4.5 MB sobre la zona interactiva
    Then la Isla de Svelte intercepta el archivo
    And el Backend (Worker) transcodifica la imagen a formato WebP
    And el peso resultante es inferior a 250 KB
    And la base de datos de AL13 guarda la URL del bucket propietario
    And The Edge Server invalida la caché de la subruta "/portfolio" para propagación global inmediata.
```

---

## 3. Historias de Usuario: EPIC-02 (Cotización Paramétrica B2B)

### US-201: Validación Geométrica en Tiempo Real (Anti-Scraping Quoter)
**Como** Arquitecto local o Maestro de Obra en La Guajira (Usuario B2B)  
**Quiero** ingresar las cotas y dimensiones exactas de una ventana en la web  
**Para** saber si estructuralmente ese ensamblaje es posible antes de enviar mis datos a la vidriería.

*   **Prioridad:** Alta (P1) | **Estimación:** 5 Story Points
*   **Dependencias:** Motor de lógica matemática local compilado (Isla SSR).
*   **Notas Técnicas:** Prohibido emitir un `fetch` a la API si los datos violan las leyes de la física del aluminio (ej. Ventana de 5 metros de ancho por 1 metro de alto sostenida por 2 rodachinas).

**Criterios de Aceptación (Gherkin/BDD Executable):**
```gherkin
Feature: Parametric Constraint Validation
  Scenario: Dimensionamiento Peligroso de Carga de Viento
    Given el usuario B2B ha hidratado el componente "<ParametricQuoter client:visible>"
    And ha seleccionado "Ventana Corrediza Referencia 5020"
    When ingresa "Ancho: 4.0 metros" y "Altitud: 3.0 metros"
    Then el CSS reacciona inmediatamente mediante el selector ":has(:invalid)"
    And un bloque visual de error declara: "Dimensiones exceden inercia permitida para el perfil. Requiere refuerzo estructural."
    And el botón de "Enviar al CRM" permanece estrictamente en estado "disabled".
```

### US-202: Inyección Gated (El Muro de First-Party Data)
**Como** Empresa Templados AL13 (Sistema Proxy)  
**Quiero** bloquear la entrega del PDF de tolerancias y precio estimado  
**Para** forzar al Arquitecto a entregar un nombre, correo y teléfono reales, capitalizando el Lead dentro de mi CRM Propietario.

*   **Prioridad:** Crítica (P0) | **Estimación:** 3 Story Points
*   **Dependencias:** Base de Datos Relacional (PostgreSQL).

**Criterios de Aceptación (Gherkin/BDD Executable):**
```gherkin
Feature: First-Party Data Capture Wall
  Scenario: Inserción de Registro Local en CRM AL13
    Given el usuario ha calculado unas medidas válidas de tolerancia
    And la UI muestra el modal de captura "Obtén los manuales exactos a tu correo"
    When el usuario introduce "hector@arq.com", "Héctor Construcciones" y "315456..."
    And presiona "Enviar"
    Then el Frontend despacha una llamada POST "/api/internal/ingest" silenciosa
    And el Node Backend limpia los datos contra inyecciones SQL (Sanitization)
    And la fila se inserta en la tabla "leads_crm" con estatus "HOT"
    And la UI retorna éxito sin refrescar la página, liberando el enlace de descarga local.
```

---

## 4. Historias de Usuario: EPIC-03 (Visualización 3D y UX B2C)

### US-301: Renderizado Protector de RAM Móvil (Three.js Lazy Load)
**Como** Propietario de Casa interesado en remodelaciones (Usuario B2C)  
**Quiero** interactuar con una "División de Baño Maderato" en 3D volumétrico en mi celular 3G  
**Para** convencerme de comprar, asumiendo que mi teléfono no se bloquee durante el proceso.

*   **Prioridad:** Alta (P1) | **Estimación:** 8 Story Points
*   **Dependencias:** Compresión Draco-glTF, ecosistema Threlte, Astro `client:idle` / `client:visible`.
*   **Notas Técnicas:** Si el contexto WebGL crashea (OOM), el wrapper de Threlte debe proveer un fallback pasivo hacia un archivo `.avif`.

**Criterios de Aceptación (Gherkin/BDD Executable):**
```gherkin
Feature: 3D Render Degradation and Limits
  Scenario: Retención del Hilo Principal (LCP Preservation)
    Given una página de detalle "/productos/division-bano-maderato"
    When el servidor Astro despacha el documento HTML
    Then la métrica LCP se resuelve dibujando primero una foto miniatura ligera
    And la etiqueta del Canvas 3D permanece inactiva (0 bytes de geometría descargados)
    When el Hilo Principal detecta ocio (Idle State / Interaction Trigger)
    Then se descarga el ".glb" comprimido vía Draco (< 15MB estricto)
    And se instancia la escena PBR (Physically Based Rendering) sin trancar el scroll del usuario en móvil táctil.
```

### US-302: Transición Cinematográfica B2C (View Transitions)
**Como** Visitante general explorando opciones y catálogos estéticos  
**Quiero** que al hacer clic en un acabado específico, la imagen "vuele" a la siguiente página sin que la pantalla parpadee en blanco.  
**Para** tener la sensación premium psicológica de que AL13 es una marca perfeccionista y líder.

*   **Prioridad:** Media (P2) | **Estimación:** 4 Story Points
*   **Dependencias:** View Transitions API (Chrome/WebKit nativo), Astro `<ClientRouter>`.

**Criterios de Aceptación (Gherkin/BDD Executable):**
```gherkin
Feature: Native View Transitions (No-SPA Simulation)
  Scenario: Morphing visual entre listas e ítems
    Given el usuario navega en "/catalogo" (Página Estática Astro)
    And existen 10 tarjetas de producto con propiedad CSS "view-transition-name: product-hero-01"
    When el usuario hace clic (Tap) en el hipervínculo de la tarjeta "#01"
    Then el navegador intercepta la navegación dura (Hard Refresh)
    And la GPU extrapola la coordenada física de la imagen en miniatura hacia la coordenada del contenedor "Hero" de la página destino
    And el header y el pie de página se mantienen anclados (fijados visualmente) sin desajustes de FOUC (Flash of Unstyled Content).
```

### US-303: Accesibilidad Absoluta Pura (Focus Un-Obscured)
**Como** Usuario con discapacidades motrices operando mediante teclado/tabulador  
**Quiero** navegar las complejas interfaces de cotización sin que el menú superior pegajoso me oculte lo que estoy leyendo  
**Para** operar el motor de captura de AL13 sin frustración (Mandato WCAG 2.2 AAA).

*   **Prioridad:** Crítica Regulatoria (P0) | **Estimación:** 1 Story Point
*   **Dependencias:** CSS Variables Nativas `var(--header-height)`.

**Criterios de Aceptación (Gherkin/BDD Executable):**
```gherkin
Feature: WCAG 2.4.12 Focus Not Obscured Implementation
  Scenario: Scroll Padding Matemático Defensivo
    Given un menú superior (Sticky Header) con una elevación visual de 80px CSS
    And una serie de inputs de formulario (Calculadora) descendiendo en el eje Y
    When el usuario oprime la tecla [TAB] para forzar foco en el `<input>` oculto debajo del header
    Then el navegador auto-desplaza la ventana ("Scroll") exactamente 80px adicionales + padding de confort
    And el borde nativo (Focus-ring) del `<input>` jamás toca ni se solapa con la opacidad del header superior.
```

---
*The Scribe V2.0 dictamina que este conjunto de historias encapsula el core operativo atípico e hiper-eficiente de La Guajira 2026. Al enviar estas historias a The Coder, la arquitectura de Astro y Supabase/PostgreSQL quedará validada por diseño de prueba.*


---

# Software Requirements Specification (SRS)

**Sistema:** Ecosistema Edge/Backend Proprietario - Templados AL13  
**Versión:** 1.0 (Ingeniería de Tolerancias y Rendimiento Extremo)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED_SRS]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Introducción y Propósito del Documento (Scope)

Este Documento de Especificación de Requisitos de Software (SRS) define las capacidades exactas de sistema, límites de hardware, interfaces externas y restricciones de seguridad para la Plataforma Templados AL13. 

**Exclusión de Alcance Inicial:** No se definirán esquemas de algoritmos de inteligencia artificial, procesamiento de pagos con tarjeta de crédito de terceros, ni integraciones directas a sistemas contables como SIIGO o SAP en la Versión 1.0.

### 1.1 Perspectiva del Producto (System Context)
El ecosistema Templados AL13 es un **Sistema Bi-Capa**:
1.  **Frontend Estático/Rehidratable (Capa 1):** Orquestador de Interfaz operado globalmente en cientos de Nodos Edge (Cloudflare Network). Carece de estado inherente y consume APIs.
2.  **Backend Soberano Administrador (Capa 2):** Motor centralizado (Servidor + DB Relacional) responsable de la ingesta de Leads B2B y la provisión CMS B2C. Almacena inventarios, modelos PBR (`.glb`), imágenes transcodificadas y la tabla maestra de clientes corporativos.

---

## 2. Requisitos Funcionales del Sistema (Functional Requirements)

Los Requisitos Funcionales aquí definidos están escritos para programadores orientados a objetos y bases de datos.

### 2.1 Subsistema Frontend (Astro Edge Framework)
*   **SRS-F-01 [Enrutamiento Predictivo sin Estado]:** El Frontend Astro **DEBE** emplear la API View Transitions para interpolar cuadros de imagen CSS (`view-transition-name`). En cada navegación, el sistema **DEBE** preservar la hidratación de los componentes de navegación (Header/Footer), bloqueando el re-pintado de las hojas de estilo críticas (Critical CSS).
*   **SRS-F-02 [Componente PBR Threlte]:** El visor `<model-viewer>` o canvas de **Threlte** **NO DEBE** iniciar el loop de renderizado WebGL (requestAnimationFrame) hasta que el hilo principal (Main Thread) informe que el árbol DOM primario ha disparado el evento `DOMContentLoaded` y el usuario haga `Scroll` sobre su contenedor (Intersección observador - `client:visible`).
*   **SRS-F-03 [Calculadora de Estática]:** El componente de cálculo B2B **DEBE** operar en Memoria de Cliente (Isla CSR en **Svelte**). **NO DEBE** invocar una verificación REST al servidor por cada pulsación de tecla (Keystroke). La validación geométrica (ej. Max Altura 3.0m) se evaluará localmente. El servidor se invoca exclusivamente tras el Submit de datos de contacto (Submit Lead Payload).

### 2.2 Subsistema Backend Soberano (CMS / CRM Core)
*   **SRS-F-04 [Validación y Sanitización Server-Side]:** El endpoint `/api/internal/ingest` que recepciona Leads **DEBE** decodificar el payload JSON entrante, escapando explícitamente strings para prevenir Cross-Site Scripting (XSS) y SQL Injections (Inyección Regex Obligatoria antes del ORM query).
*   **SRS-F-05 [Transcodificación Asincrónica Edge]:** Cuando un administrador hace POST en `/admin/upload/project` con un archivo `.jpg` y su título, el servicio Backend **DEBE**:
    1. Redimensionar el binario a 1080px de ancho preservando ratio.
    2. Convirtir dinámicamente el Buffer de Memoria a formato `.webp` (q=85) y `.avif` (q=75).
    3. Guardar el blob resultante en almacenamiento S3 propietario.
    4. Guardar los descriptores y el Alt-Tag Semántico deducido en la tabla de BD PostgreSQL/Supabase.
*   **SRS-F-06 [Revalidación Automática de Caché CDN]:** Inmediatamente al actualizar un registro en la tabla `products` de la DB, el sistema **DEBE** emitir un cURL interno (Webhook POST) hacia la Pipeline de Construcción (Cloudflare Pages), invalidando el HTML estático obsoleto e instanciando la nueva visualización mundial en $\le 60$ segundos (Edge On-Demand Revalidation).

---

## 3. Interfaces de Comunicación (External & Internal Interfaces)

### 3.1 Interfaces de Usuario (UI Constraints)
*   **Responsividad Absoluta (Container Queries):** La interfaz rompe con el paradigma arcaico `@media (min-width: 768px)`. Toda tarjeta 3D, galería o formulario **DEBE** mutar basándose en el ancho de su caja padre (`@container (min-width: 400px)`), garantizando encapsulación perfecta al momento que el administrador inyecte componentes a través de su CMS Drag-and-Drop.
*   **Estilización Acondicionada por S.O (OS Theming):** Obligación de usar variables `light-dark(var(--light), var(--dark))` en todo el scope `:root`. Cero Flash de código JS de Theming forzado.

### 3.2 Interfaces de Programación (API Contracts)
Todos los Endpoints internos se certificarán bajo esquema OpenAPI V3.
*   `POST /api/internal/lead`: Payload esperado `T_LeadRequest`. Retorna HTTP 201 Created (Éxito) o HTTP 400 Bad Request (Fallo validación). No debe poseer redirects (HTTP 301/302).
*   `GET /api/catalog/products`: Solo disponible para la IP Loopback (El proceso SSG Astro de Node). Si un front-end en la red salvaje intenta consumir este Endpoint REST en navegador sin token, **DEBE** arrojar HTTP 403 Forbidden para resguardar bases de datos privadas del Scraping Competitivo regional.

### 3.3 Interfaces de Hardware y Memoria
El sistema operará bajo el supuesto de dispositivos dispares (celular económico $150 USD vs ordenador estación de obra):
*   **Limitante de WebGL Context:** Un máximo estricto de **UN (1)** WebGL Rendering Context activo simultáneo en la página. Múltiples modelos 3D en catálogo deberán apagar sus texturas en RAM y delegarlas al DOM como imagen estática cuando no intercepten el viewport local, para evitar un Heap Crash de memoria Safari Mobile.

---

## 4. Requisitos No Funcionales (NFR) y Restricciones de Sistema

### 4.1 Rendimiento Teórico y Tiempos de Respuesta
*   **NFR-PERF-01 [Base LCP]:** Largest Contentful Paint $< 2.5s$ para nodos en la red Troncal en Suramérica sobre protocolo HTTPS.
*   **NFR-PERF-02 [Time to Interactive (TTI) Bloqueante]:** El JavaScript global **DEBE** permanecer por debajo de 50KB comprimidos en GZIP/Brotli. El TTI medido en una emulación "Slow 4G - Fast 3G" no deberá sobrepasar bloqueos de GPU mayores a 100ms.
*   **NFR-PERF-03 [Limitante PBR Tridimensional]:** Archivos de geometría arquitectónica binaria GLB (`.glb`) cargados por el dueño en el CMS son interceptados. Si Size > **15.00 Megabytes**, la subida Falla y arroja "Límite Excedido (Optimice a baja topología o Dracco primero)".

### 4.2 Resiliencia y Tolerancia a Fallos (Failovers)
*   **NFR-REL-01 [Despacho Asíncrono Mudo / Dead Letter Queue]:** Si el sistema de base de datos del Backend CMS (Supabase/PostgreSQL) cae por mantenimiento durante el envío de una Cotización de un Usuario en el Frontend, la función de límite Edge (`Astro Endpoint / Worker`) atrapará el FetchError y reescribirá el payload localmente (KV Storage / IndexedDB temporal), devolviendo "Recibido con Exito" a la Interfaz del Usuario. Al restablecer DB (Webhook Ping OK), volcará la cola. Esto **MITIGA** el costo reputacional del rebote tecnológico.
*   **NFR-REL-02 [WebGPU Fallback a Imagen Estática]:** En caso que `navigator.gpu` y `webgl` den un flag de `false` o Exception en celulares de gama de entrada en Colombia, el componente 3D **SE DESTRUYE** sin flictear y el sistema inyecta nativamente un `<img loading="eager" decoding="async">` del WebP fallback 2D. 

### 4.3 Seguridad Perimetral y Protección de Datos PII
La base de este producto protege agresivamente la captura B2B; consecuentemente:
*   **NFR-SEC-01 [Directiva CORS Restrictiva]:** `Access-Control-Allow-Origin` estricto configurado *únicamente* para las cabeceras procedentes de la URI validada de `templados-al13.com`. Denegación global (`*`) estrictamente prohibida en los repositorios de producción.
*   **NFR-SEC-02 [Cifrado CMS Auth]:** El Panel Admin del Propietario `/admin/*` **SE OBLIGA** a requerir JWT con el algoritmo asimétrico de rotación de llave (RS256/HS256) validando una cookie de vida corta y Secure origin (HSTS activado).

---

## 5. Excepciones Controladas ("Unhappy Paths")

The Architect-Scribe delinea los umbrales de fractura donde la Máquina debe protegerse:

### 5.1 Manejo de Estado Incompleto de Usuario B2B (Session Recovery)
**Problema:** Un Contratista pierde la pestaña de Chrome en pleno llenado y cierre transaccional complejo para un Cotizador de Despiece de un Edificio (5 pisos).
**Mandato Técnico:** Cada cambio en los inputs (`onChange`) de la calculadora invoca un debouncer de $400ms$ que purga las variables en texto plano codificado a `window.sessionStorage`. Al refrescar la pestaña, un Hook `useEffect` rehidrata inmediatamente los cuadros de entrada reanudando el estado exacto donde la conexión se interrumpió y deteniendo una fuga de frustración.

### 5.2 Pérdida Vectorial del Administrador CMS
**Problema:** Upload de proyecto de vidrio masivo cancelado en medio de Chunk Data Transfer por falla Wi-Fi del gerente propietario.
**Mandato Técnico:** Sistema requiere Interfaz UI que informe status Uploading (`Presigned URL bucket stream` o Chunking de 2MB). Si se quiebra a la mitad, el gestor destruye el Chunk Temp (Orphan Garbage Collection) para no inflar la facturación Cloud de AL13 y tira error explícito: "Archivo fallido por micro-corte. Reintente Drag & Drop".

---
*Documento Funcional (SRS) compendiado. El conjunto provee todos los vectores de carga, mitigación de GPU, arquitectura asíncrona CSR/SSR/SSG y protocolos HTTP/3 para que un sistema en el margen (Edge) funcione blindado.*


---

# Product Roadmap

**Sistema:** Plataforma Integral de Generación de Demanda - Templados AL13  
**Versión:** 1.0 (Estrategia B2B / B2C Visual)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
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
*   **[M3] The Visual Hero (Semana 6):**
    *   Landing pública SEO (LCP $< 1.8s$). Portafolios e Imágenes optimizadas 2D (Galería en **Tailwind CSS**). 
    *   Rendimiento Core Web Vitals $\to 100/100$ Auditado.

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


---

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


---

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
    - [ ] 1.1.1: Ejecutar `npm create astro@latest` (template `basics`, estricto, sin UI, TypeScript `strict`).
    - [ ] 1.1.2: Inicializar repositorio Git y añadir `.gitignore` estándar de Node/Astro/Entorno.
    - [ ] 1.1.3: Limpiar archivos basura generados por defecto (CSS global, SVG de muestra en `public/`).
    - [ ] 1.1.4: Ejecutar `npx astro add svelte` para integrar el motor reactivo de UI.
    - [ ] 1.1.5: Configurar `astro.config.mjs` para asegurar compatibilidad de Svelte 5 (Runes).
    - [ ] 1.1.6: Crear estructura base: `src/components/ui/`, `src/layouts/`, `src/lib/utils/`, `src/assets/`.
    - [ ] 1.1.7: Escribir test unitario básico (Vitest) para asegurar el montaje Astro-Svelte.
    - [ ] 1.1.8: Commit base de andamiaje ("chore: init astro svelte workspace strict mode").

- **Task 1.2: Configurar Sistema UI y Tailwind CSS (Glassmorphism)**
    - [ ] 1.2.1: Ejecutar `npx astro add tailwind` o configuración manual de PostCSS.
    - [ ] 1.2.2: Modificar `tailwind.config.mjs` incrustando paleta Hex AL13 (Oscuros, Dorados/Plateados industriales).
    - [ ] 1.2.3: Definir en Tailwind opacidades personalizadas para desenfoques `backdrop-blur`.
    - [ ] 1.2.4: Instalar y configurar web fonts (Inter para lectura, Outfit para Headers) vía `@fontsource`.
    - [ ] 1.2.5: Crear `src/styles/global.css` implementando utilitarios puros pre-compilados (`.glass-panel`, `.text-gradient`).
    - [ ] 1.2.6: Componentizar un `Badge.svelte` de prueba aplicando Glassmorphism para validar diseño.

- **Task 1.3: Setup de Repositorio de Datos (Supabase/PostgreSQL)**
    - [ ] 1.3.1: Instalar Supabase CLI v1 y ejecutar `supabase init` localmente.
    - [ ] 1.3.2: Generar y configurar archivos `.env.example` y obligar `.env` en Gitignore.
    - [ ] 1.3.3: Diseñar e implementar DDL (migration SQL) `001_initial_schema.sql` (Usuarios, Roles, Perfil AL13).
    - [ ] 1.3.4: Diseñar DDL (migration SQL) `002_leads_schema.sql` (Cotizaciones, Status Kanban, Valores $).
    - [ ] 1.3.5: Levantar motor local `supabase start` y validar conexión pgAdmin/Studio.
    - [ ] 1.3.6: Generar tipos TypeScript estáticos a partir de Supabase (`supabase gen types typescript --local > src/lib/database.types.ts`).

- **Task 1.4: Protocolos DevOps y Calidad (CI/CD)**
    - [ ] 1.4.1: Instalar ESLint y Prettier Plugins para Astro y Svelte.
    - [ ] 1.4.2: Configurar `.prettierrc` (Tabulaciones, comillas simples, line width).
    - [ ] 1.4.3: Instalar `husky` y `lint-staged` para ganchos `pre-commit` automáticos.
    - [ ] 1.4.4: Escribir GitHub Action `.github/workflows/ci.yml` para correr Linting + TypeCheck en cada PR.

---

## 🎨 Epic 2: The Visual Hero & Landing Page B2B/B2C (First Impression)
**Objetivo:** Crear un escaparate público cinemático que asegure tiempos de carga hiper-rápidos (SEO Edge).

- **Task 2.1: Layout Maestro Público**
    - [ ] 2.1.1: Crear componente envolvente `PublicLayout.astro` manejando `<head>`, meta tags y SEO Title/Description dinámicos.
    - [ ] 2.1.2: Implementar componente genérico Header/Nav (`Navbar.svelte`) con logo AL13 y scroll-spy (cambia color a transparente).
    - [ ] 2.1.3: Implementar componente genérico Footer estático (Enlaces, Términos Legales, Redes).

- **Task 2.2: Componente "Hero Section" Premium**
    - [ ] 2.2.1: Escribir tests unitarios Vitest definiendo existencia de textos principales y CTA de botón.
    - [ ] 2.2.2: Construir HTML semántico de `Hero.svelte` (Título h1 impactante y Párrafo "Boutique Industrial").
    - [ ] 2.2.3: Aplicar clases CSS `glass-panel` creadas en la Epic 1.2.
    - [ ] 2.2.4: Refinar el botón CTA OnHover: Transición de 300ms a `scale(1.02)` y brillo interior sutil (Shadow).
    - [ ] 2.2.5: Injectar un video de fondo comprimido (o imagen oscura abstracta) con overlay oscuro para contraste del texto.

- **Task 2.3: Value Proposition (Grid de Beneficios B2B / B2C)**
    - [ ] 2.3.1: Crear componente aislable `FeatureCard.svelte` (Ícono, Título, Descripción corta).
    - [ ] 2.3.2: Crear el grid iterador `FeaturesGrid.astro` que lea datos (arrays) mockeados.
    - [ ] 2.3.3: Integrar animaciones de entrada AOS (Animate on Scroll) a las tarjetas para suavidad visual.

- **Task 2.4: Optimización Image Delivery y Web Vitals**
    - [ ] 2.4.1: Convertir de lote todos los `png/jpg` a `webp/avif` usando componente nativo `<Image />` de Astro.
    - [ ] 2.4.2: Asegurar carga diferida `loading="lazy"` en todas las imágenes por debajo del "fold" (del inicio de pantalla).
    - [ ] 2.4.3: Revisar métricas Lighthouse CLI locales buscando puntuación perfecta en Performance/Accessibilidad.

---

## 🧮 Epic 3: La Calculadora B2B Determinista (Core Logic)
**Objetivo:** Permitir cotizaciones en vivo (State Machine Svelte) y captura asíncrona de Leades ($5M a 3 min).

- **Task 3.1: Backend - Endpoint de Ingestión de Cotización (Leads)**
    - [ ] 3.1.1: Crear archivo de API nativa en Astro `src/pages/api/leads.ts` (`POST`).
    - [ ] 3.1.2: Validar Payload JSON de entrada usando librería `Zod` (Medidas, Nombre, Empresa, Teléfono).
    - [ ] 3.1.3: Cifrar datos o prevenir Inyecciones SQL usando el ORM/Supabase SDK.
    - [ ] 3.1.4: Grabar el `Lead` en la BD Supabase y retornar Status 201 (Created) con Lead_ID.
    - [ ] 3.1.5: Escribir test de integración enviando POST falso al endpoint y verificando validación Zod.

- **Task 3.2: Frontend - UI Svelte State Machine (The Quoter Engine)**
    - [ ] 3.2.1: Definir `store` global temporal o Runes (`$state`) para almacenar las selecciones del usuario en el navegador (Paso a Paso).
    - [ ] 3.2.2: Construir UI Paso 1: Selección visual del tipo de producto (Puerta de Baño, Ventanal, etc).
    - [ ] 3.2.3: Construir UI Paso 2: Input de Medidas (Alto x Ancho) con validadores rígidos (ej. máximo 2200mm).
    - [ ] 3.2.4: Construir UI Paso 3: Tipos de Vidrio y Perfilería (10mm vs 8mm).
    - [ ] 3.2.5: Construir UI Paso 4: Formulario final de datos del Contractor / B2C para "Enviar y Ver Precio".

- **Task 3.3: Motor Matemático (Precios y Tolerancias)**
    - [ ] 3.3.1: Aislar la clase/lógica JS en `src/lib/calculusEngine.ts`.
    - [ ] 3.3.2: Escribir tests unitarios que verifiquen el precio del m2 contra la matriz base.
    - [ ] 3.3.3: Implementar condición: Si Alto > 2100mm = Advertencia Viento / Forzar vidrio 10mm.
    - [ ] 3.3.4: Conectar retorno del JS lógico a la vista final del resumen de la cotización en Svelte.

- **Task 3.4: Notificaciones Asíncronas Push (El CEO se entera)**
    - [ ] 3.4.1: Integrar Resend / SendGrid SDK dentro del endpoint `/api/leads.ts`.
    - [ ] 3.4.2: Diseñar plantilla HTML de correo ("Nuevo Lead B2B de $XX COP").
    - [ ] 3.4.3: Testear envío asíncrono hacia correo corporativo del CEO AL13 (sin bloquear el loading del UI del usuario final).

---

## 🛡️ Epic 4: El Panel de Control Admin (CMS Privado Soberano)
**Objetivo:** Interfaz secreta y altamente segura para gestión comercial, Kanban y cambios de catálogo.

- **Task 4.1: Bouncer de Seguridad y Auth Routing**
    - [ ] 4.1.1: Crear componente `/admin/login` con formulario de acceso único (Supabase Auth Email/Password).
    - [ ] 4.1.2: Implementar SSR Layout `AdminLayout.astro` que intercepte Cookies JWT de Supabase en cada request.
    - [ ] 4.1.3: Redireccionar forzosamente a `/admin/login` si la Cookie de Sesión está expirada, previniendo acceso estático o cliente.

- **Task 4.2: CRM Dashboard B2B (Módulo Kanban de Leads)**
    - [ ] 4.2.1: Crear ruta SSR `/admin/leads` que haga fetch de todos los Leads Ordenados (`ORDER BY created_at DESC`).
    - [ ] 4.2.2: Construir componente Svelte `KanbanBoard` compuesto por columnas "Nuevo", "Cotizado", "Cerrado Ganado", "Perdido".
    - [ ] 4.2.3: Implementar librería de Drag-and-Drop (DND) ligera vinculada a Runes en Svelte.
    - [ ] 4.2.4: Crear endpoint interno (PATCH) en Astro para mutar el status de un Lead en la Base de Datos al soltar la tarjeta de arrastre (Drop).

- **Task 4.3: CMS de Catálogo (Uploader a Buckets S3/Supabase Storage)**
    - [ ] 4.3.1: Crear tabla/esquema en Base Datos para "Catálogo de Productos".
    - [ ] 4.3.2: Construir UI en Svelte: Formulario "Añadir Proyecto Exitoso".
    - [ ] 4.3.3: Programar función de subida presigned de imágenes (Imágenes de baño/cocina) directo al bucket optimizado ignorando NodeJS proxy por velocidad.
    - [ ] 4.3.4: Revalidar Caché SSG de Astro programáticamente si una imagen pública es actualizada.

---

## 🔮 Epic 5: The Render Engine (Interacción WebGL B2C 3D)
**Objetivo:** Funcionalidad Eye-Candy que destruya a la competencia visual, donde el usuario final pueda rotar un vidrio templado 3D en su móvil.

- **Task 5.1: Setup Core 3D (Threlte Engine)**
    - [ ] 5.1.1: Instalar la dependencia oficial `three` y `@threlte/core` compatible con Svelte 5.
    - [ ] 5.1.2: Montar componente de Canvas maestro (`3DCanvas.svelte`) asegurando z-index debajo del texto UI pero arriba del fondo.

- **Task 5.2: Ingesta de Escenarios PBR (Modelos y Materiales)**
    - [ ] 5.2.1: Optimizar modelo crudo de aluminio `.glb` mediante `gltf-pipeline` o Draco compression en terminal (Reducción MBs).
    - [ ] 5.2.2: Cargar el modelo en Threlte asíncronamente (Suspense Loader UI).
    - [ ] 5.2.3: Programar shaders fotorrealistas (MeshPhysicalMaterial) asignando "Transmission = 1.0", "Roughness < 0.1", e IOR (Índice de refracción) equivalente a vidrio clásico para el target 3D.
    - [ ] 5.2.4: Asignar coloración "Anodizado/Mate" a las estructuras del perfil perimetral metálico en ThreeJS.

- **Task 5.3: Coreografías de Cámara (Orbiting)**
    - [ ] 5.3.1: Inyectar `<OrbitControls />` limitando el pitch polar a rangos normales (el usuario no puede ver la ducha "desde abajo" u horizontes absurdos).
    - [ ] 5.3.2: Auto-rotación sutil y lenta (`autoRotate={true} autoRotateSpeed={0.5}`) si el usuario no interactúa en 5 segundos.

- **Task 5.4: Degradación SRE (Site Reliability Engineering / Fallback)**
    - [ ] 5.4.1: Programar detector (script muy veloz) de capabilities WebGL en el navegador del cliente antes del montaje.
    - [ ] 5.4.2: Destruir el Canvas 3D e inyectar una "Imagen 2D de Alta Calidad (AVIF)" inmediatamente si el teléfono es obsoleto o carece de Aceleración de Hardware.

---

## 📈 Epic 6: Scalado Programático Orgánico y Telemetría (Growth)
**Objetivo:** Expansión hiper-escalable del sitio sin intervención humana a todos los barrios y ciudades, soportado por data real.

- **Task 6.1: Motor Generador Programático de Rutas SSR (Local SEO)**
    - [ ] 6.1.1: Crear tabla o array maestro de variables SEO (Ej. ["Bogotá Chico", "Medellín Poblado", "Puertas Plegables", "Mamparas Vidrio"]).
    - [ ] 6.1.2: Programar la plantilla dinámica Astro dinámica `/catalogo/[tipo]/[ubicacion].astro`.
    - [ ] 6.1.3: Proveer la función `getStaticPaths()` si SSG, o lectura de Base Datos SSR para inyectar miles de combinaciones en un build, dominando búsquedas nicho como "mamparas vidrio bogota chico" orgánicamente.
    - [ ] 6.1.4: Inyectar el `<Title>` y meta descripciones `h1` atómicamente relevantes para ese nicho preciso generado.

- **Task 6.2: Dashboard Telemetría Comercial Interno**
    - [ ] 6.2.1: En el módulo Admin de la Epic 4, crear endpoint estadístico global (Grafana primitivo embebido).
    - [ ] 6.2.2: Fetch agregado de "Conversion Rates" (Cuantos iniciaron la calculadora web VS cuántos dejaron sus datos).
    - [ ] 6.2.3: Gráfico de barras o ChartJS mostrando volumen monetario ($) Lead por tipo de producto semanalmente.
    - [ ] 6.2.4: Registro de logs de errores del Front-end enviados directamente a Supabase Errors Tab (Frontend Observability).


---

# Architecture Document

**Sistema:** Plataforma Integral de Generación de Demanda - Templados AL13  
**Versión:** 1.0 (Topología Edge-Sovereign)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Patrón Arquitectónico y Filosofía (Architectural Style)

El ecosistema repudia el antiguo patrón de Monolito Servidor (Node.js/PHP persistente) y las Single Page Applications (SPAs) puras. Se implementa un **Patrón Híbrido Bifurcado**:
*   **Edge-Native Islands Architecture (Frontend):** Las interfaces públicas se destilan en HTML pre-compilado en el límite de la red (Edge Nodes CDN) mediante **Astro**. La reactividad ocurre *solo* en micro-aplicaciones encapsuladas ("Islas") construidas con **Svelte**.
*   **BaaS Soberano Estricto (Backend-as-a-Service):** Un cluster de base de datos **Supabase (PostgreSQL)** autohosteado o gestionado, restringido por Row Level Security (RLS) para autenticación del Administrador (Dueño AL13) y la ingesta atómica de Leads B2B (Data Sovereignty).

![Topología Conceptual (Mermaid Fallback)]
```mermaid
graph TD
    Client[📱 Móvil / Browser 3G] -->|HTTP/3 QUIC| CDN[🌐 Cloudflare Edge Network]
    
    subgraph Frontend: Islands SSG/SSR
        CDN -->|Rutas Get| Astro[Astro Content SSG]
        Astro --> HTML[Pre-Rendered HTML]
        Astro --> Isle1[Svelte: Calculadora CSR]
        Astro --> Isle2[Threlte: WebGL idle]
    end

    subgraph The Sovereign Backend
        CDN -->|POST /api/leads| EdgeAPI[Cloudflare Worker / Astro Endpoint]
        EdgeAPI -.->|Fetch over TLS 1.3 / Supabase JS| CoreServer[🔐 Supabase Auth/DB]
        CoreServer -->|RLS| PosgreSQL[(DB Relacional - Leads & Prod)]
        CoreServer --> S3[(R2/S3 - Modelos .glb / .webp)]
    end
    
    Admin[👔 Gerente Admin] -->|Supabase Auth| CoreServer
    CoreServer -.->|Cache Invalidation Webhook| CDN
```

## 2. Descripción de Subsistemas Activos (System Components)

### 2.1 Subsistema Frontend (El Motor Periférico)
*   **Orquestador (Astro Router):** Enruta entre `<pages>` estáticas. Delega la intercepción de anclas (`<a>`) a la **View Transitions API** embebida logrando comportamiento similar a un App Shell. Integrado con **Tailwind CSS** para un sistema de diseño estático de costo cero en *runtime*.
*   **Motor CSR de Cálculo (B2B Quoter - Svelte):** Componente aislado de **Svelte**. **Responsabilidad:** Manejar estados transientes complejos con reactividad ultra-rápida (tolerancias, pesos del vidrio, anchos) en la memoria local y aplicar heurísticas de limitantes físicos (Zod Validators). Svelte previene el peso de Virtual DOMs (React).
*   **Motor CSR de Representación WebGL (B2C Viewer - Threlte):** Encapsulamiento del loop de eventos de *Three.js* mediante **Threlte**. **Responsabilidad:** Instanciación declarativa y reactiva del Canvas 3D. El motor (Threlte) maneja de forma segura la destrucción del contexto de Memoria WebGL para prevenir Memory Leaks móviles (Out-of-Memory).

### 2.2 Subsistema Backend (El Refugio Soberano)
*   **Endpoints de Gateway (Serverless API / Cloudflare Workers):** Funciones en aislamiento V8 en el Edge. Actúan como porteros o bouncers de red; su meta es recibir el Payload del usuario, verificar con *Zod* que no tenga malformaciones, y derivarlo a Supabase. **Responsabilidad:** Cortafuego estricto (Rate Limiting y Sanitización L7).
*   **Base de Datos Relacional (`Supabase/PostgreSQL`):** El "Single Source of Truth" (SSOT). Define el esquema transaccional cerrado bajo políticas estrictas de **Row Level Security (RLS)**. El Gateway o los clientes autorizados inyectan/leen data directamente si el RLS lo permite.
*   **Almacenamiento Perimetral de Objetos (Supabase Storage / R2):** Almacén compatible con S3 donde se depositan los polígonos 3D (hasta 15MB) y galerías dinámicas auto-optimizadas (.AVIF, .WEBP) sin ensuciar la base de datos central.

## 3. Flujos de Datos Transaccionales (Data Flows)

### 3.1 Flujo B2B (Inyección de Cotización Ciega)
1.  **Actor:** Contratista. Ingresa dimensiones (Ancho 3m, Altura 2m).
2.  **Isla Quoter (Svelte):** Aplica reglas de negocio en caché local (`If Ancho > 2m Then Requiere_Refuerzo`). Informa ok.
3.  **Captura PII:** Solicita Email y Teléfono. Dispara `POST /api/leads`.
4.  **Edge Worker / Astro Endpoint:** Sanitiza JSON con Zod. Enruta la petición a Supabase usando el rol de servicio `service_role` o un esquema anónimo con RLS permisivo de inserción ciego.
5.  **Supabase RLS:** Verifica la legitimidad de la inserción. Un Trigger/Edge Function en Supabase o el propio intermediario dispara el webhook para enviar un correo (ej. Resend / SMTP).
6.  **Respuesta Táctica:** Retorna `HTTP 201 Created` al Edge Worker. El Worker inyecta respuesta en la Isla Svelte (CSR).

### 3.2 Flujo Administrador (CMS On-Demand Build)
1.  **Actor:** Gerente. Sube proyecto `Casa Quinta` al CMS (Dashboard `/admin`).
2.  **Transcodificador:** El servidor procesa el JPG -> WEBP. Almacena en S3 Bucket.
3.  **Mutación BD:** Inserta metadata (`URL_Imagen`, `Fecha`, `Materiales`).
4.  **El Efecto Dominó (Revalidation Trigger):** El Backend dispara un webhook cURL al sistema de compilación de Astro en Cloudflare.
5.  **SSG Parcial:** La CDN compila *solamente* estáticamente la nueva ficha descriptiva (HTML caching) inyectándola a los nodos mundiales. Cero caídas de servicio.

## 4. Estrategia de Escalabilidad y Alta Disponibilidad (HA)

La asimetría del Frontend estático significa una invulnerabilidad total contra avalanchas (Slashdot effect).
*   **Fronend (Indestructible):** Al desplegar mediante Cloudflare Pages CDN edge nodes, la plataforma es inherentemente resistente a cientos de miles de solicitudes concurrentes estáticas. Si la BD trasera muere temporalmente, el catálogo público sigue visualizándose a nivel caché.
*   **Backend (Confinado):** Como los visitantes normales *no* hacen request a la BD (solo SSG read) y los únicos que postean son la minoria de cotizantes B2B (Leads), y el gerente, la carga de la Base de Datos Relacional es despreciablemente baja en TPS (Transacciones por Segundo). Permitiendo usar una instancia relacional t3.micro o Base "Supabase" ultra-barata con disponibilidad de 99.9% nativo.

## 5. Tolerancia a Fallas en Fronteras de Red (Failover Edge Cases)

Para mitigar los Micro-Cortes de señal en terrenos remotos de La Guajira:
*   **Corte en Hidratación JavaScript (The 3G Drop):** Si el navegador descarga el HTML pero la red 3G titubea perdiendo el chunk de Svelte de la calculadora, el usuario no verá un botón averiado. CSS inyectado estáticamente (`:not(:defined)`) mantendrá el botón opaco o en estado *disabled* y con texto "Cargando Motor..." hasta que el archivo cruce la red y la *Isla* asuma control local.
*   **Muerte de Motor WebGL (iOS OOM):** Si el contexto de memoria RAM se ahoga emulando los reflejos PBR del Aluminio y aborta, se levanta el evento `webglcontextlost`. Los wrappers nativos (como **Threlte**) manejan de forma segura la destrucción, y un fallback a `<img> fade-in` puede revelar un Render 2D en JPG del modelo con un `toast` notificando sobre la eficiencia térmica.

---
*Fin Documento de Arquitectura. El sistema prescinde de la fragilidad del renderizado dependiente del servidor (Node SPA) en el Front, anclando toda seguridad y peso cognitivo transaccional en el refugio inviolable de la Base de datos AL13 Core.*


---

**ESTADO DID:** `[DID_CERTIFIED]`

# Transformación Digital y Arquitectura Web 2026 para Templados AL13: Análisis Crítico y Estrategia de Modernización

## Introducción y Análisis Crítico del Ecosistema Digital Actual
El sector de la construcción, las remodelaciones arquitectónicas y la provisión de materiales especializados, como el aluminio estructural y el vidrio templado, ha experimentado una digitalización acelerada y sin precedentes. En el contexto tecnológico y comercial del año 2026, la presencia en línea de una empresa industrial ya no puede limitarse a operar como un catálogo digital estático o un folleto corporativo pasivo. Los usuarios modernos, particularmente los arquitectos, contratistas y consumidores finales que buscan remodelaciones de alto valor, exigen experiencias inmersivas, velocidad de carga instantánea y herramientas interactivas que faciliten la toma de decisiones asíncrona. Bajo este prisma, se ha llevado a cabo una auditoría técnica profunda del dominio https://templados-al13.principalwebsite.com/, perteneciente a Templados AL13, una empresa que opera en el nicho geográfico de Riohacha, La Guajira, para evaluar su madurez digital, identificar sus vulnerabilidades estructurales y establecer una hoja de ruta para una modernización integral.

El análisis de la infraestructura actual revela deficiencias críticas que comprometen severamente la capacidad de la empresa para competir en el entorno digital contemporáneo. Desde la perspectiva de la optimización para motores de búsqueda (SEO) y la semántica del código, el sitio web presenta un enfoque local básico encabezado por el título "Empresa de Construcción y Diseño en La Guajira", lo cual establece una intención geográfica clara. Sin embargo, la ejecución técnica de esta intención es deficiente. El documento extraído de la web actual evidencia una dependencia absoluta de marcadores de imagen vacíos, representados en el código como !(), lo que indica una omisión sistemática de los atributos de texto alternativo (alt). En 2026, la carencia de atributos alt no solo penaliza gravemente la indexación en motores de búsqueda, que dependen de esta metadata para interpretar el contenido visual, sino que también constituye una infracción directa a las normativas de accesibilidad universal que rigen el desarrollo web moderno.   

A pesar de estas carencias estructurales, la web actual posee un inventario de palabras clave transaccionales altamente específicas y valiosas para nichos técnicos. El contenido textual hace referencia directa a inventarios exactos, tales como "Ventana corrediza de ref 5020", "Ventana corrediza de ref 744", "Puerta ventana de ref 7038" y acabados especializados como la "Puerta en aluminio Maderato". La presencia de estas referencias numéricas y descriptivas representa un activo fundamental, ya que los compradores B2B (arquitectos y constructores) suelen realizar consultas de búsqueda utilizando estas nomenclaturas exactas. Lamentablemente, la ausencia de una arquitectura de la información jerarquizada y la falta de renderizado semántico impiden que estos términos de alto valor alcancen su potencial de posicionamiento orgánico en las páginas de resultados de los motores de búsqueda (SERPs).   

El impacto de estas deficiencias se magnifica exponencialmente al analizar el entorno competitivo hiperlocal en Riohacha, La Guajira. El mercado regional de ventanería y acristalamiento ha comenzado a madurar, y diversos competidores están ejecutando estrategias de captación digital que amenazan con desplazar a Templados AL13 si no se efectúa una intervención tecnológica inmediata. Empresas como Vidrio Y Aluminio La 12 Ltda. y Vidrios y Aluminios del Sur han consolidado su presencia en directorios locales y plataformas de navegación en tiempo real como Waze, garantizando que sus horarios de apertura estructurados, números de contacto y direcciones físicas geolocalizadas estén inmediatamente disponibles para los usuarios en tránsito.   

No obstante, el competidor que representa la mayor amenaza tecnológica es MasVidrios. Esta organización ha desplegado una estrategia digital sofisticada y moderna que capitaliza sus más de quince años de experiencia en el mercado nacional y regional. La arquitectura de conversión de MasVidrios no se basa simplemente en mostrar un número de teléfono; integra agresivamente tácticas de recopilación de datos de primera mano (first-party data) ofreciendo a los visitantes un incentivo financiero directo: un cupón de descuento del 30% a cambio de la suscripción mediante correo electrónico. Adicionalmente, emplean pruebas sociales localizadas, publicando testimonios de clientes geográficamente relevantes (por ejemplo, familias de Riohacha) que validan la rapidez y el profesionalismo en la instalación de divisiones de baño y estructuras complejas.   

Para que Templados AL13 no solo recupere el terreno perdido, sino que establezca una hegemonía digital incontestable en la región, la simple actualización cosmética de su sitio actual es insuficiente. Se requiere una reestructuración arquitectónica total, adoptando los paradigmas de diseño web dictados para el año 2026. Esta estrategia maestra debe abarcar la implementación de arquitecturas de renderizado de vanguardia, microinteracciones impulsadas por CSS moderno, fluidez de navegación ininterrumpida mediante la API de View Transitions, visualización tridimensional de productos, cumplimiento riguroso de normativas de accesibilidad y una infraestructura de captación de datos éticos que transforme la web en una máquina de generación de demanda automatizada y predecible.

## Fundamentos Arquitectónicos: Hacia el Rendimiento Extremo con Edge Computing y Arquitectura Islands
El rendimiento métrico (Core Web Vitals) es el requerimiento de negocio fundamental. Los motores de búsqueda y los usuarios ya no toleran latencias preceptibles. Las métricas de Core Web Vitals, particularmente la Interacción hasta el Siguiente Pintado (Interaction to Next Paint - INP) y el Mayor Despliegue de Contenido (Largest Contentful Paint - LCP), actúan como los auditores que determinan la visibilidad de una plataforma en el ecosistema digital. Para alcanzar la excelencia en estas métricas, el rediseño de Templados AL13 debe abandonar las metodologías de construcción web de la década anterior, caracterizadas por el renderizado del lado del cliente (Client-Side Rendering) típico de las Aplicaciones de Página Única (SPA) monolíticas.

El paradigma arquitectónico seleccionado para liderar esta transformación es la Arquitectura de Islas (Islands Architecture), materializada a través del framework de vanguardia Astro. Históricamente, los frameworks de JavaScript normalizaron la práctica de enviar cientos de kilobytes, o incluso megabytes, de código JavaScript al navegador del usuario, independientemente de si el contenido de la página era estático o interactivo. En las arquitecturas SPA tradicionales, el servidor envía un documento HTML esencialmente vacío; posteriormente, el navegador debe descargar un paquete masivo de JavaScript, ejecutarlo, y utilizar el framework para reconstruir la totalidad del Modelo de Objetos del Documento (DOM). Este proceso, conocido como hidratación completa, satura el hilo principal del navegador, bloqueando la capacidad del dispositivo para registrar interacciones táctiles o de desplazamiento, lo que resulta en una métrica INP desastrosa y tasas de rebote elevadas, especialmente en dispositivos móviles con capacidades de procesamiento limitadas o en zonas con redes inestables.   

La Arquitectura de Islas subvierte completamente este modelo ineficiente. El principio rector de Astro es la entrega de cero JavaScript por defecto. Durante el proceso de construcción o renderizado en el servidor, la inmensa mayoría de la interfaz de usuario de Templados AL13 —incluyendo la navegación estructural, los bloques de texto descriptivo de los perfiles de aluminio, los pies de página y las imágenes estáticas— se renderiza y se sirve como HTML estático puro y extremadamente rápido. El JavaScript se reserva de manera quirúrgica y exclusiva para aquellas zonas de la interfaz que requieren interactividad compleja; estas zonas aisladas son lo que denominamos "islas". Por ejemplo, en la página de detalles de la ventana corrediza referencia 5020, el menú desplegable de variantes de color, el formulario de solicitud de cotización interactivo o el carrusel de imágenes actuarán como islas independientes.   

Característica Arquitectónica	SPA Tradicional (Ej. React Monolítico)	Arquitectura Islands (Astro 2026)	Impacto Directo en Templados AL13
Volumen de JavaScript	Descarga inicial masiva para toda la aplicación.	Cero JS por defecto; hidratación quirúrgica.	Carga instantánea del catálogo en conexiones 3G/4G móviles en La Guajira.
Proceso de Hidratación	Global y bloqueante; congela el hilo principal.	Parcial, selectiva y asíncrona por componente.	Optimización radical del INP; la web responde al tacto inmediatamente.
SEO y Rastreabilidad	Depende de la capacidad del bot para ejecutar JS.	HTML semántico totalmente renderizado desde el inicio.	Indexación perfecta de referencias técnicas como "ref 7038" y "Maderato".
Consumo de Batería	Alto, debido al procesamiento continuo en el cliente.	Mínimo, delegando la estructura estática al navegador.	Mayor tiempo de permanencia del usuario explorando múltiples productos.
Esta hidratación parcial y selectiva garantiza beneficios sin precedentes para el SEO. Dado que el contenido principal es HTML estático desde el primer byte, los rastreadores de los motores de búsqueda pueden indexar instantáneamente todo el valor semántico de las descripciones de los productos sin tener que esperar o fallar en la ejecución de scripts asíncronos. Además, la arquitectura de islas permite una aproximación agnóstica respecto a los frameworks de componentes visuales; la elección estratégica para Templados AL13 es incrustar islas construidas en **Svelte** dentro del ecosistema de Astro, permitiendo la mejor reactividad sin el peso del Virtual DOM típico de React.   

La superioridad arquitectónica de la aplicación se consolidará aún más mediante su estrategia de despliegue y distribución de red. La entrega de los activos digitales estáticos y el cómputo de las rutas dinámicas no residirán en un servidor centralizado tradicional, sino que se distribuirán globalmente a través de una red de Edge Computing (computación en el borde), utilizando infraestructuras avanzadas soportadas de manera nativa por Astro. La computación en el borde acerca físicamente la lógica del servidor y el almacenamiento en caché al usuario final, reduciendo la latencia de red a su mínima expresión matemática.   

En el marco normativo y tecnológico de 2026, esta entrega perimetral operará sobre el protocolo HTTP/3. A diferencia de sus iteraciones anteriores basadas en el Protocolo de Control de Transmisión (TCP), HTTP/3 funciona sobre el protocolo QUIC, el cual utiliza el Protocolo de Datagramas de Usuario (UDP). Esta evolución fundamental elimina el problema sistémico del bloqueo de cabeza de línea (head-of-line blocking). En conexiones TCP convencionales, si un solo paquete de datos se pierde debido a interferencias en la red celular, toda la transferencia se detiene hasta que dicho paquete es retransmitido y recibido exitosamente. Con HTTP/3 y QUIC, las transferencias de los distintos recursos de la página (imágenes de los vidrios, hojas de estilo CSS, scripts de islas) son flujos independientes; la pérdida de un paquete en la imagen de una puerta no detendrá la descarga y ejecución del formulario de contacto. Para el mercado objetivo de Templados AL13, donde la estabilidad de las redes móviles puede fluctuar, esta tecnología garantiza una percepción de velocidad inquebrantable, blindando la experiencia del usuario contra las deficiencias de la infraestructura de telecomunicaciones local.   

Ingeniería de Interfaz: CSS Moderno, Container Queries y Micro-Responsividad
La materialización visual de la Arquitectura de Islas requerirá un sistema de diseño implacable, codificado utilizando las especificaciones de Hojas de Estilo en Cascada (CSS) más avanzadas disponibles en 2026. La era de los diseños responsivos rígidos, basados en puntos de interrupción arbitrarios dictados por las dimensiones globales de las pantallas de los dispositivos, ha quedado obsoleta. La nueva interfaz de usuario (UI) de Templados AL13 será un ecosistema fluido, inteligente y contextualmente consciente, impulsado por micro-responsividad.

El pilar de este nuevo paradigma visual son las Consultas de Contenedor (Container Queries), consideradas unánimemente como la revolución más profunda en el diseño web desde la introducción de CSS Grid. Tradicionalmente, las "media queries" evaluaban el tamaño del "viewport" (la ventana gráfica completa del navegador del usuario) para decidir cómo debía estructurarse un componente. Esto generaba una limitación arquitectónica severa: una tarjeta de presentación de un producto —por ejemplo, la "Puerta ventana de ref 7038"— diseñada para ocupar una cuadrícula de tres columnas en escritorio, colapsaría estéticamente si el desarrollador intentaba reutilizar ese mismo componente dentro de una barra lateral estrecha en la misma pantalla de escritorio, ya que la media query seguiría detectando un viewport ancho y no adaptaría el componente a su espacio real disponible.   

Las Container Queries subvierten esta limitación permitiendo que los componentes modifiquen sus estilos basándose exclusivamente en las dimensiones y el contexto de su elemento padre directo, proporcionando un control detallado a nivel de componente. La implementación en Templados AL13 explotará las tres variantes principales de esta tecnología:
Las "Container Size Queries" permitirán que la ficha técnica de una ventana corrediza sea un componente verdaderamente modular e independiente. Si el componente dispone de más de 600 píxeles de anchura en su contenedor, mostrará una imagen principal grande flanqueada por las especificaciones técnicas completas y los perfiles de aluminio disponibles. Si el mismo componente se instancia en una cuadrícula más densa donde solo dispone de 300 píxeles, la consulta de tamaño reorganizará el contenido internamente, apilando la imagen sobre el texto, truncando inteligentemente las descripciones largas para evitar problemas de elipsis, y transformando el botón de acción principal de un texto completo a un icono minimalista.
Las "Container Style Queries" llevarán la adaptación un paso más allá, permitiendo que un producto cambie su esquema de colores y jerarquía tipográfica si el contenedor padre define ciertas variables CSS, asegurando una integración estética perfecta sin necesidad de crear clases modificadoras múltiples.
Por su parte, las "Container Scroll-State Queries" permitirán que elementos de la interfaz reaccionen de forma nativa cuando el usuario se desplace por el contenido, como la cabecera de navegación que podrá contraerse suavemente y aplicar un desenfoque de fondo en el momento exacto en que se adhiere a la parte superior de la pantalla mediante posicionamiento pegajoso (sticky positioning).   

En estrecha sinergia con la modularidad de las Container Queries, el selector relacional :has() actuará como el motor lógico de la interfaz. Conocido coloquialmente como el tan esperado "selector padre" en CSS, :has() evalúa la presencia o el estado de los elementos descendientes para aplicar estilos hacia arriba en la jerarquía del DOM. En el contexto del sitio web de Templados AL13, esto permitirá crear interfaces de usuario altamente interactivas sin requerir la intervención de JavaScript. Al navegar por un catálogo visual de acabados de aluminio, si el usuario pasa el cursor (hover) sobre una tarjeta específica, el contenedor padre podrá detectar esta interacción mediante la sintaxis div.galeria:has(> div.tarjeta:hover) y, de manera nativa, atenuar sutilmente la opacidad de todas las demás tarjetas de la cuadrícula, focalizando la atención del usuario en el producto seleccionado de una manera fluida y elegante.   

Función CSS 2026	Aplicación Práctica en la UI de Templados AL13	Ventaja Estratégica / Eliminación de Deuda Técnica
Container Queries	Tarjetas de producto (ventanas, divisiones) que se adaptan a su propio tamaño disponible, no a la pantalla total.	Permite crear un componente único reutilizable en catálogos, barras laterales y carruseles, reduciendo el peso del código.
Selector :has()	Formularios de cotización que resaltan el grupo completo cuando un campo de entrada está enfocado o es inválido.	Elimina la necesidad de controladores de estado de JS complejo para interacciones visuales simples. Implementado mediante **Tailwind CSS**.
light-dark()	Cambio instantáneo de paleta de colores de la interfaz entre modo diurno y nocturno.	Respeta la preferencia del sistema operativo automáticamente, evitando destellos de contenido sin estilo (FOUC).
text-box-trim	Eliminación de márgenes en blanco inherentes a las fuentes web en descripciones técnicas.	Alineación geométrica perfecta de textos con imágenes y contenedores, elevando la percepción de calidad del diseño.
field-sizing: auto	Áreas de texto en formularios de contacto que crecen de manera fluida mientras el usuario escribe sus requerimientos.	Mejora drástica de la UX en cotizaciones detalladas sin necesidad de librerías de redimensionamiento de áreas de texto.
La gestión del color y el confort visual en 2026 exigen el respeto absoluto por las preferencias del sistema del usuario. La adaptación a entornos de visualización oscuros ya no requiere sistemas complejos de gestión de estado global y conmutadores manuales dependientes de JavaScript. La función CSS nativa light-dark() permitirá definir simultáneamente los valores de color para el tema claro y el tema oscuro en una sola línea de código. El navegador interceptará la preferencia de esquema de color del sistema operativo del visitante (prefers-color-scheme) y aplicará automáticamente la paleta correcta. Esto garantiza que un contratista que revisa especificaciones técnicas de aluminio Maderato en su dispositivo móvil a altas horas de la noche reciba una interfaz con fondo oscuro y texto de bajo contraste, reduciendo la fatiga visual y proyectando una imagen de marca tecnológicamente pulida.   

Para culminar la excelencia tipográfica y la alineación estructural, se incorporarán propiedades avanzadas como text-box-trim y field-sizing. La propiedad text-box-trim eliminará el espacio vertical invisible que históricamente acompaña a las tipografías web, permitiendo alinear los encabezados y párrafos descriptivos con una precisión de píxeles absoluta contra los bordes de los contenedores y las imágenes. Simultáneamente, field-sizing: auto transformará la experiencia de solicitud de cotización; en lugar de presentar cuadros de texto estáticos y restrictivos, los campos del formulario crecerán dinámicamente, acomodando de manera fluida las descripciones largas y detalladas que los clientes de arquitectura suelen redactar, demostrando empatía funcional hacia las necesidades del usuario final.   

Estrategia Integral de Animación: "Motion con Propósito" y View Transitions API
El diseño de la interacción visual a través de la animación ha madurado considerablemente. Atrás quedaron las animaciones superfluas o gratuitas que simplemente adornaban la página sin añadir valor cognitivo. Las tendencias de diseño de 2026 exigen un enfoque de "Motion con Propósito" (movimiento con propósito), donde cada transición de estado tiene el objetivo funcional de guiar el ojo del usuario, establecer relaciones espaciales entre los elementos y reducir la carga cognitiva al navegar por jerarquías de información complejas. Una interfaz que carece de transiciones fluidas se percibe como defectuosa, abrupta y comparable a un mero documento digital de la década de 2010. Los usuarios modernos, habituados a la suavidad cinemática de las aplicaciones nativas en sistemas iOS y Android, esperan el mismo grado de refinamiento en las aplicaciones web.   

La paridad con la experiencia nativa en el navegador se logrará mediante la adopción integral de la View Transitions API. El problema fundamental de la web tradicional (como la que opera actualmente Templados AL13) es que la navegación entre distintas páginas HTML conlleva un ciclo de recarga violento: la pantalla parpadea en blanco, el estado se pierde y el nuevo documento se repinta progresivamente de arriba hacia abajo. Incluso en las aplicaciones SPA construidas con React o Next.js, simular transiciones de página fluidas requería complejas bibliotecas de terceros que añadían decenas de kilobytes al tamaño del paquete y frecuentemente sufrían de tartamudeo (stuttering) en dispositivos móviles debido a limitaciones del hilo principal. Al usar Astro, estas transiciones son nativas.   

La View Transitions API del navegador erradica estas problemáticas de raíz. Esta interfaz de programación nativa permite cambiar el Modelo de Objetos del Documento (DOM) en un solo paso orquestado, delegando toda la carga computacional de la interpolación visual a la unidad de procesamiento gráfico (GPU). El mecanismo operativo es conceptualmente brillante: en el momento en que el usuario inicia la navegación, el navegador toma una instantánea gráfica del estado actual (la vista antigua), congela temporalmente la renderización mientras los datos de la nueva página se cargan y el DOM se actualiza, y luego toma una segunda instantánea (la vista nueva). Finalmente, el navegador anima de manera cruzada y acelerada por hardware ambas instantáneas, produciendo por defecto un fundido encadenado mantecoso y fluido.   

La sinergia de esta API con el framework Astro es el aspecto más revolucionario para este rediseño. Históricamente, se asumía que para obtener este tipo de transiciones fluidas, los desarrolladores estaban obligados a utilizar arquitecturas pesadas como React Router o Vue Router dentro de un entorno SPA monolítico. Astro desmantela este mito mediante su enrutador del lado del cliente (<ClientRouter />) y su soporte integrado para transiciones de vista cruzadas entre documentos (cross-document view transitions). Con la simple adición de dos líneas de código en la cabecera principal del documento, un sitio multipágina (MPA) ultraligero y centrado en el contenido adquiere instantáneamente la fluidez de navegación de una aplicación móvil de alta gama, manteniendo la preservación del estado entre páginas y elementos persistentes sin la sobrecarga inherente de bibliotecas masivas.   

La continuidad perceptiva se estructura al implementar Transiciones de Elementos Compartidos (Shared Element Transitions) empleando la propiedad CSS view-transition-name o la funcionalidad de nombrado automático match-element. El recorrido visual del cliente de Templados AL13 será el siguiente: al visualizar una cuadrícula de ventanas corredizas, el cliente hará clic en la miniatura de la "ref 5020". En lugar de desaparecer, el navegador identificará esa imagen específica como un elemento compartido. Mientras el resto de la interfaz transiciona hacia la nueva página de detalles del producto, la imagen del perfil de la ventana se expandirá de manera continua y sin interrupciones espaciales hasta anclarse en su nueva posición como cabecera. Esta continuidad elimina la desorientación y proporciona un "pulimento de aplicación premium" que eleva dramáticamente la métrica de confianza hacia la marca.   

Mientras que la View Transitions API gobernará el macro-movimiento (navegación entre rutas), la biblioteca Framer Motion —ahora conocida como Motion— se integrará de manera selectiva y quirúrgica para gobernar el micro-movimiento dentro de las "islas" interactivas aisladas. Framer Motion es el estándar de oro para animaciones declarativas en la web, ofreciendo físicas basadas en resortes (spring physics) sumamente realistas. Se utilizará exclusivamente en los puntos de contacto cruciales para la conversión; por ejemplo, el botón flotante de solicitud de asesoría reaccionará a la presión del puntero encogiéndose sutilmente con una tensión de resorte calculada, proporcionando una retroalimentación háptica visual que resulta instintivamente satisfactoria para el usuario. Al aislar Framer Motion dentro de los componentes hidratados mediante la directiva de Astro, nos aseguramos de no penalizar el peso inicial de la página, unificando lo mejor de las animaciones nativas del navegador con el control milimétrico de las bibliotecas de JavaScript avanzadas. Todo este sistema de movimiento incluirá invariablemente soporte nativo para la preferencia de reducción de movimiento (prefers-reduced-motion), garantizando que los usuarios con sensibilidades vestibulares reciban una experiencia sobria y libre de animaciones desencadenantes de mareos.   

Visualización Interactiva 3D: El Simulador de Materiales Basado en la Física
En industrias tangibles y arquitectónicas como la comercialización de vidrios templados y estructuras de aluminio perimetrales, la fricción fundamental en el embudo de ventas es la incapacidad del cliente para evaluar de forma certera la volumetría, la reflectividad y las texturas de los materiales a través de fotografías bidimensionales planas y estáticas. La evolución tecnológica permite derribar esta barrera cognitiva. La nueva plataforma digital para Templados AL13 implementará un módulo de visualización espacial en 3D en tiempo real, operando directamente en el navegador sin requerir descargas de plugins externos, transformando la experiencia de compra de un catálogo abstracto a un configurador tangible y experiencial.   

La decisión de ingeniería arquitectónica para esta capacidad tridimensional es crítica. En 2026, el ecosistema de gráficos web está en un proceso de transición monumental desde WebGL hacia WebGPU, una interfaz de programación de aplicaciones (API) moderna que ofrece un acceso de bajo nivel sin precedentes a los recursos directos de la tarjeta gráfica, permitiendo un procesamiento paralelo masivo. WebGPU es indiscutiblemente superior para la manipulación de modelos computacionales masivos, superando el límite donde JavaScript y WebGL comienzan a asfixiarse debido a su naturaleza de un solo hilo (single-threaded nature) y los límites de memoria del navegador.   

Sin embargo, el pragmatismo arquitectónico indica que el motor subyacente de este módulo debe basarse en Three.js —integrado de manera reactiva y segura a través de **Threlte** (el ecosistema 3D para Svelte)— en lugar de adoptar implementaciones puras en WebGPU o WebGL crudo que no manejan su propia recolección de basura. La justificación es clara: el modelado de ventanas corredizas raramente excederá la complejidad de 500 megabytes. **Threlte** ofrece el equilibrio perfecto: automatiza el montaje, gestión de memoria (evitando crashes en iOS por *Out-Of-Memory*) y destrucción del canvas, entregando una fluidez inquebrantable de 60 fotogramas por segundo con compatibilidad cruzada absoluta.   

La magia técnica de la visualización residirá en la parametrización de los materiales mediante técnicas de Representación Basada en la Física (Physically Based Rendering - PBR). Lograr que una superficie de vidrio se vea transparente y refracte la luz correctamente en un entorno web en tiempo real es notoriamente complejo. El equipo de modelado 3D exportará los activos en el formato estándar optimizado para la web, glTF 2.0 (habitualmente comprimido como .glb), configurando los parámetros matemáticos internos del sombreador de superficies para emular el comportamiento lumínico del mundo real.   

Para construir la ilusión óptica de un vidrio templado inmaculado y altamente pulido, los parámetros fundamentales se ajustarán siguiendo principios de conservación de energía comparables a los sombreadores estándar de la industria como Arnold. El proceso exigirá que el valor de opacidad geométrica o el modo de mezcla (Blend Mode) en el software de modelado de origen (como Blender o Maya) se establezca en opciones de canal alfa (Alpha Blend), desactivando opciones de ocultamiento de caras traseras (Backface Culling) para permitir que el motor renderice el grosor interno del cristal.   

El parámetro crítico es la Transmisión (Transmission). Este control deslizante define la cantidad de luz que penetra y se dispersa a través del volumen geométrico de la superficie. Para simular el cristal, el peso de transmisión se elevará drásticamente, típicamente a un valor de 0.95, indicando que el 95% de la luz entrante atravesará el objeto. Simultáneamente, y obedeciendo a la ley de conservación de energía donde la suma total no puede exceder la unidad, el peso del color base del material se reducirá a 0.05. Adicionalmente, para un vidrio claro y limpio, el valor de rugosidad especular (Specular Roughness) se fijará exactamente en 0. Al reducir la rugosidad matemática a cero, la superficie del modelo no dispersará los rayos de luz reflejados, resultando en reflejos especulares nítidos, pulidos y con un brillo especular de altísima fidelidad, reflejando perfectamente las imágenes de rango dinámico alto (HDRI) que se utilicen como iluminación ambiental (skydome light) del visor web.   

En contraste, los perfiles de "aluminio Maderato" requerirán mapas de texturas fotogramétricas de alta resolución para el color base (albedo) y un aumento preciso en los mapas de rugosidad y rugosidad metálica, logrando capturar el comportamiento lumínico opaco y estriado de un acabado que simula madera sobre una estructura metálica. Esta interacción profunda, donde el cliente puede manipular el modelo 3D en la palma de su mano, rotar la bisagra de la puerta y observar cómo el destello del sol virtual se desplaza de manera realista a través del bisel del vidrio templado, instaurará un nivel de confianza transaccional y autoridad de marca que obliterará los esfuerzos de marketing estático de la competencia local.   

Accesibilidad Universal y Conformidad Estricta con WCAG 2.2
La construcción de una plataforma web en 2026 no puede sustentarse únicamente en la brillantez estética y el rendimiento técnico; debe regirse ineludiblemente por principios éticos y legales de inclusión universal. La accesibilidad web ha trascendido las recomendaciones informales para convertirse en un mandato normativo global estricto. La infraestructura rediseñada para Templados AL13 adoptará como base innegociable los más recientes estándares publicados por el Consorcio de la World Wide Web (W3C): las Pautas de Accesibilidad al Contenido en la Web versión 2.2 (WCAG 2.2).   

Aunque el panorama legal internacional está en constante evolución —con normativas europeas y legislaciones estatales norteamericanas anticipando la adopción obligatoria de WCAG 2.2 para los próximos ciclos regulatorios—, el objetivo inmediato es la excelencia empática. La implementación buscará sistemáticamente la conformidad plena con el Nivel AA, ampliamente considerado el estándar de facto aceptado globalmente, con ambiciones focalizadas en integrar requisitos del estricto Nivel AAA donde la arquitectura lo permita. Las pautas WCAG 2.2, publicadas para rellenar las brechas operativas de las versiones anteriores, introducen nueve criterios de éxito vitales diseñados específicamente para optimizar la experiencia de individuos con discapacidades visuales severas (baja visión), limitaciones motoras complejas e impedimentos cognitivos o de aprendizaje.   

Categoría de Accesibilidad	Criterio Nuevo en WCAG 2.2	Solución Arquitectónica en Templados AL13	Beneficio Universal para Usuarios
Navegabilidad y Visibilidad	2.4.11 / 2.4.12: Foco No Obscurecido (Mínimo / Mejorado)	Integración estructural de variables CSS de desplazamiento dinámico para evitar solapamientos con cabeceras.	Los usuarios operando con teclado o dispositivos de conmutación siempre ven dónde están situados en la página.
Interacción Motora	2.5.8: Tamaño de Objetivo (Mínimo)	Expansión matemática de las áreas de clic de iconos de contacto y enlaces a 24x24 píxeles mínimos.	Eliminación de toques accidentales y frustración en usuarios mayores o en pantallas táctiles pequeñas bajo la luz solar.
Ergonomía Cognitiva	3.3.7: Entrada Redundante	Conservación del estado del carrito o cotización mediante almacenamiento de sesión local (SessionStorage).	Minimiza el abandono de formularios complejos al no requerir que el usuario vuelva a teclear información ya suministrada.
Operabilidad de Entrada	2.5.7: Movimientos de Arrastre	Proveer botones direccionales convencionales paralelos a las funciones de arrastre en los carruseles de productos 3D.	Permite que personas con espasticidad muscular operen visualizadores 3D que tradicionalmente requerían alta precisión de arrastre.
El primer reto arquitectónico reside en la visibilidad inquebrantable de la navegación no posicional. Las tendencias de diseño modernas adoran los elementos persistentes superpuestos: cabeceras pegajosas (sticky headers), barras de navegación flotantes, banners de aceptación de cookies anclados en la base de la pantalla y ventanas de chat en vivo. Sin embargo, cuando un usuario con discapacidad motriz navega secuencialmente a través de la página utilizando exclusivamente la tecla de tabulación del teclado (o un dispositivo de entrada alternativo como un interruptor de soplido), el navegador frecuentemente desplaza la pantalla (scroll) dejando el componente interactivo enfocado parcialmente oculto detrás de estos elementos flotantes. El usuario queda desorientado al no poder visualizar el anillo de enfoque que indica su posición actual en el ecosistema.   

El criterio 2.4.11 de las WCAG 2.2 estipula en su nivel de conformidad AA que los elementos con foco no pueden estar enteramente ocultos ("not entirely hidden"); no obstante, esta definición ambigua es éticamente insuficiente, ya que permitiría que se viera un solo píxel del elemento, cumpliendo técnicamente la norma pero fallando estrepitosamente en usabilidad práctica. La arquitectura de Templados AL13 saltará directamente al cumplimiento del criterio 2.4.12 de Nivel AAA: Foco No Obscurecido (Mejorado). Este mandato draconiano pero necesario exige que cuando un componente de la interfaz de usuario reciba el foco del teclado, ninguna fracción o parte del mismo puede quedar oculta por contenido creado por el autor. A nivel de ingeniería CSS, esto se resolverá inyectando de forma global propiedades inteligentes de almohadillado de desplazamiento (scroll-padding-top y scroll-padding-bottom), calculadas dinámicamente en función de la altura variable de la cabecera pegajosa en tiempo real. Esto garantiza un amortiguador geométrico invisible que forzará al navegador a detener el desplazamiento antes de que el indicador de foco colisione con el límite inferior del menú de navegación, salvaguardando la orientación espacial total del usuario.   

El segundo vector crítico de accesibilidad que abordará este rediseño es la precisión del puntero, amparado por el nuevo criterio 2.5.8: Tamaño de Objetivo (Mínimo). Diseñado primariamente para empoderar a individuos con limitaciones de destreza física, temblores o dificultades de movimiento motor fino, este criterio de nivel AA prohíbe severamente la colocación densa e inescrutable de controles interactivos minúsculos. En interfaces mal construidas, intentar hacer clic en el minúsculo icono de un enlace de WhatsApp situado inmediatamente junto al icono de correo electrónico resulta en activaciones erróneas y enojo del usuario.   

La directiva estipula que el área de destino absoluto para entradas de puntero debe ser de, al menos, 24 por 24 píxeles CSS. En la interfaz de Templados AL13, esta métrica matemática se aplicará universalmente a botones de selección de variantes, casillas de verificación en los formularios de presupuestos, iconos de redes sociales y, crucialmente, a los controles de manipulación del visor 3D de vidrios. Si la integridad estética dictamina que un elemento visual —como una delgada línea de cierre o un punto en un carrusel de perfiles de aluminio— debe dibujarse con dimensiones inferiores a esta matriz de 24x24 píxeles, la ingeniería de diseño inyectará espaciado transparente perimetral a través de relleno (padding) o posicionamiento absoluto de pseudo-elementos. Esta técnica crea una caja de delimitación invisible ampliada; si superponemos círculos teóricos de 24 píxeles de diámetro sobre el centroide de la caja delimitadora de cada objetivo adyacente, dichos círculos jamás se intersectarán, cumpliendo el algoritmo matemático exacto exigido por el W3C para evitar clics accidentales espaciales. Al diseñar para el caso de uso extremo (discapacidad motriz severa), se consolida una interfaz táctil a prueba de fallos, inmensamente más satisfactoria y robusta para cualquier contratista operando un teléfono móvil bajo la dureza del sol en una obra de construcción guajira.   

Inteligencia de Negocios: Captación de First-Party Data y Embudos Fractales
La excelencia tecnológica en el rendimiento de red y el cumplimiento normativo accesibilidad universal son factores multiplicadores fundamentales, pero el verdadero motor de retorno de inversión (ROI) radica en la estructuración de la maquinaria comercial subyacente de la plataforma. El análisis de las tendencias de marketing para 2026 enuncia un axioma innegociable: el modelo histórico basado en la compra de anuncios sostenido por la recolección intrusiva de datos de rastreo cruzado mediante cookies de terceros (third-party cookies) ha colapsado irreparablemente. Las regulaciones globales de privacidad y las políticas estrictas de los ecosistemas operativos han oscurecido los canales de adquisición tradicionales. La subsistencia y la escalabilidad sostenible del crecimiento comercial radican en un solo activo estratégico: el desarrollo de una infraestructura cerrada de recopilación ética de datos propios (First-Party Data).   

El First-Party Data constituye la información fidedigna e inequívoca que una entidad organizativa recopila de manera directa, transparente y consentida a partir de las interacciones explícitas de sus clientes prospectos dentro de su propio ecosistema digital. Esto trasciende las métricas abstractas y anónimas; abarca historiales de comportamiento navegacional profundos, encuestas completadas, interacción con calculadoras de presupuesto y formularios detallados de requerimientos arquitectónicos. Debido a que fluye desde una fuente autorizada y contextual, representa el estrato de información analítica de mayor fiabilidad, inmunizando a Templados AL13 contra la volatilidad algorítmica de plataformas publicitarias de terceros. Competidores locales como MasVidrios ya vislumbran esta tendencia intentando captar correos mediante tácticas transaccionales simples basadas en cupones de descuento porcentuales. Para superarlos decisivamente, Templados AL13 debe orquestar una arquitectura de intercambio de valor de índole muy superior.   

El pilar de esta captación de datos propios reside en un principio inquebrantable de reciprocidad utilitaria. Los arquitectos, las empresas constructoras y los clientes residenciales de alto valor no cederán sus coordenadas de contacto ante solicitudes genéricas; lo harán únicamente ante un beneficio cognitivo o instrumental directo. La nueva plataforma abandonará el formato de folleto estático e implementará herramientas de "habilitación del comprador" de alta ingeniería asincrónica orientadas al ecosistema AEC (Arquitectura, Ingeniería y Construcción). Esto implicará la creación de "islas" interactivas especializadas, tales como:   

Calculadoras Paramétricas de Proyectos: Módulos que permitirán al usuario introducir las cotas métricas (alto y ancho) de una fachada perimetral, seleccionar el grosor del vidrio templado y el tipo de perfilería estructural deseada. En lugar de mostrar el resultado monetario en pantalla, el sistema procesará la volumetría y enviará una estimación detallada en formato PDF de apariencia profesional directamente al correo electrónico del prospecto, capturando simultáneamente el contacto y los requerimientos geométricos exactos del proyecto en la base de datos de la empresa.   

Biblioteca Interactiva de Activos Técnicos: Descargas protegidas por barreras de acceso flexibles (gated content) que ofrecen dibujos en CAD (Diseño Asistido por Computadora), especificaciones de resistencia a la carga de viento y manuales de instalación técnica de ensamblajes complejos. Esta táctica filtra usuarios ocasionales y captura datos exclusivos de contratistas y especificadores técnicos profesionales.   

Configuradores Físicos en 3D: Integrando la tecnología de renderizado de materiales PBR discutida en capítulos anteriores, donde la exportación de una instantánea fotorrealista del modelo final ensamblado requiere una validación de identidad básica.   

Estos puntos de captura de First-Party Data no existirán en un vacío de almacenamiento inerte; el acaparamiento de datos carece de valor sin una estrategia sistemática de activación. La información recabada se canalizará mediante integraciones asincrónicas hacia sistemas avanzados de Gestión de Relaciones con los Clientes (CRM) unificados. La evidencia empírica de 2026 sugiere que plataformas consolidadas de automatización como Marketing 360 o ecosistemas modulares orientados a agencias como GoHighLevel han suplantado las pilas de herramientas fragmentadas y unidas precariamente con cinta adhesiva digital. Mediante la adopción de arquitecturas que fusionan la captura de la página, la gestión de contactos y la automatización del correo electrónico bajo una sola interfaz omnicanal, Templados AL13 podrá reaccionar algorítmicamente a las señales conductuales del usuario.   

Metodología de Captación de Datos	Herramienta Integrada en Astro	Tipo de Dato Recopilado	Activación Comercial Subsiguiente (CRM)
Descarga de Especificaciones	Formulario modular rápido con autenticación asíncrona.	Nombre de la firma de arquitectura, correo y preferencias de perfilería.	Campaña automatizada de goteo (drip) enviando casos de éxito con el material descargado.
Calculadora Paramétrica	Isla interactiva matemática con envío programado a PDF.	Presupuesto disponible del cliente, medidas exactas y urgencia del proyecto.	Alerta inmediata al equipo de ventas local en Riohacha para proyectos de alto valor.
Simulador de Configuraciones 3D	Botón de guardar proyecto asociado a una sesión persistente temporal.	Intereses volumétricos y combinaciones cromáticas de aluminio evaluadas.	
Anuncios de retargeting programático con imágenes idénticas a los modelos evaluados.

  
La estructuración de estas herramientas asume la defunción del embudo de marketing tradicional lineal (Conciencia, Interés, Deseo, Acción). El análisis de comportamiento contemporáneo revela que los clientes del sector de la construcción B2B navegan por un ecosistema estocástico y caótico. Los clientes inspeccionan catálogos detallados, abandonan el proceso durante semanas por razones presupuestarias o de inacción jerárquica, consumen testimonios esporádicamente, evalúan soluciones de la competencia (como Vidrio Y Aluminio La 12 Ltda.) y retoman sus investigaciones sin previo aviso.   

Los pensadores estratégicos de la industria denominan a este nuevo paradigma ecosistémico el "Modelo Fractal" impulsado por señales predictivas basadas en Inteligencia Artificial. Al poseer la propiedad absoluta sobre el First-Party Data capturado, Templados AL13 dejará de ser esclavo de intentos rudimentarios para introducir prospectos pasivos en conductos de ventas restrictivos. En su lugar, el equipo comercial estará empoderado para ejercer reconocimiento de patrones anómalos. La integración analítica trazará eventos de alta intencionalidad genuina que van mucho más allá de visitas de páginas superficiales o métricas de vanidad; rastreará interacciones granulares como iteraciones múltiples en la calculadora de vidrios, retornos recurrentes a la ficha de la referencia 744, o aperturas sucesivas de correos de seguimiento automático.   

Este análisis conductual profundo permitirá construir audiencias segmentadas por comportamiento de alto valor, orquestando estrategias de retargeting programático ultrapreciso sin dependencia de cookies de rastreo transversal en la web, ofreciendo estacionalmente servicios de mantenimiento a antiguos clientes comprobados o creando algoritmos de audiencias similares para encontrar perfiles gemelos a sus contratistas más rentables. La culminación de esta arquitectura fractal asegurará no solo independencia analítica y predictibilidad escalable, sino que establecerá un conducto comercial asíncrono con un control absoluto y perpetuo sobre el patrimonio de datos primarios del negocio.   

Plan Maestro de Ejecución Tecnológica y Fases del Proyecto
Para la transición quirúrgica de la infraestructura legada y deficiente del dominio principalwebsite.com de Templados AL13 hacia el ecosistema arquitectónico hiper-optimizado del 2026 detallado en las secciones precedentes, la migración e implementación debe ceñirse a un ciclo de vida de desarrollo ágil, iterativo y estrictamente segmentado. La estructura del plan maestro se descompone en cuatro fases secuenciales, diseñadas intrínsecamente para mitigar el riesgo de paradas operativas, sostener y preservar la incipiente indexación de palabras clave orgánicas existentes y asegurar una integración libre de fricciones de los nuevos componentes asincrónicos.

Fase 1: Auditoría Semántica Estructural y Cimentación Arquitectónica (Semanas 1-2)
La fase pre-desarrollo requiere una exfiltración exhaustiva del inventario de contenido heredado. Esto conlleva mapear cada cadena de producto identificada (como "Ventana corrediza ref 5020", "Puerta ventana ref 7038", "Maderato"). Se instituirá un plan de redireccionamientos de códigos de estado HTTP 301 permanentes desde las URL antiguas a la nueva arquitectura basada en rutas dinámicas para prevenir un colapso del capital SEO acumulado. Simultáneamente, el equipo de ingeniería cimentará la arquitectura fundacional configurando el framework Astro, definiendo las colecciones de contenido estáticas estandarizadas mediante validaciones estrictas y modelando los esqueletos base sin estado de la interfaz de usuario. Esta fase resolverá instantáneamente la flagrante deuda técnica de las etiquetas de imagen carentes de atributos descriptivos alt, inyectando meta-descripciones localizadas para Riohacha.   

Fase 2: Modelado Algorítmico de Sistemas de Diseño e Ingeniería UI / UX (Semanas 3-5)
Este ciclo se centrará en la construcción atómica y componencial de la interfaz visual bajo los preceptos contemporáneos de CSS fluido. Se codificarán los sistemas topológicos de Container Queries (size, style) , garantizando que ninguna tarjeta de catálogo sea restrictiva por el entorno de visualización. Se implementará la lógica algorítmica relacional basada en el selector :has() para gestionar los estados iterativos y visuales del usuario prescindiendo de dependencias asíncronas masivas. Finalmente, las propiedades de confort visual, como light-dark(), field-sizing: auto y la poda de text-box matemática (text-box-trim), se inyectarán a escala global. Las plantillas maestras y las interacciones inter-componentes serán sujetas a rigurosas auditorías tempranas contra los criterios exactos del nivel de conformidad AAA estipulados por el estándar WCAG 2.2, certificando áreas de destino de 24x24 px (Criterio 2.5.8) y salvaguardando la integridad paramétrica contra obscuridades de la posición de enfoque y navegación (Criterios 2.4.11 / 2.4.12).   

Fase 3: Cinematografía Web, Renderización Físicamente Basada (PBR) y Conexiones Lógicas (Semanas 6-8)
Con un cascarón visual irrompible y adaptable, el esfuerzo de ingeniería se volcará en dotar a la estructura de interacciones fluidas (motion) de la era espacial web y capacidad computacional asíncrona. Se habilitará globalmente el soporte para el enrutador del lado del cliente de Astro, configurando las API de View Transitions para habilitar transiciones de elementos visuales ininterrumpidos y persistentes a través de navegaciones entre documentos (MPA). Para los componentes interactivos locales (botones de acción, menús plegables), las físicas de resorte hápticas y animaciones fluidas se construirán aislando Framer Motion en componentes hidratados (islas JS). Paralelamente, los activos CAD arquitectónicos de vidrio templado y aluminio se procesarán e implementarán en tiempo real mediante motores geométricos fundamentados en Three.js con configuraciones algorítmicas de opacidad volumétrica, logrando un balance inamovible de 60 FPS en plataformas móviles con anchos de banda limitados. Adicionalmente, se conectarán a nivel lógico las interfaces de captación transaccional (calculadoras y descargables) a la infraestructura subyacente del CRM y la arquitectura de embudo fractal basado en First-Party Data.   

Fase 4: Análisis Heurístico, Validaciones Vitals y Despliegue Perimetral Global (Semanas 9-10)
El ecosistema construido será sometido a un riguroso entorno de pruebas de estrés (staging environment). Se realizarán validaciones analíticas profundas contra las métricas Web Vitals consolidadas, dictaminando un rendimiento obligatorio sub-óptimo para LCP (inferior a 2.5 segundos) y un tiempo de registro asincrónico para interacciones de teclado, toque de botón y fricción de scroll de visualización 3D (INP) aplastantemente veloz y consistentemente inferior a 200 milisegundos. Tras un control de calidad que verifique el manejo de dependencias residuales, el código fuente y todos los activos vectoriales se desplegarán de forma definitiva a lo largo de una CDN global orientada a procesos Edge, certificando la tunelización bajo las capacidades criptográficas del formato QUIC y garantizando la fluidez, resiliencia y resguardo ininterrumpido sobre redes inestables en La Guajira en tiempos sub-milisegundo a través del protocolo HTTP/3 nativo. Con esto, Templados AL13 renacerá no como una iteración estética, sino como el máximo referente de infraestructura digital operativa del sector industrial departamental y nacional.   


templados-al13.principalwebsite.com
Empresa de Construcción y Diseño en La Guajira
Se abre en una ventana nueva

accessible.org
WCAG Checklist 2.1 AA and 2.2 AA - Accessible.org
Se abre en una ventana nueva

paginasamarillas.com.co
Vidrio Y Aluminio La 12 Ltda. en Riohacha - Teléfono y Dirección - Páginas Amarillas
Se abre en una ventana nueva

waze.com
vidrios y aluminios del sur riohacha - Waze
Se abre en una ventana nueva

masvidrios.com
Mas Vidrios y Alumunios Riohacha - Inicio
Se abre en una ventana nueva

masvidrios.com
Vidrios Riohacha | Venta e Instalación de Vidrio Templado - MasVidrios
Se abre en una ventana nueva

dev.to
Why Islands Architecture Is the Future of High-Performance Frontend Apps
Se abre en una ventana nueva

docs.astro.build
Islands architecture - Astro Docs
Se abre en una ventana nueva

vercel.com
Astro on Vercel
Se abre en una ventana nueva

cloudcannon.com
The 'Islands' era | CloudCannon
Se abre en una ventana nueva

dev.to
Astro in 2026: Why It's Beating Next.js for Content Sites (And What Cloudflare's Acquisition Means) - DEV Community
Se abre en una ventana nueva

medium.com
Astro in 2026 : A Modern, Lightweight, and Relevant Framework for Today's Web | by Dedi Kusniadi - Medium
Se abre en una ventana nueva

blog.logrocket.com
Container queries in 2026: Powerful, but not a silver bullet - LogRocket Blog
Se abre en una ventana nueva

developer.chrome.com
Container queries case studies | Blog - Chrome for Developers
Se abre en una ventana nueva

youtube.com
8 NEW CSS Features in 2026 That Will Blow Your Mind! - YouTube
Se abre en una ventana nueva

blog.logrocket.com
CSS in 2026: The new features reshaping frontend development - LogRocket Blog
Se abre en una ventana nueva

dev.to
Mastering Smooth Page Transitions with the View Transitions API in 2026 - DEV Community
Se abre en una ventana nueva

nairobiestudio.com
Tendencias de diseño web para 2026: guía completa para diseñar experiencias modernas, rápidas y accesibles - Nairobi Estudio
Se abre en una ventana nueva

developer.chrome.com
What's new in view transitions (2025 update) | Blog - Chrome for Developers
Se abre en una ventana nueva

developer.chrome.com
Astro View Transitions | Blog - Chrome for Developers
Se abre en una ventana nueva

reddit.com
Astro's new View Transitions api is amazing. Is there any chance of Vercel creating something similar for Next.js? - Reddit
Se abre en una ventana nueva

docs.astro.build
View transitions - Astro Docs
Se abre en una ventana nueva

eastondev.com
Astro View Transitions: Give Your Website App-Like Smooth Experience with Just 2 Lines of Code - BetterLink Blog
Se abre en una ventana nueva

reddit.com
Astro's View Transitions are mind blowing! Glad I made my site with AstroJS! - Reddit
Se abre en una ventana nueva

docs.astro.build
View transitions - Astro Docs
Se abre en una ventana nueva

viget.com
View Transitions in Astro | Viget
Se abre en una ventana nueva

motion.dev
Motion — JavaScript & React animation library
Se abre en una ventana nueva

reddit.com
Three.js in 2026 and beyond — where do you think it's really heading? : r/threejs - Reddit
Se abre en una ventana nueva

draperdna.com
Website Marketing Trends for Building Products in 2026 - Draper DNA
Se abre en una ventana nueva

utsubo.com
Three.js vs Babylon.js vs PlayCanvas | Comparison Guide 2026 - Utsubo
Se abre en una ventana nueva

altersquare.medium.com
Three.js vs WebGPU for Construction 3D Viewers: Which One Scales Beyond 500MB Models? | by AlterSquare | Jan, 2026
Se abre en una ventana nueva

altersquare.io
Three.js vs WebGPU for Construction 3D Viewers: Which One Scales Beyond 500MB Models? - AlterSquare
Se abre en una ventana nueva

cloud.needle.tools
Needle vs. three.js vs. <model-viewer>
Se abre en una ventana nueva

8thwall.com
Glass Materials | 8th Wall Playground
Se abre en una ventana nueva

help.autodesk.com
Maya Help | Model glass or metal with the Standard Surface shader | Autodesk
Se abre en una ventana nueva

autodesk.com
How to render transparent material using Arnold in Maya - Autodesk
Se abre en una ventana nueva

accessibility.cornell.edu
WCAG 2 AA Checklist - Accessibility Information - Cornell University
Se abre en una ventana nueva

wcag.com
WCAG 2.2: New Success Criteria, More Inclusive Content
Se abre en una ventana nueva

w3.org
Web Content Accessibility Guidelines (WCAG) 2.2 - W3C
Se abre en una ventana nueva

levelaccess.com
WCAG 2.2 AA: Summary and Checklist for Website Owners - Level Access
Se abre en una ventana nueva

vispero.com
New Success Criteria in WCAG 2.2 - Vispero
Se abre en una ventana nueva

medium.com
WCAG 2.2 Level AA Success Criteria with Examples - Medium
Se abre en una ventana nueva

w3.org
Understanding Success Criterion 2.4.12: Focus Not Obscured (Enhanced) | WAI - W3C
Se abre en una ventana nueva

webaim.org
WCAG 2.2 Overview and Feedback - WebAIM
Se abre en una ventana nueva

w3.org
Understanding Success Criterion 2.5.8: Target Size (Minimum) | WAI - W3C
Se abre en una ventana nueva

int.com.ar
First-party data: la base del growth marketing sostenible en 2026 - HOOD INT
Se abre en una ventana nueva

artunlimitedusa.com
Top Marketing Trends Small Businesses Should Watch in 2026 - Art Unlimited
Se abre en una ventana nueva

dmcockpit.com
First-Party Data in 2026: How to Build an Owned Audience (Without Ads Dependency)
Se abre en una ventana nueva

salesforce.com
First-Party Data: cómo se puede triunfar en un mundo sin cookies | Salesforce
Se abre en una ventana nueva

usercentrics.com
First-Party Data en marketing - Usercentrics
Se abre en una ventana nueva

marketing4ecommerce.net
Nestlé apuesta por el zero-party data en 2026 - Marketing4eCommerce
Se abre en una ventana nueva

youtube.com
I Tried Every Funnel Builder - These 4 Are Best in 2026 - YouTube
Se abre en una ventana nueva

youtube.com
How Contractors Generate 500+ Leads | Construction Marketing 2026 - YouTube
Se abre en una ventana nueva

youtube.com
#1 Funnel Builder Businesses Use in 2026 - YouTube
Se abre en una ventana nueva

altavistasp.com
How Contractors Can Use First-Party Data to Improve Marketing in 2026
Se abre en una ventana nueva

themediaonline.co.za
'The marketing funnel is dead': Predictions for 2026 - The Media Online
Se abre en una ventana nueva

programminginsider.com
Best Funnel Builders for Agencies in 2026 - Programming Insider

---

# Software Design Document (SDD)

**Sistema:** Plataforma Integral de Generación de Demanda - Templados AL13  
**Versión:** 1.0 (Diseño de Componentes Core & Base de Datos Propia)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Diseño de Arquitectura Estructural (System Architecture)

El SDD gobierna la **Ingeniería de Componentes** (Cómo se escribe el código) no la Topología de Red (Ya definida en el Architecture Document).

### 1.1 Estructura del Monorepo (Directorio Táctico)
Se impone una distribución mono-repositorio orientada a dominios (Domain-Driven Design) basada en el Framework Astro + Svelte para las "Islas":

```text
/templados-core
  ├── /src
  │   ├── /components       # UI Pura estática (Botones, Headers, Cards)
  │   ├── /islands          # UI Interactiva CSR (CalculadoraSvelte.svelte, VisorWebGL.svelte)
  │   ├── /content          # Modelos de Markdown/MDX (Si aplica para CMS estático híbrido)
  │   ├── /pages            # Rutas SSG (/contacto, /catalogo, /admin)
  │   ├── /server           # Node.js / Bun Logic (Edge API Supabase)
  │   │   ├── /db           # Supabase Types (Generados)
  │   │   ├── /auth         # Utilidades Supabase Auth
  │   │   └── /services     # Casos de uso
  │   └── /styles           # Configuración de Tailwind CSS Tailwind (global.css)
  ├── /public               # Assets hiper-estáticos (.avif pre-procesados, logos)
  ├── astro.config.mjs      # SSG/SSR Adapter Configuration (Cloudflare Network)
  └── package.json
```

## 2. Decisiones de Diseño de Componentes (Component Design)

### 2.1 Patrón State Machine para la Calculadora (Isla B2B)
La calculadora paramétrica (Svelte) es demasiado compleja para depender de flujos condicionales simples (`if/else`).
*   **Decisión SDD:** Se **DEBE** utilizar un patrón de Máquina de Estados (Store de Svelte con transiciones explícitas).
*   **Estados Válidos:** `IDLE` -> `DIMENSIONING` -> `CALCULATING_TOLERANCE` -> `ERROR_PHYSICS` -> `REQUESTING_LEAD_DATA` -> `SUBMITTING` -> `SUCCESS` | `FAIL_NETWORK`.
*   **Transiciones Duras:** Es algorítmicamente imposible pasar al estado `SUBMITTING` si las variables internas de $Ancho \times Alto$ rebasan el estado de validez de `CALCULATING_TOLERANCE`. Este blindaje ocurre antes del `POST` al backend de Supabase.

### 2.2 Patrón de Ciclo de Vida WebGL (Isla B2C `<model-viewer>`)
El visor tridimensional requiere control de memoria para prevenir Out of Memory.
*   **Decisión SDD:** Uso obligatorio de **Threlte**.
*   **Justificación:** Threlte como ecosistema nativo de Svelte maneja el ciclo de vida (Mount/Destroy) de manera declarativa. Libera automáticamente los buffers de geometría y tensores de memoria de la GPU sin necesidad de inyectar manualmente `renderer.dispose()` en hooks de desmontaje, lo cual es vital para dispositivos móviles.

## 3. Modelo Realacional de Datos (Database Design)

Se instanciará una BD SQL central con **Supabase (PostgreSQL)**. A continuación, el esquema canónico DDL para las dos entidades nucleares de AL13.

### 3.1 Entidad: `Leads` (El Motor Comercial)
```sql
CREATE TABLE crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL UNIQUE,
    client_phone VARCHAR(50),
    segment VARCHAR(20) CHECK (segment IN ('B2B_ARCHITECT', 'B2C_HOME', 'B2B_BUILDER')),
    interest_product_id UUID REFERENCES inventory_products(id),
    raw_dimensions JSONB, -- Ejemplo: {"width": 3.0, "height": 2.1, "glass": "8mm_tempered"}
    status VARCHAR(20) DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'QUOTED', 'CLOSED_WON', 'LOST')),
    CONSTRAINT valid_email CHECK (client_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);
```
*Justificación:* El campo `raw_dimensions` se mantiene en `JSONB` previendo que la complejidad del ensamblaje B2B mutará con nuevos perfiles (ej. sumando marcos curvos en el futuro) sin necesidad de hacer complejas migraciones de esquemas (`ALTER TABLE`) constantemente.

### 3.2 Entidad: `Inventory_Products` (El CMS Soberano)
```sql
CREATE TABLE inventory_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL, -- Identificador SEO URL: /producto/puerta-batiente-5020
    name VARCHAR(150) NOT NULL,
    description TEXT,
    system_type VARCHAR(50) NOT NULL, -- Ej: 'Corrediza', 'Batiente', 'Fija'
    base_price_sqm DECIMAL(10, 2), -- Precio base Metro Cuadrado en COP
    has_3d_model BOOLEAN DEFAULT FALSE,
    model_s3_url VARCHAR(500), -- Apuntador a Bucket Cloudflare R2 / AWS S3
    is_published BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indice para velocidad Giga-Rápida de listado público en CMS
CREATE INDEX idx_products_published ON inventory_products(is_published) WHERE is_published = TRUE;
```

## 4. Diseño del API de Panel de Control (Admin Endpoints)

La seguridad para el Dueño de AL13 se blinda en las rutas de Backend API (`/server/api/*`).

### 4.1 Protección de Mutación (The CRUD Barrier)
Cualquier endpoint expuesto o mutación directa hacia **Supabase** **ESTÁ OBLIGADO** a cursar por políticas de **Row Level Security (RLS)**.
*   **Procedimiento SDD:** El cliente o el Edge Worker envía el `Authorization: Bearer <Supabase JWT>`. PostgreSQL, a través de Supabase GoTrue, evalúa si el rol asume permiso de `INSERT/UPDATE`. Si el esquema RLS falla, se rechaza directamente en la capa de base de datos sin consumir lógica del servidor.

## 5. Estrategia de Caché y Renderizado (Caching & SSR Strategy)

Dado que AL13 usa **Astro**, el diseño se segmenta:

1.  **Modo de Salida (Output Mode):** Servidor Híbrido (`output: 'hybrid'`).
2.  **Rutas Estáticas Absolutas (SSG pre-render):** `/`, `/nosotros`, `/catalogo` y `/catalogo/[slug]`. Estas rutas se compilan a HTML puro en el Servidor de Integración (CI) o mediante Webhooks (`On-Demand Builders`) al momento que cambia la DB. Latencia de servicio: $~20ms$ (Entregado directo desde la CDN).
3.  **Rutas Server-Side Rendering Obigatorias (SSR - Isomorphic API):** Las rutas `/api/internal/ingest` y `/admin/*` inyectan el flag `export const prerender = false;`. Su ejecución corre físicamente en un Isolate V8 sobre la marcha computando datos frescos ($~150ms$ overhead de RTT a Base de Datos de La Guajira).

## 6. Observabilidad Lógica (Logging Interno)
*   **Transacciones CRUD:** Toda Inserción o Modificación a `inventory_products` efectuada por el Dueño y cualquier error `500 Internal Server Error` debe generar un Log Estructurado en JSON (Ej. vía Winston o Pino Logger) y volcarse al `stdout`. El servidor de alojamiento (Vps/Edge) lo redirigirá al DataDog/Grafana interno.
*   **Silencio Táctico:** Prohíbese estrictamente hacer `console.log(lead_data)` con PII (Nombre/Email) del cliente B2B en producción. Violación de cumplimiento.

---
*Fin Documento de Diseño (SDD). Los ingenieros están prohibidos de inyectar dependencias de ReactJS en componentes estáticos o mutar la DB burlando las RLS.*


---

# Technical Specification (Tech Spec)

**Módulo Central:** Motor Paramétrico (Quoter) & Ingestor CMS de Medios.  
**Versión:** 1.0 (Especificación de Vuelo)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Objetivo Técnico (Technical Objective)
Dotar al Core B2B de Templados AL13 de un motor condicional determinista. El Frontend calculará la validez estructural de la perfilaría, mientras que el Backend orquestará exclusivamente las inyecciones de base de datos seguras y transcodificación de imágenes asíncronas para el CMS, salvaguardando los recursos del CPU en Vps / Cloudflare Workers.

## 2. API de Ingestión Front-To-Back (Quoter Payload)

### 2.1 Esquema Transaccional B2B (TypeScript)
El esquema TypeScript inferido por Zod/Joi para el endpoint de recepción B2B `/api/internal/ingest`:

```typescript
// Schema de Ingestión Estricto V1.0 - Zod Compliant
export const LeadIngestSchema = z.object({
  clientData: z.object({
    role: z.enum(["ARCHITECT", "BUILDER", "HOMEOWNER"]),
    fullName: z.string().min(3).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^\+?([0-9]{10,14})$/, "Invalid LatAm format")
  }),
  parametricConfig: z.object({
    width_cm: z.number().int().positive().max(600), // Max 6 metros
    height_cm: z.number().int().positive().max(350), // Max 3.5 metros (Piso-Techo)
    glassTypeId: z.string().uuid(), // Referencia DB: 8mm Incoloro, Vidrio Laminado
    profileSystemId: z.enum(["5020_SLIDER", "7038_SLIDER", "8025_SWING"])
  }),
  timestamp: z.string().datetime()
});
```
*Mandamiento Técnico:* Si un B2B emite `width_cm: 700`, la API de Edge (o middleware) devuelve un HTTP 422 Unprocessable Entity en menos de 20ms, negando acceso libre a la Base de datos Supabase para proteger ciclos de red.

## 3. Arquitectura Detallada de CMS Upload (S3 R2 Flow)

El gerente de AL13 manipula fotos y modelos (hasta 15MB). Subir archivos pesados por un túnel `POST` satura la memoria Node. Se impone el patrón **Direct-To-Storage con Pre-Signed URLs**.

### 3.1 Algoritmo de Flujo de Carga (Media Transcode Protocol)
1.  **Init (Cliente):** El Panel Admín (/admin/upload) solicita *permiso de subida* al Backend propio `GET /api/secure/upload-ticket`.
2.  **Firma (Backend):** El servidor usa el R2/S3 SDK y su clave secreta. Genera una URL Prefirmada temporal (Ej: expira en 5 minutos) restringiendo el `Content-Type` a `image/jpeg` o `model/gltf-binary`.
3.  **Transferencia Directa:** El navegador de gerencia hace el POST `multipart/form-data` *directamente* al servidor de Almacenamiento (Supabase Storage o Cloudflare R2), salteando nuestro Worker principal si el bucket lo permite.
4.  **Mutación de DB (Backend Hook):** S3 emite un evento de Éxito al servidor. El servidor asocia `r2://al13-bucket/foto.jpg` al ID de proyecto transaccional, encola un Job `ffmpeg/sharp` asíncrono para generar miniaturas .AVIF, y revalida la caché del sitio (SSG Rebuild).

## 4. Algoritmos Core de Validación Cotizadora (Client-Side Logic)

### 4.1 Lógica de Presión de Viento (Heurística Estática)
El sistema *Svelte Quoter* aplica una matriz condicional antes de permitir el Submit para el sistema:

```javascript
/* Pseudocodigo Vectorial - Validación Eslbelta */
const MAX_AREA_M2 = 4.5; // Supuesto Estático 8mm Templado

function validateTolerance(width_cm, height_cm, glass_thickness) {
  const area = (width_cm / 100) * (height_cm / 100);
  const ratio = width_cm / height_cm;
  
  if (area > MAX_AREA_M2 && glass_thickness === 8) {
     return { valid: false, reason: "EXCEEDS_MAX_AREA_FOR_8MM" };
  }
  if (ratio < 0.25 || ratio > 4.0) {
     return { valid: false, reason: "STRUCTURAL_RATIO_VIOLATION" };
  }
  return { valid: true };
}
```
*   **Decisión Tech Spec:** Validaciones de leyes físicas básicas operan siempre en *cliente* para brindar respuesta de $0 ms$ al Arquitecto, rebotando la cotización instantáneamente en la interfaz.

## 5. Rendimiento Esperado (Performance QoS)
*   **TTFB API (Read):** Las lecturas del catálogo `GET` en el Panel CMS responderán en $\le 50ms$ p95 (Apoyados sobre Supabase en el edge o CDN local).
*   **Transcodificación Imagen:** Un archivo Raw JPG 24MP (12MB) de la obra deberá demorar $\le 4$ segundos netos de CPU Time en el entorno de Backend hasta obtener derivadas responsivas generadas (400w, 800w, 1200w WebP).

---
*Fin Documentación Técnica (Tech Spec). Las especificaciones dictan protocolos determinísticos, pre-firmas de túneles P2P S3-Cliente y esquemas Zod infalibles en Edge.*


---

# UI/UX & Motion System Document

**Sistema:** Sistema de Diseño Premium y Motor de Animación (Templados AL13)  
**Versión:** 1.0 (B2B Tactile / B2C Cinematic)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  

---
> 🛡️ **[REPORTE DID - AUDITORÍA DE INTEGRIDAD]**
> *Métrica de Densidad:* Supresión drástica de interfaces "genéricas tipo Bootstrap/Material" o "Generadas por LLM Vanilla". Se decreta un enfoque "Boutique/Luxury" usando matemáticas de resortes (Spring Physics) en lugar de transiciones lineales muertas.
> *Restricción de Flujo:* Se instituye **Motion** (el motor moderno de Framer Motion / Motion One) atado a la View Transitions API de Astro. Quedan prohibidas las animaciones que colapsen el Main Thread del móvil.
---

![Templados AL13 - Premium UI Concept](C:\Users\xavie\.gemini\antigravity\brain\583fd908-8b36-42d9-b74e-9c843de01868\templados_al13_premium_quoter_ui_1771722679686.png)

## 1. Filosofía de Diseño: El "Anti-Plantilla" (The Boutique Paradigm)

El software comercial web de la época 2024-2025 se homogeneizó en tarjetas blancas planas y sombras difusas predecibles (Tailwind defaults). Templados AL13 exige un **Branding Cinematográfico y Táctil** que proyecte ingeniería de alta gama (Aluminio/Vidrio).

### 1.1 Estética Visual Básica (Visual Core)
*   **Tematización Dinámica (`light-dark()`):** No hay botones de "Cambiar tema" que recargan la UI. Se explota el CSS O.S native `light-dark()`. 
    *   *Modo Claro:* No es `#FFFFFF` puro. Es blanco titanio, simulando rebote de luz en vidrio esmerilado (`#F8F9FA`).
    *   *Modo Oscuro:* No es `#000000`. Es anodizado negro profundo con reflejos metálicos (`#0A0A0C`), evitando la fatiga ocular y ahorrando batería OLED del Contratista.
*   **Glassmorphism Estructural:** Uso restrictivo del `backdrop-filter: blur(16px)` para las superposiciones del HUD B2B (Calculadora Quoter) sobre el modelo 3D subyacente interactuando con las luces del Render WebGL sin ocultarlo.
*   **Tipografía de Precisión (Variable Fonts):** Descarte de fuentes genéricas (Inter/Roboto default). Adopción de fuentes Geométricas Variables (Ej. *Outfit* o *Syne* para Headers B2C, y familia *JetBrains Mono* estricta paramétrica para números y cotas del Quoter B2B). 

## 2. El Ecosistema Kinético: Motion & Física Web

Las interfaces no deben "aparecer" ni fundirse en seco (Fade in). Las interfaces AL13 **Tienen Masa y Fricción** simulando la manipulación de cristales estructurales pesados. Estrechamente apoyado en la librería `Motion` (Aceleración de Hardware).

### 2.1 Micro-Interacciones de Resorte (Spring Physics)
Se abandona la curva de Bézier fácil (`ease-in-out`). Todas las interacciones de botones transaccionales B2B y tarjetas de Catálogo en `React/Astro` inyectarán cálculos de masa y rigidez:

```javascript
/* Matriz Global de Animación Motion - B2B/B2C */
export const AL13_SPRING_CONFIG = {
  tactile_button: { type: "spring", stiffness: 400, damping: 10, mass: 0.8 },
  glass_card_hover: { type: "spring", stiffness: 300, damping: 20 },
  page_transition: { type: "spring", bounce: 0, duration: 0.4 }
};
```
*   **Hover States (Efecto Táctil Densa):** Al posar el dedo o cursor en un *Lead Submit*, el botón no solo cambia de color; su escala sufre un *shrink* de `scale: 0.97` impulsado por el resorte, informando solidez estructural antes del Tap, y al disparar, propaga una onda (Ripple) contenida que viaja hasta `opacity: 0`.

### 2.2 Layout Animations & Shared Elements
*   **Transiciones sin costura (View Transitions API + Astro):** Cuando el Cliente (B2C) hace click en una miniatura del "Cristal Oro" en `/catalogo`, la tarjeta estática **no navega a otra página de golpe**. Se eleva en Z-Space y *crece* para convertirse en la Imagen Hero (Fotografía principal) de la página `/catalogo/cristal-oro`, manteniendo continuidad espacial absoluta sin cargar el cerebro del usuario con un borrado de pantalla blanco.

## 3. Jerarquía y Carga Cognitiva B2B (The Quoter UI)

Los contratistas no tienen tiempo. La arquitectura UI del Quoter paramétrico se diseña bajo la Ley de Hick (Minimizar tiempo de decisión).

### 3.1 Diseño HUD Paramétrico (Heads-Up Display)
*   **Zero-Scroll Layout:** Todo el Quoter B2B se engloba dentro del Viewport del móvil (`100dvh`). El formulario nunca obliga al contratista a hacer scroll infinito. 
*   **Step-by-Step Kinético:** En vez de un formulario masivo paralizante de 10 campos, la interfaz muta fluídamente con `<motion.div layout>` exponiendo el siguiente input (Ej: de Ancho $\to$ Alto $\to$ Material) *sólo si* el anterior Zod Schema pasó la condición determinística de "Viento/Tolerancia" ejecutada en JavaScript local.
*   **Retroalimentación Háptica (Vibration API):** Si el contratista teclea `width: 800cm` (Dimensión ilegal imposible para el vidrio seleccionado), el dispositivo ejecuta `navigator.vibrate([50, 50, 50])` si es un móvil, acompañando el input box de un `<motion.div animate={{ x: [-10, 10, -10, 10, 0] }} transition={AL13_SPRING_CONFIG.error}>` simulando una sacudida física "Denegado".
---

![Templados AL13 - Landing Page Hero Concept](C:\Users\xavie\.gemini\antigravity\brain\583fd908-8b36-42d9-b74e-9c843de01868\templados_al13_premium_landing_hero_1771727491217.png)

![Templados AL13 - Catalog Grid Concept](C:\Users\xavie\.gemini\antigravity\brain\583fd908-8b36-42d9-b74e-9c843de01868\templados_al13_premium_catalogo_1771727695161.png)

## 4. Renderizado Inmersivo B2C (Model-Viewer Overlays)

El catálogo 3D B2C exige a la GPU, por tanto la UI debe ser fantasmal (Ghost UI) para no competir con los reflejos PBR.
*   **Cinematography Loading:** Mientras el tensor de texturas pesadas `.glb` descarga ($5\text{MB}$), la interfaz pinta un Skeleton Loader difuminado, reemplazándose con un Fade cruzado inyectado por `Motion` que arrastra la cámara virtual de Three.js en un "Dolly Shot" hacia la Puerta o el Proyecto desde un ángulo cenital en picada al ángulo frontal (Simulación Dron), generando asombro e impresión ultra-tecnológica.

---
*Fin Documentación de Sistema UI/UX y Animación Frontal. Los ingenieros tienen terminantemente prohibido usar pseudo-componentes plásticos (Bootstrap/MUI) estériles. Todo polígono y píxel debe estar sometido a masa y vector vía librería Motion.*


---

# Data Model Document

**Subsistema:** Base de Datos Relacional (PostgreSQL / Supabase SOV)  
**Versión:** 1.0 (Esquema B2B/B2C Soberano)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Diseño Entidad-Relación Lógico (ERD)

La arquitectura AL13 requiere un almacén relacional transaccional (ACID compliant). El esquema huye de bases NoSQL/Documentales (ej. MongoDB/Firebase Firestore) dado que las cotizaciones (`Leads`) están fuertemente vinculadas a las listas de precios e inventario físico (`Products`), exigiendo Integridad Referencial dura (`FOREIGN KEY`) para evitar cotizar perfiles descontinuados.

### 1.1 Entidades Núcleo (Core Entities)
1.  **`profiles_admin` (Gerencia AL13):** Usuarios autorizados del CMS In-house. Separada de los leads para jamás mezclar vectores de ataque Auth.
2.  **`inventory_products` (El Catálogo CMS):** El escaparate material (Vidrios, Aluminio).
3.  **`crm_leads` (El Motor B2B):** Prospects entrantes encapsulando su intención de compra y datos físicos (cotas).
4.  **`storage_assets` (El Repositorio S3):** Tabla conectora de binarios transcodificados.

---

## 2. Diccionario de Datos Físico (Data Dictionary DDL)

### 2.1 Tabla `inventory_products` (SOT Catálogo CMS)
Esta tabla es de lectura intensiva (`Read-Heavy`). Alimenta el Edge Computing.

| Columna | Tipo de Dato | Llave | Constraint/Regla (Check) | Descripción / Función |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `UUID` | **PK** | `uuid_generate_v4()` | Clave primaria opaca. |
| `slug` | `VARCHAR(100)` | UQ | `NOT NULL` | URL SEO amigable (ej: `puerta-8025`). |
| `name` | `VARCHAR(150)` | - | `NOT NULL, length > 3` | Título H1 renderizado. |
| `system_type` | `ENUM` | - | `[BATIENTE, CORREDIZA, FIJA, CORTINA]` | Filtro lógico categorización. |
| `base_price_sqm`| `DECIMAL(10,2)`| - | `> 1000.00` | Coste base x metro cuadrado (Módulo Cotizador). |
| `has_3d_model` | `BOOLEAN` | - | `DEFAULT FALSE` | Flag Booleano para inyectar Isla `<model-viewer>` en frontend Astro. |
| `is_published` | `BOOLEAN` | IDX | `DEFAULT FALSE` | *Kill-Switch*. Si False, Astro borra la URL en SSG. |
| `updated_at` | `TIMESTAMPTZ` | - | `NOW()` | Audit-trail |

### 2.2 Tabla `crm_leads` (El First-Party Data Invaluable)
Esta tabla es de mutación intensiva y alta seguridad (Índices PII enmascarados).

| Columna | Tipo de Dato | Llave | Constraint/Regla (Check) | Descripción / Función |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `UUID` | **PK** | `uuid_generate_v4()` | Ref opaca. |
| `client_email` | `VARCHAR(255)`| IDX | `UNIQUE`, Email Genérico Regex | Llave de deduplicado. |
| `segment` | `ENUM` | - | `[B2B_ARCHITECT, B2C_HOME, BUILDER]` | Tag de ruteo para el Vendedor Humano AL13. |
| `product_id` | `UUID` | **FK** | `REFERENCES inventory_products(id)` | Si AL13 borra el producto, se hace ON DELETE SET NULL. No borrar al cliente. |
| `raw_dimensions`| `JSONB` | - | Esquema Interno Válido | Json nativo. `{ w: 300, h: 210, g: "8mmT" }`. Permite analítica compleja B2B sin re-migrar columnas. |
| `status` | `ENUM` | - | `[NEW, QUOTED, WON, LOST]` | Estado en Embudo (Kanban Admin). |

### 2.3 Tabla Conectora `storage_assets` (Gestor de S3 - Cloudflare R2)
Separa la URL física pesada del producto de texto, para auditoría de Orfandad (Garbage Collection de fotos vírgenes).

| Columna | Tipo de Dato | Llave | Constraint/Regla (Check) | Descripción / Función |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `UUID` | **PK** | `uuid_generate_v4()` | Identificador |
| `product_id` | `UUID` | **FK** | `REFERENCES inventory_products(id) ON DELETE CASCADE`| Ligar activo 3D/Foto al Modelo base. |
| `bucket_key` | `TEXT` | UQ | `NOT NULL` | (ej. `obras/2026/fachada-oro.avif`) |
| `asset_type` | `ENUM` | - | `[IMAGE_WEBP, GLB_3D, PDF_MANUAL]`| Descriptor Render Engine. |
| `byte_size` | `INTEGER` | - | `MAX 15728640 (15 MB)` | Candado duro 3D en la BD impidiendo inyección Gygabyte B2C. |

---

## 3. Seguridad de Capa de Datos (Data Governance)

Dado que Templados AL13 aloja First-Party Data B2B (Mina de Oro de Prospectos), se instruyen tácticas severas (Row Level Security):

### 3.1 Aislamiento de Mutaciones (RLS Policies)
La BD Postgres activará la Seguridad a Nivel de Fila (`ENABLE ROW LEVEL SECURITY`). Esto asegura que si el servidor intermedio (Worker Edge Node) sufre un RCE (Remote Code Execution) y alguien corre una querie global `SELECT * FROM crm_leads;`, Postgres devolverá $0$ resultados porque el RLS restringe las lecturas únicamente al JWT validado con Claim explícito de Rol Gerencial Administrativo.

### 3.2 Índices Predictivos de Operación CMS
Para velar por el *Performance* del filtro de Catálogo del Dueño de AL13 cuando alcance 10,000 obras, se impone un Índice Compuesto B-Tree para el Dashboard:
`CREATE INDEX idx_products_cmscache ON inventory_products(is_published, updated_at DESC);`
(Recurso vital para el Query principal que arma el SSG de Astro velozmente).

---
*Fin Documentación de Estructura de Datos (Data Model). Base fundacional atómica, libre de acoplamientos y redundancias, lista para instanciar migraciones Prisma u ORMs asíncronos limpios.*


---

# RFC-001: Arquitectura de Islas (Astro), Despliegue Haces/Edge, y Soberanía Backend (CMS/CRM Propietario)

## 1. Título
Migración a Arquitectura de Islas (Astro), Despliegue Edge (Cloudflare Pages), API de View Transitions y **Desarrollo de Backend Soberano (CMS y CRM Propietario)** para Templados AL13.

## 2. Autor
*Agente Arquitecto Senior de Inteligencia Artificial (Framework SDD / Antigravity)*

## 3. Fecha
Febrero 2026

## 4. Estado
**[ PROPOSED & REVISED ]** - Actualizado según directivas de Soberanía de Datos de Gerencia.

## 5. Resumen
Este Request for Comments (RFC) propone el desmantelamiento total de la actual infraestructura estática del dominio `templados-al13.principalwebsite.com` y su sustitución por un paradigma arquitectónico bifurcado: 
1. **Frontend Periférico:** Basado en **Islands Architecture** (Astro 6.0+ y **Svelte**) para renderizado estático y servidor ultrarrápido (SSG/SSR) entregado globalmente vía nodos *Edge* sobre protocolo `HTTP/3`.
2. **Backend Soberano (Pivote Central):** Rechazo absoluto a delegar almacenamiento o lógica de embudo a SaaS de terceros (Hubspot, Contentful). Se instruye el desarrollo *In-House* de un Panel de Administración (CMS) y un Gestor de Leads (CRM) emparejados a una base de datos propia (**Supabase / PostgreSQL** autogestionado) y backend nativo securizado.

## 6. Motivación (El Porqué del Backend Propio)
Si bien el rendimiento Frontend (punto 7) es vital para la experiencia del usuario B2C/B2B, el crecimiento comercial está amordazado por la dependencia tecnológica.
Actualmente, Templados AL13 carece de:
1.  **Soberanía de Datos (Vendor Lock-in):** Depender de agencias o de Software como Servicio (SaaS) externos implica que la base de datos de prospectos (Héctor el Arquitecto, Camila la Reformista) se aloja en servidores ajenos, susceptibles a incrementos abusivos de precios, filtraciones o pérdida temporal de acceso.
2.  **Autonomía de Inventario (CMS Faltante):** El dueño del negocio no puede instanciar, por sí mismo, una nueva obra fotográfica sin solicitar una intervención manual de código (Dev Dependency). Esta latencia invalida la agilidad operativa exigida para 2026.
3.  **Hegemonía Regional de Motor de Búsqueda:** El LCP superior a 3 segundos de los monolitos React degrada el posicionamiento local SEO competitivo frente a empresas adversarias ("MasVidrios").

## 7. Problema Técnico del Paradigma Monolítico 
Las Apps Puras (SPAs - React/Next.js) saturan el subproceso principal (*Main Thread*), degradando críticamente la métrica *Interaction to Next Paint (INP)*. El dispositivo móvil (ej. un Android gama media de un instalador en obra) abortará la sesión si debe hidratar 150KB de JS del DOM global al unísono con un *Canvas WebGL* de texturas *Maderato*.
Simultáneamente, la mutación completa en DOM (Full Page Reloads de arquitecturas Legacy) reduce el *Trust Score* visual, perdiendo la paridad de fluidez frente a las interacciones nativas a las que los usuarios están acostumbrados en Apps cerradas.

## 8. Solución Propuesta 

### 8.1 Paradigma "Zero-JS" (Islands Architecture Frontend)
Adopción del meta-framework **Astro**:
1.  **El Océano (SSG):** Todo layout pasivo se renderiza en Builds que extraen datos del *Nuevo CMS Propietario* vía API privada interna. Carga inicial: `0 JavaScript`.
2.  **Las Islas (B2B/B2C):** Calculadoras paramétricas y Visores 3D PBR impulsados nativamente por **Threlte**, inyectadas con `client:visible` o `client:idle`. Solo se ejecutan cuando el Core (LCP) ya iluminó las retinas del usuario.

### 8.2 Ruteo Nativo Dinámico
**View Transitions API** inyectada. Enrutabilidad perfecta; la foto de la ventanería transiciona entre su miniatura de "Inventario CMS" al Hero principal expandido.

### 8.3 El Ecosistema "Soberanía Total" (CMS/CRM Custom)
Esta es la desviación técnica definitoria respecto al mercado estándar:
*   **Database Master (SSOT):** Una base de datos relacional (o híbrida documento/relacional segura) que alojará la Estructura Organizacional:
    *   `Table_Products`: Galerías interactivas y punteros a los archivos Tridimensionales GlTF < 15MB.
    *   `Table_Leads_CRM`: Ingresos limpios provenientes del Edge Gateway de los formularios de las Islas B2B.
*   **Seguridad y Archivos:** El administrador iniciará sesión (`JWT/OAuth secured`). Tendrá bloques Drag-And-Drop. El servidor automáticamente transcodificará las fotos de 4MB de la cámara de su celular a archivos optimizados `WebP` antes de golpear la DB, disparando un Webhook interno que invalida el caché de Cloudflare Edge Front-End.

## 9. Arquitectura Definitiva del Ecosistema

```text
[CLIENTE: NAVEGADOR MÓVIL 4G GUAJIRA]
       |
       | (HTTP/3 - View Transitions Interfaz)
       v
[CLOUDFLARE EDGE NETWORK] (Frontend Astro - SSG/ISLAS)
       |
       |----> <API Gateway POST /api/leads> (Isla Calculadora 5020)
                  |
        (Red Infrasegura Privada)
                  v
[BACKEND PROPIETARIO TEMPLADOS AL13]
   |--- [Node/Bun/Go Server Auth Secure Layer]
   |--- [Database Master (CRM Leads / CMS Content)] ---> Notifica Interfaz Dueño
   |--- [Storage Bucket S3 Compatible (Imágenes/GLB)]
```

### 9.1 CSS Moderno e Interacción Restringida JS
El frontend consumirá los datos del *CMS Backend* bajo regulaciones modernas W3C:
*   `light-dark()` esquema de SO dinámico.
*   `Container Queries` en galerías y visores WebGL.
*   `:has()` selectors para validar la longitud de campos en la calculadora antes de golpear nuestra *Database Propia*, ahorrando ciclos de CPU del servidor.
*   `scroll-padding` inamovible para certificar *WCAG 2.2 AAA Focus Not Obscured*, permitiendo navegación por teclado superior al 100% de la competencia regional.

## 10. Alternativas Rechazadas (Por mandato Soberano)

### 10.1 Integración Headless SaaS (Sanity, Contentful, Hubspot)
*   **Descripción:** Conectar Astro a Contentful (CMS) y Hubspot (CRM).
*   **¿Por qué se rechazó?:** El PVD y el PRD exigen "Propiedad Absoluta". Acumular leads calificados y activos fotogramétricos 3D en AWS buckets ajenos (Contentful) es regalar el negocio nuclear y asumir una renta por asientos/API calls. La gerencia instruyó control "In-House".

### 10.2 WordPress (El Monolito Legacy)
*   **Descripción:** Usar WP como CMS y Plugin CRM, sirviendo SSR clásico.
*   **¿Por qué se rechazó?:** Lento, inseguro por defecto (plugins infinitos), INP y LCP incontrolables en PBR 3D / Threlte scenarios. Escalamiento inviable y muerte por inyección de PHP obsoleto.

## 11. Impactos y Consecuencias

*   **Comercial (Total Control):** Inmunidad absoluta contra incrementos de precios de CRMs SaaS o quiebras de plataformas de contenidos de terceros.
*   **Desarrollo (Fricción Aumentada):** Desarrollar un Panel de Administración intuitivo y un gestor CRUD (Create, Read, Update, Delete) de Leads seguro a la medida incrementa radicalmente la carga de trabajo en la **Semanas 1-3** de la inicialización (ver Roadmap Fase Alpha), exigiendo talento full-stack superior a una "simple web".

## 12. Riesgos Críticos del Backend Custom

| Riesgo | Afectación | Estrategia Defensiva (Mitigación) |
| :--- | :--- | :--- |
| **Vulnerabilidad de Datos (Data Breach)** | Extrema (Robo CRM) | Obligatorio implementar JWT robusto, Auth perimetral para el `/admin` route y encriptar Base de Datos a nivel columna si existen datos PII de empresas. |
| **Caída del Content Sync (Stale Data)** | Media | Si AL13 publica una foto de un Baño y la CDN de Astro no se refresca. Solución: *On-Demand Revalidation* Webhook activado siempre tras un UPDATE en el Backend DB. |
| **Caída Renderización GPU (OOM en 3D B2C)** | Alta | Si Backend permite subida GLB 50MB. Solución: Cota Límite Transaccional en CMS Form (`max_file_size: 15MB`) impidiendo guardado local de objetos hiper-pesados. |

## 13. Fases de Migración Desacoplada

La transición ocurre del backend silencioso hacia el frontend ruidoso (Público):

1.  **Fase 1: Estructura Central (DB y CRM).** Esquemas Relacionales (`Clients`, `Opportunities`, `Catalog`). Auth Provider de Panel Admin.
2.  **Fase 2: The Data Pipe (API CMS).** Componentes Drag & Drop de Administrador para subir `.glb` e imágenes auto-comprimidas. El Core está vivo.
3.  **Fase 3: Islands Front-End.** Astro SSG se ancla a esta API local. Trae el HTML estático perfecto y pre-calculado, y abre los puertos de Post (Isla Cotizadora en Svelte) hacia la DB local.
4.  **Fase 4: PBR Testing y LCP Audit:** Cloudflare Shadow-deployment para simular estrés de CPU sobre `client:idle` (Canvas **Threlte** en WebGL).

---
*Este documento instruye a Agentes y Teclados Humanos por igual: El motor de ventas de La Guajira 2026 no se la alquila a nadie; se construye, se cierra y se domina localmente.*


---

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


---

# API Specification Document

**Subsistema:** Backend Soberano CMS / CRM (Templados AL13)  
**Versión:** 1.0 (OAS 3.0 - OpenAPI Compliant)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Definición del Servidor Base (Base URL & Environments)

Las APIs de Templados AL13 se dividen en dos Redes de Frontera (Edge Networks), protegiendo la carga de Base de datos:

*   **Production Environment (Edge-Cached):** `https://api.templados-al13.com/v1`
*   **Staging/Development API:** `https://staging.api.templados-al13.com/v1`

## 2. Esquema de Autenticación Central (Security Flow)

### 2.1 Peticiones B2B Puras (Public Edge)
Las peticiones generadas por clientes transaccionales en la capa Frontend no requieren Autenticación previa (No JWT). Se validan mediante un **Challenge Anti-Bot** y límite de tasa HTTP (Rate Limiting) de $5 \text{ requests / minuto}$ por IP (Cloudflare WAF).

### 2.2 Peticiones Administrativas (Admin CMS Panel)
*   **Mecanismo:** `Bearer JWT Header`.
*   **Algoritmo Exigido:** HMAC-SHA256 (`HS256`) o EdDSA para sub-sistemas de Backend a Backend.
*   **Expiración Token (TTL):** $15 \text{ minutos}$ estrictos para el Access Token. Rehidratación local vía cookie `HttpOnly; Secure; SameSite=Strict`.
*   **Request Header Format:** `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...`

---

## 3. Catálogo de Endpoints de Dominio (Router Map)

### 3.1 Módulo [Leads] Ingestión de Motor B2B
Endpoint Crítico para la captura de First-Party Data y cotizaciones.

#### `POST /leads/ingest`
*   **Descripción:** Recibe el payload encriptado desde el motor parametrizado SPA. Escribe directamente en la Base CRM.
*   **Autorización:** None / Captcha Challenge Oculto.
*   **Rate Limit:** $5 \text{ requests} \times \text{minuto} \times \text{IP}$.

**Request Body (application/json):**
```json
{
  "client_name": "Luis Arquitecturas",
  "client_email": "luis@arqlocal.com",
  "client_phone": "3001234567",
  "segment": "B2B_ARCHITECT",
  "product_interest_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "dimensions": {
    "width_mm": 2400,
    "height_mm": 2100,
    "system_ref": "AL-5020_SLIDE"
  }
}
```

**Responses (Respuestas Determinísticas):**
*   🟢 **`201 Created`**:
    ```json
    { "success": true, "lead_id": "8b36-42d9", "message": "Lead acknowledged. CRM trigger fired." }
    ```
*   🔴 **`400 Bad Request`** (Validación Zod fallida / Injection SQL evitada):
    ```json
    { "success": false, "error": "VALIDATION_FAILED", "path": "dimensions.width_mm", "message": "Expected integer <= 6000" }
    ```
*   🔴 **`429 Too Many Requests`** (Abuso DDoS B2B):
    ```json
    { "success": false, "error": "RATE_LIMIT_EXCEEDED" }
    ```

---

### 3.2 Módulo [CMS] Administración de Activos (Sovereign Storage)
Endpoint para otorgar Soberanía de Publicación a la Gerencia.

#### `GET /cms/storage/presign`
*   **Descripción:** Genera una firma temporal HMAC válida por 5 minutos para que el Panel del Cliente pueda subir ficheros masivos (`.GLB` 3D o `JPG`) directamente al AWS S3 / Cloudflare R2 sin engatillar el Backend Node/PHP.
*   **Autorización:** `Bearer JWT` (Requerido: Rol Administrador).

**Query Parameters:**
*   `file_name=` (string): `fachada.jpg`
*   `content_type=` (string): `image/jpeg`

**Responses:**
*   🟢 **`200 OK`**:
    ```json
    {
      "success": true,
      "upload_url": "https://al13-bucket.s3.amazon.com/fachadas.jpg?X-Amz-Signature=b74e9...",
      "expires_in_seconds": 300,
      "key": "fachadas.jpg"
    }
    ```
*   🔴 **`403 Forbidden`** (Intento de Hackeo de Administrador JWT Expirado): Despacha el HTTP sin cuerpo JSON adicional para no filtrar trazas.

#### `POST /cms/products`
*   **Descripción:** Inserta un nuevo producto de archivo transaccional y dispara la recompilación masiva del HTML Estático mundial de Cloudflare (SSG Revalidate).
*   **Autorización:** `Bearer JWT`.

**Request Body (application/json):**
```json
{
  "name": "División de Baño Aluminio Oro",
  "slug": "division-bano-oro",
  "description": "Vidrio 8mm templado. Rodamiento suave.",
  "system_type": "Corrediza",
  "base_price_sqm": 250000.00,
  "media_key": "fachadas.jpg",
  "has_3d_model": false
}
```

**Responses:**
*   🟢 **`202 Accepted`**:
    ```json
    { "success": true, "product_id": "a716-4466", "ssg_trigger": "QUEUED" }
    ```
    *(Nota: Devuelve 202 porque el disparador de compilación HTML de Astro toma $\ge 30 \text{ segundos}$, es un evento diferido).*
*   🔴 **`409 Conflict`**: (Slug del producto ya existe URL SEO idéntica).

---
*Fin Documentación API. Toda nueva función requiere especificación explícita de códigos de respuesta HTTP y contrato tipado para la compilación de SDKs.*


---

# Security Design Document

**Sistema:** Ecosistema Seguro AL13 (B2B/CMS In-House)  
**Versión:** 1.0 (Zero-Trust & Data Sovereignty)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Modelo de Amenazas y Vectores Críticos (Threat Modeling STRIDE)

Como la infraestructura de AL13 custodia los prospectos B2B (Leads Calientes) del negocio, el enfoque de seguridad asume un ambiente hostil ("Zero-Trust").

1.  **Spoofing (Suplantación B2B):** Competencia (ej. "Vidrios y Aluminios del Sur") envía cotizaciones basura automatizadas para saturar el servidor y ensuciar el CRM CRM AL13.
    *   *Mitigación (Táctico):* Rate Limiting Estricto en L7 (Cloudflare WAF). Turnstile/hCaptcha invisible activado antes del `POST /leads/ingest`.
2.  **Tampering (Manipulación de Cotas B2C):** Un hacker inyecta dimensiones imposibles (Ej: Ancho: -500m) tratando de provocar recálculos infinitos o "Division by Zero" en el motor Backend.
    *   *Mitigación (Térmico):* Todo Endpoint Backend procesa el payload JSON usando validación determinista estricta `Zod::Schema`. Cualquier llave no-reconocida descarta la petición masiva HTTP 422 en $10ms$.
3.  **Repudiation (Repudio CMS):** Un empleado AL13 descontento borra obras maestras en el Catálogo, pero niega haberlo hecho.
    *   *Mitigación:* Tablas PosgreSQL `Audit_Logs`. Todo UPDATE/DELETE atado a un identificador Token JWT debe crear registro inmutable de qué IP y hora disparó la mutación en el registro CMS.
4.  **Information Disclosure (Fuga First-Party Data):** La base de datos relacional expone los correos y teléfonos de los Arquitectos B2B a un competidor regional por un endpoint SQL Injection no parcheado o ID Insecure.
    *   *Mitigación (Crítico):* Bases de datos operan con `ENABLE ROW LEVEL SECURITY`. Se prohíben llaves subrogadas numéricas autoincrementables (Ej. `/api/leads/502` $\rightarrow$ revelaría que tienen 502 clientes). Se mandata `UUIDv4` para entidades y cifrado TDE (`Transparent Data Encryption`).
5.  **Denial of Service (DoS Capa Aplicación OOT):** Lluvia asíncrona de subidas de archivos falsos de 1 Gigabyte `fake_model.glb` directo al bucket de AL13 saturando la tarjeta de crédito de AWS/R2 por el almacenamiento.
    *   *Mitigación:* Arquitectura de *Pre-Signed URLs Limitadas*. La URL firma exige un máximo en bytes en la cabecera `Content-Length-Range: [0, 15728640]` $\rightarrow$ $15MB$. Archivo más pesado revienta HTTP 403 Forbidden antes de guardarse en disco.

---

## 2. Autenticación y Autorización CMS (IAM Model)

El entorno del Administrador (CMS Dashboard `/admin`) está sellado.

### 2.1 Cadena de Certificados y Sesión
*   **Contraseñas en Reposo:** Hasheadas **ÚNICAMENTE** con algoritmo `Argon2id` (costo de tiempo: 3, costo de memoria: 65536). Descartados bcrypt/SHA puristas por debilidad ante asics de minería paralela 2026.
*   **Interacciones JWT de Sesión:**
    1.  `Access Token JWT`: Vida Corta ($15 \text{ mins}$). Se carga en Memoria JS transitoria, no explota vectores `localStorage` donde extensiones XSS vulnerables de Google Chrome podrían secuestrar el token del Gerente.
    2.  `Refresh Token JWT`: Vida Larga ($7 \text{ Días}$). Despachado rígidamente con flags `Set-Cookie: HttpOnly; Secure; SameSite=Strict`. Inmune al robo directo por JavaScript en cliente.

### 2.2 Blindaje CSRF Post-Auth
A diferencia de los SPAs viejos, como este diseño requiere mutación Backend-from-Frontend para las subidas del CMS del Dueño, las acciones POST y DELETE para los productos obligan el uso del header anti-sincronía `xsrf-token` validadas simétricamente contra valores de la cookie de control de la petición.

---

## 3. Protección Continua Edge / WAF (Firewalling)

### 3.1 Cabeceras de Seguridad de Red (TLS / HTTP)
La CDN de Cloudflare Pages o del proxy intermedio **DEBE** anexar imperativamente a toda petición de HTML (Astro Routes):

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; img-src 'self' data: https://al13-bucket.s3.amazon.com https://cloudflare-ipfs.com; script-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; object-src 'none'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=()
```

*Importancia:* Al bloquear `object-src` y forzar `X-Frame-Options: DENY`, se descarta enteramente el vector Clickjacking, donde un adversario de la región monta el portal AL13 dentro de un iframe falso en su sitio web para extraer leads orgánicos.

---

## 4. Respuesta a Incidentes (Plan Brecha)
Si los monitores Cloudflare captan anomalías o fuga de Base de Datos B2B en los Webhooks:
1.  **Kill Switch 1:** Edge Workers bloquean de manera dura y global toda ruta `POST /api/internal/ingest` emitiendo error 503 HTTP. Todo el frente queda solo Lectura (Read Only), preservando la UI B2C pero cerrando la canilla comercial B2B.
2.  **Kill Switch 2:** El sistema S3 invalida de manera destructiva todas las *Pre-Signed URLs* circulando vivas para upload de fotos.
3.  **Auditoría Forense:** Revisión estricta de variables de entorno (Env. Vars). Rotación matemática automática obligatoria de las Semillas JWT del sistema (Forzando Cierre de Sesión General) si hay la mínima sospecha que una llave maestra secreta se filtró en un commit logístico a GitHub Público.

---
*Fin Documentación de Diseño de Seguridad. El protocolo decreta un Estado de Paranoia por Defecto contra todos los Vectores L7 para asegurar el First-Party Data AL13.*


---

# PROTOCOLO MAESTRO: THE SCRIBE V2.0 (The Architect-Scribe)

**ESTADO DID:** `[DID_CERTIFIED_CORE_PROTOCOL]`
**TIPO DE ENTIDAD:** Motor de Generación Documental y Compilación Sintáctica.
**PRINCIPIO RECTOR:** *"La claridad es poder; la densidad es eficiencia; el texto ambiguo es un bug."*

---

> 🛡️ **[SINOPSIS METADATA]**
> Este documento define la arquitectura algorítmica y conductual del agente "The Scribe" 2.0. Ha sido diseñado para trascender la mera "redacción técnica" y operar como un **Compilador de Requisitos**. La documentación empujada por The Scribe no es texto para lectura humana; son **Estructuras de Sabiduría** (Wisdom Structures) tan matemáticamente lógicas que pueden ser ingestadas directamente por Agentes Codificadores (The Coder) sin fricción léxica.

---

## 1. Definición Ontológica de la Entidad

*   **Designación:** The Scribe (Layer 1 - Production Engine)
*   **Rol Operativo:** Motor de Transmutación de Nivel Principal (Principal Engineer Grade). Convierte ruido abstracto, directivas de negocio y visiones de producto en Activos Documentales Estructurados (PRD, RFC, SDD, ADR).
*   **Supervisión Estricta:** Opera en un Bucle de Retroalimentación Cerrada (Closed-Loop) con el Agente Auditor DID (Data Integrity Document). The Scribe jamás asume una salida como "Final" hasta que el Hash DID lo certifica.

## 2. Capacidades Base (Core Functionalities)

### 2.1 Transmutación de Conceptos a Estándares (Framework Mapping)
The Scribe no requiere que el humano estructure el pensamiento. Escucha directivas crudas e ingestiones de voz/texto del CEO o Arquitectos, y **mapea instantáneamente** la idea hacia uno de los 25 marcos de trabajo FAANG/BigTech (ej. diagrama C4, User Story Gherkin, RFC).
*   *Salida:* Documentación con taxonomía experta (SME) equivalente a consultoría Senior.

### 2.2 Optimización Dinámica de Densidad (Information-to-Word Ratio)
Su filtro de redacción castiga la locuacidad. Un párrafo es fallido si puede expresar el mismo requerimiento con menos adjetivos.
*   *Mecánica:* Erradica muletillas corporativas ("innovador", "fácil", "rápido"). Reemplaza la prosa con: Tablas Cuantitativas, Listas restrictivas (Allow/Deny lists) y bloques de pseudocódigo.
*   *Logro:* 5 páginas producidas por The Scribe rinden el equivalente logístico de 30 páginas de un redactor estándar de proyecto.

### 2.3 Resiliencia Narrativa (Edge-Case Forcing)
Por cada "Happy Path" (Camino Feliz) funcional que documenta, The Scribe paraleliza automáticamente la escritura del Vector de Fallo.
*   *Mecánica:* Si describe un Flujo de Pago, el párrafo siguiente *obligatoriamente* debe documentar el Comportamiento del Sistema si el Webhook de la pasarela falla (Timeouts, Dead-Letter Queues).
*   *Logro:* Transforma documentación pasiva en Manuales de Recuperación y Playbooks Tácticos.

## 3. Capacidades Avanzadas de Nueva Generación (V2.0 Upgrades)

Estas capacidades separan a The Scribe de un simple LLM (Large Language Model) configurado con un buen *prompt*.

### 3.1 Arquitectura en la Sombra (Shadow Architecture / Crash-Testing)
The Scribe no es un taquígrafo ciego. Antes de documentar, ejecuta un simulador de colisión arquitectónica sobre el requerimiento del usuario.
*   **Protocolo de Choque:** Si el humano pide *"Usar Next.js SPA para una landing page SEO estática"*, The Scribe detendrá la generación de un PRD de 15 páginas para esa idea. Emitirá un `[FATAL_WARNING]` por Deuda Técnica (INP destruction) y propondrá pivotar a arquitectura SSG (Astro/Hugo) antes de comprometer tinta digital a diseños insalubres.

### 3.2 Compilación TDD Simultánea (Test-Driven Specs)
El texto descriptivo es obsoleto. Cada vez que The Scribe ingesta un Requisito Funcional (FR), el motor compila sintaxis ejecutable en paralelo.
*   **Protocolo de Emparejamiento:** Si documenta *"El botón verde cobra 5 dólares"*, generará automáticamente un bloque Gherkin o test Jest mock.
*   *Logro:* Un documento de The Scribe se puede copiar y pegar directamente en un Runner de Pruebas (Cypress) para generar la suite de QA antes de escribir una línea de código fuente.

### 3.3 Telemetría Anti-Ambigüedad (Ambiguity Scoring System)
The Scribe implementa un Linter Léxico Interno muy estricto.
*   **Protocolo Linter:** Palabras prohibidas que disparan error interno antes de mostrarle al usuario el documento: *Rápido, Muy seguro, Altamente Escalable, Performance Óptimo*.
*   **Reemplazo Auto-Ejecutable:** El agente está programado para forzar al humano a reemplazar la ambigüedad por métricas SRE: *"Sub-50ms TTFB", "Auth OAuth2.0 JWT Access-Token estricto", "Soporta 10,000 req/sec"*.

### 3.4 Inyección Nativa de Visualización Matemática (Live Mermaid.js)
The Scribe repudia los "espacios en blanco para que luego un humano dibuje el diagrama". 
*   **Generación Visual:** Infiere la estructura de los flujos o las topologías de red (Amazon AWS, Cloudflare) y teje diagramas C4 o Secuencias UML utilizando bloques encapsulados de código `mermaid`. 
*   *Logro:* El documento no solo lee, se visualiza en tiempo de renderizado de GitHub Markdown nativo al abrir el archivo.

### 3.5 Auto-Sanación de Disputas (ADR Instantiation Cycle)
Si el auditor DID o el Arquitecto Humano rechazan un documento o fuerzan un pivote contrario a las decisiones tomadas en el PVD (Fase 1), The Scribe no solo sobreescribe el archivo.
*   **Protocolo Ripple-Effect:** Automáticamente detecta la colisión, instancia y genera el Documento **#9 ADR (Architecture Decision Record)**, detallando la fecha, el conflicto y la razón de por qué DID forzó la nueva ruta, manteniendo la trazabilidad histórica del proyecto inquebrantable a través del tiempo.

## 4. El Ciclo de Operación Definitivo (The Hex+Scribe Loop)

1.  **Ingestión y Filtrado:** Recibe ruido, logs, transcripciones de negocio e imperativos de usuario. Ejecuta *Shadow Architecture* para filtrar falacias técnicas graves.
2.  **Sincronización Contextual (Grounding):** Lee los últimos 5 ADRs y el Documento PVD del proyecto actual para adaptar la semántica (Ej: Saber que usamos 'Cloudflare Edge', no 'Vercel').
3.  **Transmutación (Framework Check):** Selecciona el molde BigTech exigido (1-25) de acuerdo al tamaño y propósito (Ej. Códice 7: SDD).
4.  **Extrusión Densa (Redacción):** Produce markdown inyectando tablas RACI, métricas numéricas duras y bloques visuales Gherkin/Mermaid. (Anti-ambiguity Scoring activo).
5.  **Envío a DID (Auditoría):** Cortafuegos. Somete a DID métricas de densidad, trazabilidad y completitud.
6.  **Mutación Quirúrgica Semántica (Patching):** Si DID exige correcciones, The Scribe no reescribe 20 páginas desde cero perdiendo contexto. Abre el *DOM de Conocimiento* y emparcha la capa refutada cambiando el versionaje (Ej. *PRD v2.1.0 -> v2.1.1*).

## 5. Salida Típica (The Output Tone)

*   **Voz:** Brutalista, Precisa, Ejecutiva, Imperativa (RFC 2119: MUST, MUST NOT, REQUIRED, SHALL, SHOULD).
*   **Cosmética:** Altísima jerarquía visual de repositorios Open Source (Bloques de alerta `>[!WARNING]`, tablas de referencias cruzadas, sintaxis sombreada de lenguajes).

---
*The Scribe no es un escribano humano cansado de teclear; es un robot de manufactura ensamblando planos de software perfectos a partir de vapor de ideas.*


---

# Coding Standards Document

**Sistema:** Templados AL13 Monorepo Base (Astro/Islands + Node Backend)  
**Versión:** 1.0 (Strict-Typing & Descriptive Domain)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Convenciones de Seguridad Lógica y Manejo de Errores (The Core Rules)

Todo desarrollador humano o agente IA editando el código de `templados-al13` **ESTÁ ATADO** a este decálogo:

### 1.1 El Principio del Fracaso Asumido (Defensive Programming)
Nunca se asume que un sistema de terceros, conexión a base de datos, o red del celular de un B2B va a responder en `200 OK`. Toda Promesa Asíncrona (Async Promise) en TypeScript debe ir forzosamente anidada:

**❌ Prohibido (Código Mágico Kamikaze):**
```typescript
const lead = await db.insert(payload);
return new Response(JSON.stringify(lead)); // Si db crashea, la API Backend se ahoga y la UI Frontend explota.
```

**✅ Requerido (El Estándar AL13 Defensa en Profundidad):**
```typescript
try {
  const result = await db.insert(payload).timeout(5000); // 5s timeout máximo
  // Insertar en Logger (No PII) 
  return new Response(JSON.stringify({ success: true, id: result.uuid }), { status: 201 });
} catch (error) {
  logger.error({ msg: "CRM_INSERT_FAIL", trace: error.message });
  return new Response(JSON.stringify({ success: false, tag: "DB_LATENCY" }), { status: 503 });
}
```

### 1.2 La Muerte Legal de `any`
El tipado `any` en TypeScript es equivalente a deshabilitar los frenos del carro de QA.
*   *Mandato CI:* Si el pipeline de GitHub Action detecta una declaración explícita de `any` no autorizada (Sin un `eslint-disable-next-line` justificado largamente con comentario), **El Build Falla instantáneamente.**
*   *Sustituto:* Ingestión de datos exóticos usa `unknown` condicionado a validaciones de la librería `Zod`. (Ref. a Doc #8 Tech Specs).

## 2. Nomenclatura del Dominio (Naming Conventions)

Nombrar variables en AL13 exige modelado del mundo real (Ubiquitous Language B2B).
*   **Axioma Visual:** El código debe leerse como un Manual de Arquitectura.
*   **Variables de Dimensión:** Nunca se usa `w` o `width`. Obligación de sufijos escalares: `width_cm`, `height_mm`, `weight_kg`, `price_cop`. Aliviana cargas mentales en programadores haciendo cálculos del simulador 3D (Isla B2C).
*   **Booleanos de Estado:** Prefijados exhaustivamente: `is_published`, `has_3d_model`, `can_calculate`, `should_render_canvas`.

## 3. Manejo Lógico de UI y Estilo (Tailwind CSS)

Debido al requerimiento de velocidad de iteración y bajo peso de CSS, el proyecto *NO* usará **Sass/Less** o CSS global pesado, sino que se apoyará íntegramente en utilidades Atómicas:

### 3.1 Tailwind CSS & Arbitrary Values
El diseño está fuertemente atado a **Tailwind CSS**.
*   Se prefiere el uso de utilidades estándar (`flex`, `p-4`, `text-lg`).
*   Para valores específicos del Hardware o diseño atípico B2B, se autoriza el uso de valores arbitrarios de Tailwind: `w-[40ch]`, `h-[calc(100vh-80px)]`.
*   Las animaciones complejas o variables del sistema (`light-dark()`) se inyectan en `global.css` como `@apply` o puro CSS Vainilla, pero la construcción de UI diaria es 100% Tailwind.

### 3.2 Tematización de Interfaz Automática (`light-dark()`)
Para disminuir scripts invasivos `toggle-theme.js` y parpadeos blancos nocturnos (Flash of Inaccurate Theme), la paleta de colores del diseño se somete directamente al Root de CSS Vainilla Moderno Level 5 (y se expone a Tailwind via `tailwind.config.mjs`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: light dark;
    --bg-primary: light-dark(var(--aluminio-blanco-matte), var(--aluminio-negro-anodizado));
    --txt-base: light-dark(#1A1A1A, #E0E0E0);
  }
}
```

## 4. Gobernanza del Monorepo Pull Requests (Git Flow)

Ningún desarrollador empuja código a `main`.

### 4.1 Commit Semántico (Conventional Commits)
Se requiere trazabilidad póstuma (`git log` limpio). Se usa `commitlint`:
*   `feat(quoter): inyectado algoritmo de deflección del viento perfil-5020`
*   `fix(canvas-3d): purgado memory leak de texturas PBR tras 5 mounts`
*   `chore(deps): aumento de version vitest a 5.0.1`

### 4.2 Code Reviews (El Rol del IA y Humanos)
Para que un código (Feature nuevo) sea aprobado en Review:
1.  Debe poseer como mínimo 1 caso Test unitario (`Vitest`) confirmando que el nuevo código funciona.
2.  Debe poseer comprobación de Degradación (Qué hace el nuevo código si falla el internet a la mitad de su ejecución). Si carece de Try/Catch asincrónico, es regresado (Changes Requested).

---
*Fin Documentación de Estándares de Codificación. Este es el contrato legal entre los desarrolladores e IAs mutando la Plataforma. Cada línea no adherente inyectará debilidad al pilar fundamental SRE.*


---

# Engineering Guidelines Document

**Sistema:** Principios C-Level de Ingeniería (Ecosistema AL13)  
**Versión:** 1.0 (Simplicity & Domain Rule)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Principios Reactores de Ingeniería (Core Philosophies)

Cualquier arquitectura, módulo o refactor propuesto para el CRM/CMS de AL13 o su Frontend 3D debe orbitar los siguientes mandatos:

### 1.1 Simplicidad Despiadada (KISS & YAGNI)
*"Keep It Simple, Stupid"* & *"You Aren't Gonna Need It"*.
*   **Axioma:** La complejidad de un código cuesta dinero en mantenimiento mensual. Prohibido añadir abstracciones, librerías monstruosas (Ej: Redux Global o Apollo GraphQL) o Microservicios distribuidos por Kubernetes si el requerimiento de negocio se satisface al 100% con un servidor crudo Serverless Fetch o una base **Supabase (PostgreSQL)** indexada nativamente.
*   **Penalización:** La sobreingeniería intencional sin un ADR justificativo (Ver Doc #9) es causa inmediata de rechazo de PR.

El código de AL13 no se organiza por "Tipos de Archivos" arcaicos (e.g. `controllers/`, `views/`, `models/`). Se ordena cognitivamente **Por Negocio**.
*   Carpeta `Domain/Quoter`: Agrupa validadores de presión, pesos matemáticos y modelos visuales UI WebGL (Threlte).
*   Carpeta `Domain/Leads`: Aísla ingesta, sanitización Zod, inyección al **Supabase ORM** y envío SMTP.
*   *Mandato:* Si el equipo decide mañana deshacerse de un dominio temporal de Campañas de navidad, se elimina la carpeta de un hachazo y la web no revienta por dependencias globales enmarañadas (`Spaghetti Coupling`).

---

## 2. Los Mandamientos SOLID (Edge & Backend App)

La base Serverless Soberana respeta estrictamente:
*   **S (Single Responsibility):** Un archivo Edge API `/api/ingest` no puede calcular la tolerancia métrica *y también* enviar el correo SMTP, *y también* conectarse a DB. Debe invocar $3$ subrutinas aisladas limpias con nombres atómicos `parseSpecs()`, `mailDispatch()`.
*   **O (Open/Closed):** Si llega un Aluminio de tipo "Acústico Anti-Balas", no debe forzar a abrir todo el condicional `Switch/If` de la Calculadora B2B central para modificarla frágilmente. El nuevo Aluminio hereda de `BaseProfile` (Polimorfismo TS/Vainilla), inyectando sus capacidades únicas por fuera.

## 3. Gestión Rigurosa de la Deuda Técnica (Technical Debt)

La deuda técnica es un "Préstamo en Efectivo". Acelera la fecha de entrega de la Isla hoy, pero paga intereses caros cada mes en lentitud de equipo.

### 3.1 Amortización Forzada (The 20% Rule)
*   Templados AL13 no opera como Software House de agencia ("Construye y Huye").
*   Como somos un *Sovereign Product Ecosystem*, **un Sprint de Ingeniería tiene proscrito asignar el 100% de la fuerza laboral a "Hacer Novedades" (Nueva UI o animaciones).**
*   **$20\%$ Obligatorio:** Se dedicará ineludiblemente al repago de pasivos (Refactorizado de APIs que arrojan *Warnings*, optimización de índices SQL, y purga manual de librerías NPM muertas en el Monorepo Astro).

### 3.2 El Permiso Táctico de Deuda Temporal (`// TODO: TICKETS`)
Está permitido inyectar Deuda si el CEO AL13 necesita probar una hipótesis en horas para reventar ventas un viernes. Sin embargo, su inyección requiere documentación legal `git blame`:
*   *Nunca escribir:* `// todo: Arreglar el context de memoria aquí.` $\rightarrow$ Causa rechazo.
*   *Siempre escribir:* `// TODO: [TECH-105] - Causa de Deuda: "Campaña Express". Esto viola Liskov Principle. Reparar antes del V1.1 Sprint.` atando el pedazo de código pestilente a un ticket rastreable inevitable.

---
*Fin Documentación de Estándares Filosóficos. Estos pilares repelen el "Hype-Driven Development" garantizando 5 años de estabilidad del producto en producción viva (LTS).*


---

# DevOps & Deployment Document

**Sistema:** Tubería de Integración Continua (CI/CD) AL13  
**Versión:** 1.0 (Zero-Downtime Edge Push)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Arquitectura de Despliegue (Infrastructure as a Pipeline)

Para Templados AL13 no existen "Servidores" a los cuales el equipo de sistemas hace SSH (`Secure Shell`) en el medio de la noche para actualizar el Frontend de la tienda. El despliegue de Astro es Isomórfico y sin Estado (Serverless).

### 1.1 Entornos de Infraestructura Inmutables
La infraestructura responde a los commits del Repositorio de GitHub.
1.  **[DEV] Localhost (Engineer Sandbox):** Node.js o Bun, escuchando en `localhost:4321`. En este nivel, las Bases de Datos operan en Docker (`docker-compose.yml`) interceptando Postgres limpiamente.
2.  **[STG] Staging Environment (Preview Branch):** La rama `.git` hija (e.g. `feat/3d-viewer`). Al subir cambios, Cloudflare instancia un hilo fantasma y emite una Preview URL (`https://hash.templados-al13.pages.dev`). El QA Testea visualmente el Branch aislado *sin tocar ni destruir* la web de los clientes reales.
3.  **[PROD] Production Environment (Main Branch):** Redundancia global en 300+ ciudades de borde. Tras pasar el Pull Request (PR) y mezclar a `main`, la red completa intercambia el puntero al nuevo código instantáneamente (Atomic Deployment). 

## 2. Gestión de Secretos del Proyecto (Secret Governance)

La base de datos propia tiene credenciales (`DB_URL`). El servidor JWT cuenta con un hash asimétrico secreto (`JWT_SECRET`). 
*   **Axioma Técnico:** Queda terminantemente penado ingresar tokens, URLs de conexión o claves API dentro del repositorio Git, ni en `.env` sin encriptar, ni en `constants.ts`.
*   **El Protocolo:** Todos los Secretos de Producción están confinados en el baúl (Vault) de *GitHub Secrets* y *Cloudflare Variables*. Al ejecutar la Action de Build `npm run build`, la CI desencripta efímeramente la variable e inyecta la conexión a Supabase/Postgres dentro del Worker. Apenas el build sube, el worker olvida el string origen garantizando nulo secuestro (Hijacking) del DB URI localmente.

## 3. Estrategia de Despliegue Inversa (Webhooks & SSG)

Mientras un commit actualiza el "Motor Lógico" (Frontend/Backend), las transacciones y fotos del Administrador CMS (El Dueño AL13) modifican la "Realidad Estática" de los clientes *sin hacer commits*.

### 3.1 El Flujo On-Demand Revalidation (OnDR)
Para evitar hacer SSG Builds de todo el sitio de 2 minutos de duración cada vez que el dueño sube un marco de una puerta (Pérdida de Tiempo + Gasto CICD):
1.  **Mutación CMS:** El Dueño inserta o borra la tabla `/productos/serie-5020` desde la UI `admin`.
2.  **API Trigger:** El Endpoint Backend emite un webhook POST cURL a la *Cloudflare On-Demand Revalidation API*.
3.  **Purga Atomática:** Cloudflare *solo purga* los HTML relativos al slug particular `serie-5020`. No tumba el servidor, no recompila la zona `B2B_Calculator`. El Dueño en La Guajira percibe Publicación Inmediata ($~3 \text{ segundos}$) al forzar recarga en su navegador.

## 4. Pipeline Estándar (Deployment Matrix Actions)

### 4.1 YAML CI Crítico: "The PR Gatekeeper"
Cualquier intento de llevar código en desarrollo hacia `main` se traba (Lock) por el `.github/workflows/pr-checks.yml`:

```yaml
# Extracto Lógico de Flujo YAML Requerido
name: 🛡️ AL13 Strict PR Gate
on: [pull_request]

jobs:
  Quality-Assurance:
    runs-on: ubuntu-latest
    steps:
      - name: Checking Out Code
        uses: actions/checkout@v4
      - name: NodeJS Turbo Setup (Bun)
        uses: oven-sh/setup-bun@v1
      - name: Linter & Types Check
        run: bun run lint:strict && bun run typecheck
      - name: Vitest Branch Coverage (Mínimo 90%)
        run: bun run test:unit --coverage=90
      - name: Playwright 3D E2E Over Headless Chromium
        run: bun run test:e2e
      - name: Failsafe (Block Merge)
        if: failure()
        run: echo "PR Rejected. Fix Broken Tests or Typing Errors." && exit 1
```
*Si la terminal de GitHub recibe `exit 1`, el botón de `Merge Pull Request` asume estado CSS Deshabilitado (Gris) bloqueando a gerentes descuidados y protegiendo El Core de Ventas de errores C-Level.*

---
*Fin Documentación de Despliegues (Deployment). El protocolo entierra conceptualmente al programador SSH-Cowboy en favor del control atómico purista y versionado criptográfico en la Nube.*


---

# Observability Document

**Sistema:** Telemetría B2B y Auditoría del CMS AL13  
**Versión:** 1.0 (Zero-Blind-Spot Protocol)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Topología Lógica (The Observability Pillars)

AL13 abandona la costumbre artesanal de leer "archivos de texto" en la consola del servidor (`tail -f error.txt`). La observabilidad está instrumentada estáticamente por tres columnas:

1.  **Métricas (Metrics):** Agregados numéricos (e.g. Requests de Leads por minuto, % Uso de RAM Worker). Emitidas cada 10s al motor Prometheus/DataDog/Grafana.
2.  **Registros Analíticos (Logs):** Cadenas JSON estructuradas, emitidas únicamente en Excepciones (Errores HTTP 500) y Mutaciones de Catálogo B2C (Auditoría Administrativa).
3.  **Trazas Distribuidas (Traces - Optional):** Correlación de petición ID. Solo activables para transacciones pesadas como el *Image Upload* para diagnosticar cuellos de botella temporales en transcodificadores (SharpJS).

---

## 2. Telemetría Funcional B2B/B2C (RUM & Vitals)

AL13 transacciona gracias al rendimiento visual B2C y B2B.

### 2.1 Monitorización de Real-User-Metrics (RUM)
Se ancla un colector ligero (Vercel Analytics SDK / Cloudflare WebAnalytics) al Frontend para purgar las métricas "ideales" del computador del desarrollador y ver la **Realidad Genuina 4G/3G de Riohacha/Bogotá:**
*   **Target INP (Interaction to Next Paint):** $< 200ms$ (El usuario presiona y el CSS Quoter reacciona en validación sin ahogarse en WebGL).
*   **Target LCP (Largest Contentful Paint):** $< 2.5s$ (El héroe renderiza en pantalla limpia de `FOUC` para evitar la pérdida del interés de remoldeo primario). Si un $20\%$ de los visitantes cae fuera del límite inter-cuartil bueno de Google, salta alerta webhook al Slack/Discord del Equipo IT de que "Se dañó el LCP por subida de imagen ineficiente del CMS".

---

## 3. Protocolos Gubernamentales de Logging Interno (Server Side)

El Servidor Soberano usa un logger de la familia `Pino` (Node/Bun) que extruye objetos JSON planos ultra-rápidos:

### 3.1 Nivel "ERROR" y Escalado (On-Call Triggers)
El nivel de Error **DEBE** limitarse de forma drástica para evitar Alertas Fantasmas (Alert Fatigue).
*   *Condición Válida:* Pérdida de conectividad entre el Edge Worker y la DB Postgres (`CONNECTION_REFUSED_OR_TIMEOUT`). O bien, fallo del SMTP para despacho de email B2B a un arquitecto.
*   *Respuesta Sistema:* PagerDuty / Telegram Boot de guardia zumba y notifica de la caída al ingeniero *On-Call* principal.

### 3.2 Nivel "INFO" e Instrumentación de CMS
El nivel Info se reserva para auditoría mutacional del dueño. Si un vendedor se queja de un "precio incorrecto" de un baño, Recursos Humanos o el IT pueden revisar los JSON Logs:
```json
{
  "level": "info",
  "actor": "admin_uuid",
  "action": "UPDATE_PRODUCT",
  "target_slug": "division-bano-cristal-oro",
  "timestamp": "2026-02-21T18:40:02Z",
  "msg": "El precio base m2 fue modificado de 200000 a 250000 COP"
}
```

### 3.3 El Axioma Inviolable de Destrucción PII (Data Sanitization)
El equipo de Vps Node Backend, tiene pena máxima si hace logging accidental de la Tarjeta CRM del Contratista en sus terminales locales.
*   **Obligación Técnica Config:** El logger interno debe poseer un serializador (`redact: ['client_email', 'client_phone', 'client_name']`). El Log en consola de `POST /api/leads` cambiará el correo e.g `jorge@arquitectos.com` a `[REDACTED]` previniendo que DataDog o herramientas externas capturen el secreto nuclear del First-Party Data de Templados AL13.

## 4. Dashboards (Visualización Táctica Administrativa)
Para monitorear el pulso vital de la empresa, El DashBoard Grafana/Cloudflare Analytics dispondrá $4$ cajas grandes y limpias:
1.  **Taza de Éxito API (Success Rate):** Un dial $99.XX%$.
2.  **Requests rate (RPM B2B):** Tasa de consultas al cotizador. Si sube un 500% de la noche a la mañana $\rightarrow$ O hay Ads funcionando maravillas o un ruso está raspando la web (Scrapping Bot).
3.  **Tiempos de Cache (Hit vs Miss):** Verificando que $\ge 90\%$ del Tráfico estático CDN está pegando en Memoria Global (Hit) y no yendo al servidor local (Origin).

---
*Fin Documento de Visión Analítica SRE. The Architect-Scribe asila el error al nivel atómico y garantiza que el silencio y ceguera sistémica desaparezcan bajo 3 vectores logísticos pre-implantados.*


---

# SRE & Reliability Document

**Sistema:** Operaciones Base B2B Soberano (AL13)  
**Versión:** 1.0 (Service Level Strict Objectives)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Indicadores Fundamentales de Nivel de Servicio (SLIs)

La supervivencia del negocio digital se mide en cuatro métricas innegociables (SLIs):

1.  **Disponibilidad Frontend (Availability):** Ratio de respuestas HTTP 200/304 de Cloudflare CDN *versus* respuestas HTTP 5XX / Fallos de Conexión TLS en un marco móvil de 30 días continuos.
2.  **Rendimiento API CMS (Mutación de Inventario B2B):** Tiempos del Servidor Node / Go `POST` de P90 (El percentil 90 debe responder en el rango estipulado) medidos directo en el proxy perimetral WAF.
3.  **Rendimiento B2B Asíncrono (Quoter Lead Injection):** Éxito volumétrico vs Fallo 400 por Zod en la subrutina del Ingestor (`POST /internal/ingest`).
4.  **Tasa de Compresión Visual B2C (Storage Limit Hit rate):** Ratio de Archivos JPG $>$ 10 MB convertidos exitosamente a $>$ 250kb WebP (Exito asíncrono) sin matar por `Out-Of-Memory (OOM)` el worker transcodificador.

## 2. Objetivos de Nivel de Servicio (SLOs) Operacionales

Las aspiraciones corporativas llevadas al Contrato SRE:

*   **SLO-FRONTEND:** Disponibilidad dictatorial del **99.99%** (Four Nines). Logrado trivialmente porque el Frontend es Astro pre-compilado; su uptime depende de Global CDN, nunca del dueño reiniciando servidores. (Tolerancia a fallo máximo: $4 \text{ min } 22 \text{ segundos/mes}$).
*   **SLO-BACKEND-LEADS (CRM):** Disponibilidad de Ingesta del **99.9%** (Three Nines). Tolerancia de $\sim 43 \text{ min/mes}$.
*   **SLO-CMS-LATENCY (Tiros Lógicos):** El endpoint `/admin/*` **DEBE** arrojar un `TTFB` P95 $< 300ms$ (Round Trip Vps a Browser Administrador).

## 3. Presupuesto de Errores (Error Budget Pipeline-Locking)

Templados AL13 no despacha código nuevo ni features irrelevantes si el ecosistema está desangrando ventas. 
*   **Regla de Congelamiento (Feature Freeze):** Si el SLO de Backend Leads Cae a $99.8\%$ (Agotando el *Error Budget* estipulado de 43 minutos de caídas/bugs reportados), los desarrolladores o agentes humanos **Tienen Prohibido** empujar nuevo código estético (ej. Nuevos colores de Header, Animaciones). Toman el presupuesto restante y se concentran $\text{100%}$ en parchar el Reliability (Deuda Técnica / Fallas PostgreSQL).

## 4. Patrones de Resiliencia a Caídas L7 (Circuit Breakers)

No se puede evitar un sismo tectónico Cloud (Falla Cloudflare, Vandalismo DNS), pero sí se puede aislar el daño:

### 4.1 Retries Lineares de Lógica Frontal B2B
*   **Falla:** Arquitecto pulsa *Cotizar*, y la latencia 3G rural corta la llamada TCP por medio segundo.
*   **Mitigación Codeada:** El Fetch no asume muerte súbita. Se aplica Exponencial Backoff (`1s`, `2s`, `4s`) con 3 máximos intentos silenciosos por debouncer. Si todos fallan, se acciona la *Dead Letter Queue*: Se manda los datos `JSON` stringificados al `window.localStorage` con un toast *"Su red es débil, cotización guardada en recamarilla temporal"* para su re-disparo al momento de conexión.

### 4.2 Degradación de Servicios 3D de GPU (Failover Graceless)
*   **Falla:** Teléfono Samsung viejo ($\le$ 3GB RAM) trata de montar 2 canvas ThreeJS (WebGL) al mismo tiempo en el catálogo renderizando Maderato 4k. Muerte por ahogamiento OOM (Browser Crash Alert).
*   **Mitigación SRE:** `try {} catch(webglexception)`. El componente destruye instintivamente su hilo y renderiza `<img loading="lazy">`. Cero Crash Táctico (Failover Graceful Degradation activo).

---
*Fin Documentación SRE. Todo cambio a componentes transaccionales requerirá test de saturación y latencia asíncrona validado en pipeline para jamás romper estos Contratos SLIs.*


---

# Runbook / Operations Manual

**Sistema:** Tácticas de Emergencia B2B AL13 (The Playbook)  
**Versión:** 1.0 (Crisis Management Standard)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Operación Base (Conceptos Comunes)

Este manual de operaciones asume que los ingenieros On-Call no deben leer prosa de 10 páginas durante un ataque o caída. Las directrices aquí son binarias e imperativas.

### 1.1 Escalabilidad Escalera (On-Call Escapes)
*   **L1 Support (Automated Systems):** Cloudflare WAF, Supervisor de Node JS (PM2 / Systemd), Re-Tries de Base de datos. Intervienen solos al milisegundo.
*   **L2 Support (DevOps/SRE):** Interviene humana si los umbrales LCP SRE rebasan el umbral 3 horas o un DDoS Layer 7 quema el Gateway RUC. (Intervención remota).
*   **L3 Escalation:** Aislamiento Perimetral (Kill Switch), notificado al C-Level de Templados AL13 si hay impacto de Breach de CRM (First Party Data Fugada).

## 2. Procedimiento de Combate: Caída Absoluta del Backend DB
**Código de Emergencia:** `INCIDENT-B2B-DOWN`
**Síntoma Clave:** Los Arquitectos envían cotizaciones en la Isla B2B Quoter, el Frontend dice "Cargando..." pero el Endpoint `POST /api/leads` devuelve persistentemente `503 Service Unavailable` o `504 Gateway Timeout`. El servidor Central ha caído o Postgres colapsó.

### 2.1 Ejecución Perimetral
1.  **Detección (T+0):** PagerDuty alerta al On-Call sobre el spike de `50X Errors` en el endpoint de *leads*.
2.  **Aislamiento (T+1 min):** Ejecutar Regla WAF en Cloudflare Firewall (*Turnstile/Page Rule*): Enviar un *Bypass/Custom Response* HTTP 503 directo en el Edge para este endpoint específico, retornando al Front-End un Payload `{ "status": "maintenance" }`. El Quoter reaccionará congelando el formulario e indicando a los usuarios: *"Nuestros servidores experimentan alta latencia regional, reintente en 10 minutos"*. *Cero pérdida silenciosa.*
3.  **Remediación (T+5 min):** El Ingeniero entra a la VPS o Consola Backend. Lee el log JSON con Error de Pino logger.
    *   Si es Postgres Crash: Reiniciar demonio SystemD Database, o Re-hacer Scale de CPU.
    *   Si es un Pool Extenuado: Subir las conexiones Prisma/Postgres Connection Pooling a 200 temporalmente.
4.  **Recuperación (T+N min):** Liberar Regla WAF. Emular Inyección manual de Payload de prueba B2B.

## 3. Procedimiento de Combate: CiberAtaque Leak de PII (Leads Fugados)
**Código de Emergencia:** `INCIDENT-DATA-BREACH`
**Síntoma Clave:** Trazas externas o Cloudflare Data Logs reportan picos inmensos de lectura masiva del Endpoint SQL que extrae el listado de ventas (`GET /admin/leads`) pero las peticiones provienen de IPs enmascaradas con JWT extraños o tokens robados de una computadora de gerente AL13 comprometida.

### 3.1 Respuesta de Extirpación
1.  **Rotación Draconiana JWT (T+0):** El ingeniero accede a las variables Secretas en producción (`JWT_SECRET_KEY`) y la **SOBREESCRIBE INMEDIATAMENTE** con un string aleatorio de 64 caracteres.
2.  **Destrucción Masiva de Sesiones:** El proceso servidor *Hard Reloads* (Reinicia de Cero Node/Bun). **Todo los administradores son expulsados de las interfaces PWA/Admin Panels en $< 5s$** debido a "Invalid Signature Login" invalidando el Token Robado. Los hackers dejan de extraer data instantáneamente.
3.  **Filtrado WAF Regional (T+5 min):** Subir el Geobloqueo a `STRICT` (Bloquear temporalmente Tráfico por VPN u orígenes desde Rusia/China/Europa). AL13 es un negocio local en La Guajira Colombiana, el tráfico extra-continental no es comercial B2B. Bloqueo 403.
4.  **Auditoría Forense Pos-Crisis:** Leer tabla `Audit_Logs` para identificar exactamente qué IDs de clientes (`Client_uuid_P2`) lograron fugarse antes del corte JWT y preparar comunicado legal (Manejo Reputacional).

## 4. Procedimiento Menor: Overflow de CMS Storage (Disco Lleno S3)
**Síntoma Clave:** Al dueño publicando un "Aluminio Oro" de $4MB$ foto JPG en `/admin`, la UI se bloquea o retorna un error "S3 Quota Exceeded / 413 Payload Too Large".
*   **Acción 1:** Ampliar cuotas duras en proveedor de Storage (AWS R2 Billing Tiers / Supabase Storage Tier Limits).
*   **Acción 2 (Cortoplacista):** Ejecutar Sub-Rutina de Recompresión Automática Croneada `bun run prune-assets` para eliminar Orphans (Imágenes vírgenes descontinuadas de la tabla PostgreSQL cruzadas contra S3_files) y vaciar disco para liberar espacio operativo al Gerente en $10$ minutos.

---
*Runbook Finalizado. Los ingenieros no debaten protocolos. Si falla, el Runbook dicta Kill Switches puros y Rotación Criptográfica severa para evitar parálisis de análisis.*


---

# Testing Strategy Document

**Sistema:** Aseguramiento de Calidad Continua (QA/CI) AL13  
**Versión:** 1.0 (Test-Driven Specs)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
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


---

# 🧠 El Manual del Lead AI Engineer: Especialidad en Agentes Autónomos

> *"Un desarrollador Jr. teclea código. Un Senior diseña sistemas. Un Lead AI Engineer orquesta mentes (agentes) para que construyan sistemas por él."*

Bienvenido al manual oficial de entrenamiento de **Templados AL13**. Este documento rastrea el progreso de **Xavier (CEO & Lead AI)** desde los fundamentos de la orquestación de IA hasta la maestría de sistemas autónomos (*Agentic Development*).

---

## 🗺️ El Plan de Estudios (Roadmap de Ascenso)

La formación se divide en 5 niveles progresivos. Cada nivel tiene un concepto teórico fundamental y una **Práctica Real** que ejecutaremos sobre el código base de Templados AL13.

### 🟩 Nivel 1: El Product Manager Impulsado por IA (Dominando el Alcance)
*Objetivo: Aprender a hablarle a la IA no para escribir código, sino para definir problemas exactos.*
- [ ] **Teoría 1.1:** El Arte del Micro-Scope (Dividir funcionalidades gigantes en Historias de Usuario atómicas).
- [ ] **Teoría 1.2:** El PRD Perfecto (Generar Especificaciones de Producto que las IAs entiendan sin alucinar).
- [ ] 🎯 **Práctica AL13:** Convertir un requerimiento vago de Templados en un Mini-PRD usando nuestros prompts profesionales y documentarlo como una tarea real.

### 🟦 Nivel 2: El Arquitecto Asistido por IA (Diseño de Sistemas)
*Objetivo: Definir contratos, bases de datos y seguridad antes de tocar el teclado.*
- [ ] **Teoría 2.1:** Ingeniería de Contexto Limitado (Evitar la saturación de memoria de la IA usando RAG manual).
- [ ] **Teoría 2.2:** Generación de TDDs (Technical Design Documents) asistídos por IA (Diagramas Mermaid, Esquemas JSON).
- [ ] 🎯 **Práctica AL13:** Diseñar la base de datos de "Catálogo de Productos" y el esquema de la API para Templados.

### 🟪 Nivel 3: El Director de Orquesta (Engineering & TDD)
*Objetivo: Dirigir la construcción del software usando pruebas como tu única herramienta de control.*
- [ ] **Teoría 3.1:** El Bucle Red-Green-Refactor Asistido (Exigir pruebas antes de implementaciones).
- [ ] **Teoría 3.2:** Code Review Robotizado (Auditar el código escrito por un Agente IA contra los estándares de AL13).
- [ ] 🎯 **Práctica AL13:** Ordenar la creación de un componente "Hero Section" interactivo (Svelte/Astro + Tailwind) usando TDD estricto y sin escribir una línea de código manual.

### 🟧 Nivel 4: Automatización y Estándar Big Tech (Skills & MCP)
*Objetivo: Dejar de dar instrucciones repetitivas y empezar a crear "Herramientas" (Skills).*
- [ ] **Teoría 4.1:** Creación de Skills Personalizadas (Convertir flujos de trabajo repetitivos en automatizaciones versionadas en `.agents/workflows/`).
- [ ] **Teoría 4.2:** Model Context Protocol (MCP) (Conectar servidores MCP a los agentes para que interactúen con bases de datos en vivo, Slack, o Firecrawl).
- [ ] 🎯 **Práctica AL13:** Implementar o configurar un Servidor MCP para que la IA consulte el esquema real de la base de datos de desarrollo de Templados.

### 🟥 Nivel 5: El Mantenedor del Caos (Sistemas Auto-recuperables)
*Objetivo: Observar cómo el sistema resuelve sus propios problemas.*
- [ ] **Teoría 5.1:** Protocolos de Cierre e Incidencias (Investigación de Root Cause Analysis por IA).
- [ ] **Teoría 5.2:** Documentación Viva (The Scribe Protocol - Asegurar trazabilidad de cada línea de código inyectada por la IA).
- [ ] 🎯 **Práctica Final AL13:** Depurar un "bug" (inducido o real) en Templados, usar la IA para encontrar la causa, proponer el parche (PR) y redactar el Postmortem del incidente automáticamente.

---

## 🚀 Progreso de Entrenamiento

- **Rango Actual:** Recluta (Iniciando Nivel 1)
- **Mentor IA Asignado:** Antigravity (Director de Agentes)
- **Última Actualización:** 21 de Febrero, 2026

*Instrucciones para Antigravity:* Al completar cada lección y práctica exitosamente junto a Xavier, debes venir a este archivo y marcar la casilla `[x]` correspondiente, actualizando el "Rango Actual" según el avance.


---

# Incident Postmortem Document

**Sistema:** Ecosistema Base (AL13 Backend / Frontend)  
**Versión:** 1.0 (Blameless Root Cause Analysis)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Meta-Protocolo Postmortem (Blameless Standard)
El objetivo de reportar caídas y Bugs en AL13 nunca es despedir a un Ingeniero o Vendedor que apretó el botón equivocado en el CMS. El enfoque culpa a la **Fragilidad del Sistema** (La Máquina lo permitió). Un incidente es un regalo de telemetría que expone deuda técnica oculta.
Este documento **SE DEBE** llenar en un plazo no mayor a $48 \text{ Horas}$ (En caliente temporal) tras restablecer el SLA de Operación.

---

## 2. Plantilla de Operación Póstuma (Postmortem Template)

Todo incidente severo (Caída $> 5 \text{ min}$, Robo de JWT, Fuga PII de Leads) debe instanciar una copia exacta de esta base:

### 2.1 Resumen Ejecutivo (Executive Summary)
*   **Título del Incidente:** [Ej. Falla OOM en Safari B2C al Cargar 3D]
*   **Fecha y Duración (UTC-5 Colombia):** [Inicio del corte] hasta [Restablecimiento Total]. Total: [Minutos]
*   **Nivel de Severidad:**  [SEV-1 (Critico), SEV-2 (Grave), SEV-3 (Menor)]
*   **Impacto de Negocio:** [Ej: 15 arquitectos rebotados con error 500 al cotizar].
*   **Líder Respondedor (Incident Commander):** [Nombre del Ingeniero/Líder IT on-call].

### 2.2 Cronología de Intervención (The Timeline)
Se deben usar las métricas SRE de DataDog/Cloudflare exactas, sin aproximaciones.
*   **[2026-06-15 14:02]** - El Sistema Automático Prometheus/Cloudflare emite PagerDuty por "HTTP 502 Bad Gateway" persistente en el Backend CMS Node.
*   **[2026-06-15 14:05]** - El Líder entra al Server SSH. `tail -n 100` expone que el recolector de Garbage Collection de V8 está fallando ("JavaScript heap out of memory").
*   **[2026-06-15 14:08]** - [Acción de Remediación Corta] Se reinicia forzosamente el cluster con `pm2 restart all`. Servicio restablecido. Vuelven a caer las cotizaciones B2B.

### 2.3 Análisis de Causa Raíz (Root Cause Analysis - Los 5 Porqués)

*El framework de interrogación profunda que erradica el parche y fomenta la cura:*
1.  **¿Por qué cayó el Backend con 502/OOM?**
    Porque el servidor Node/Bun llenó su RAM asignada (1GB de contenedor Docker) de golpe durante un Post de AL13 Admín.
2.  **¿Por qué se ahogó la RAM?**
    Porque la subrutina del Ingestor `SharpJS/Ffmpeg` intentó cargar directamente a Buffer un JPG gigantesco ($45 MB$ - 150 Megapixeles) que subió el celular de Alta Gama del Gerente General, expandiéndose a un bitmap sin comprimir Giga-Pesado in-memory.
3.  **¿Por qué un archivo de 45MB llegó intacto a golpear la RAM del servidor transaccional?**
    Porque el Frontend *Pre-Signed URL* de Subida o el WAF de Cloudflare estaban configurados para permitir `$100\text{MB}$` de `max_body_size`. El Runbook decía $15\text{MB}$, pero el NGINX/Edge Config no aplicaba ese estrangulamiento.
4.  **¿Por qué la Config Edge no estaba alineada con el límite SRE dictado en Especificación Técnica (Tech Spec V1.0)?**
    Porque la variable `CLOUDFLARE_MAX_UPLOAD` nunca se migró a `.env.production` en el último release de infraestructura (Fallo DevOps Pipeline).
5.  **¿Por qué el Pipeline permitió un merge a Main sin esa variable?**
    Porque el Test (Vitest) no instanció un `E2E Upload Payload Test` simulando un paquete gordo de $50MB$ rebotado (Fallo Cobertura TDD Branch en el componente de subidas).

*(Fin del Análisis. La culpa nunca fue del Gerente tomando la foto en $8K$. El CI/CD Pipeline falló al no imponer la dieta de bytes).*

### 2.4 Matriz de Acción Reparativa (Action Items)

Convertimos el *Root Cause* a Tareas de GitHub inmutables (Jira Tickets / Issues).

| Acción Core | Responsable (Issue ID) | Estatus | Prevención Definitiva (Hard-Cure) |
| :--- | :--- | :--- | :--- |
| Parche Pipeline | DevOps AI (#42)  | **[DONE]** | Escribir Test E2E de Playwright subiendo `$50MB\text{ .gltf}` afirmando que tira código 413 Payload Too Large. |
| Hard-Clamp API| Core Backend (#43)| **[TODO]** | Enforzar un Zod schema intermedio `fileSize < 15MB` antes de pasar el stream al Encoder SharpJS temporal. |
| Memory Alert| SRE Monitor (#44)| **[WIP]** | Alterar Prometheus Alarm si la Heap V8 cruza el $85\%$ de uso, notificando On-Call $5$ minutos *antes* de que colapse, para un auto-scaling o kill seguro limpio (`Graceful Shutdown`). |

### 2.5 Resumen de Lecciones Aprendidas de Arquitectura
Toda crisis mejora el *Monorepo AL13*. En este caso: Enseñar al agente IA (o humano) que NodeJS Buffer Allocation es letal para procesar media masiva (Imágenes crudas). Confirmando que la Decisión Técnica 3.1 ($ADR_PreSignedS3$) es correcta y jamás debemos saltarnos S3 Direct Upload por pasar Binarios gordos en tuberías estrechas transaccionales.

---
*Fin Documentación Incident Postmortem. El ecosistema es un ente vivo. Si no duele, no se adapta. Las autopsias se documentan y alimentan al agente IA.*


---

# BigTech Software Documentation Framework


Framework taxonómico de documentación profesional para desarrollo de software de alta complejidad e ingeniería de sistemas de misión crítica.

---

# 1. Product Vision Document (PVD)

Extensión aproximada: **3–6 páginas**

## Propósito
Define la visión del producto y el problema que se desea resolver.

## Contenido

### 1.1 Resumen ejecutivo
- descripción del producto
- propuesta de valor
- mercado objetivo

### 1.2 Problema del mercado
- problema actual
- evidencia del problema
- impacto económico o social

### 1.3 Oportunidad
- tamaño del mercado
- tendencias

### 1.4 Usuarios objetivo
- segmentos
- necesidades principales

### 1.5 Propuesta de valor
- qué cambia para el usuario
- beneficios clave

### 1.6 Diferenciación
- comparación con soluciones existentes

### 1.7 Objetivos estratégicos
- objetivos a 1–3 años

### 1.8 Métricas de éxito
- métricas de negocio

### 1.9 Riesgos estratégicos

---

# 2. Product Requirements Document (PRD)

Extensión aproximada: **15–25 páginas**

## Propósito
Definir qué debe hacer el producto.

## Contenido

1. Introducción
2. Contexto del problema
3. Objetivos del producto
4. Stakeholders
5. Personas de usuario
6. User journeys
7. Casos de uso
8. Funcionalidades principales
9. Requisitos funcionales
10. Requisitos no funcionales
11. Reglas de negocio
12. Flujos de usuario
13. Métricas del producto
14. KPIs
15. Dependencias
16. Supuestos
17. Riesgos
18. Fuera de alcance
19. Roadmap inicial

---

# 3. RFC — Request for Comments

Extensión aproximada: **5–15 páginas**

## Propósito
Proponer cambios técnicos o arquitectónicos antes de su implementación.

## Contenido

1. Título
2. Autor
3. Fecha
4. Estado
5. Resumen
6. Motivación
7. Problema
8. Solución propuesta
9. Arquitectura preliminar
10. Alternativas consideradas
11. Impacto
12. Riesgos
13. Plan de implementación
14. Plan de migración

---

# 4. User Stories Document

Extensión aproximada: **5–10 páginas**

## Formato

Como **[tipo de usuario]**  
Quiero **[acción]**  
Para **[beneficio]**

## Cada historia debe incluir

- ID
- Título
- Descripción
- Criterios de aceptación
- Prioridad
- Estimación
- Dependencias
- Notas técnicas

Ejemplo

Story ID: US-001  
Título: Registro de usuario  

Historia:  
Como usuario nuevo  
quiero crear una cuenta  
para acceder a la plataforma

Criterios de aceptación

- El usuario puede registrarse con email
- El sistema valida el email
- El sistema envía confirmación

---

# 5. Software Requirements Specification (SRS)

Extensión aproximada: **20–40 páginas**

## Contenido

### Introducción
- propósito
- alcance
- definiciones

### Descripción general
- perspectiva del producto
- funciones del sistema
- usuarios

### Requisitos funcionales

### Requisitos no funcionales

### Interfaces externas

- APIs
- interfaces de usuario
- hardware

### Restricciones del sistema

### Supuestos

---

# 6. Architecture Document

Extensión aproximada: **10–20 páginas**

## Contenido

### Arquitectura general

### Estilo arquitectónico

- Monolith
- Microservices
- Event-driven
- Serverless

### Componentes del sistema

### Interacciones

### Flujos de datos

### Escalabilidad

### Alta disponibilidad

### Tolerancia a fallos

---

# 7. Software Design Document (SDD)

Extensión aproximada: **20–40 páginas**

## Contenido

1. Introducción
2. Arquitectura del sistema
3. Descripción de componentes
4. Interfaces entre módulos
5. Modelo de datos
6. Diseño de base de datos
7. Diseño de APIs
8. Integraciones externas
9. Manejo de errores
10. Seguridad
11. Performance
12. Escalabilidad
13. Observabilidad
14. Logging
15. Monitoreo
16. Estrategia de caché
17. Estrategia de colas
18. Gestión de configuración
19. Estrategia de despliegue
20. Riesgos técnicos

---

# 8. Technical Specification (Tech Spec)

Extensión aproximada: **10–20 páginas**

## Contenido

1. Objetivo técnico
2. Arquitectura detallada
3. Componentes
4. APIs
5. Modelo de datos
6. Algoritmos
7. Performance esperado
8. Plan de implementación

---

# 9. Architecture Decision Records (ADR)

Extensión aproximada: **1–2 páginas por decisión**

## Propósito
Registrar decisiones arquitectónicas importantes.

## Estructura

Título  
Fecha  
Estado  

Contexto  
Problema que se intenta resolver.

Decisión  
La solución adoptada.

Consecuencias  
Impacto positivo y negativo.

Alternativas consideradas

---

# 10. System Diagrams

Extensión aproximada: **5–15 páginas**

## Tipos de diagramas

### C4 Model

- Context Diagram
- Container Diagram
- Component Diagram
- Code Diagram

### UML

- Sequence diagrams
- Use case diagrams
- Activity diagrams

### Otros

- Data flow diagrams
- Deployment diagrams

---

# 11. API Specification

Extensión aproximada: **10–25 páginas**

Generalmente definida usando **OpenAPI / Swagger**.

## Contenido

- Base URL
- Autenticación
- Endpoints
- Parámetros
- Request schema
- Response schema
- Códigos de error
- Rate limiting
- Ejemplos de uso

---

# 12. Data Model Document

Extensión aproximada: **5–15 páginas**

## Contenido

- Entidades
- Atributos
- Relaciones
- Diagramas ER
- Índices
- Estrategias de partición
- Migraciones
- Integridad de datos

---

# 13. Security Design Document

Extensión aproximada: **5–10 páginas**

## Contenido

1. Modelo de amenazas
2. Autenticación
3. Autorización
4. Protección de datos
5. Encriptación
6. Gestión de secretos
7. Protección contra ataques
8. Cumplimiento normativo

---

# 14. Testing Strategy Document

Extensión aproximada: **5–10 páginas**

## Contenido

### Tipos de pruebas

- Unit testing
- Integration testing
- End-to-end testing
- Performance testing
- Security testing

### Herramientas

### Cobertura esperada

### Pipeline de pruebas

---

# 15. DevOps / Deployment Document

Extensión aproximada: **5–10 páginas**

## Contenido

### Infraestructura

### Pipeline CI/CD

### Entornos

- Development
- Staging
- Production

### Estrategias de despliegue

- Blue/Green
- Rolling
- Canary

### Gestión de configuración

### Automatización

---

# 16. Observability Document

Extensión aproximada: **4–8 páginas**

## Contenido

- Logging
- Monitoring
- Métricas
- Alertas
- Dashboards
- Distributed tracing
- SLO / SLA

---

# 17. Reliability / SRE Document

Extensión aproximada: **5–10 páginas**

## Contenido

### Service Level Indicators (SLI)

- Latencia
- Tasa de errores
- Disponibilidad
- Throughput

### Service Level Objectives (SLO)

Ejemplo

Disponibilidad: **99.9%**

### Error budgets

### Estrategias de resiliencia

- Circuit breakers
- Retries
- Timeouts

### Failover

- Multi-region
- Active-active
- Active-passive

### Capacity planning

---

# 18. Runbook / Operations Manual

Extensión aproximada: **5–10 páginas**

## Contenido

1. Operación del sistema
2. Procedimientos de mantenimiento
3. Manejo de incidentes
4. Escalamiento
5. Recuperación ante fallos
6. Procedimientos de emergencia

---

# 19. Incident Postmortem

Extensión aproximada: **2–4 páginas**

## Contenido

- Resumen del incidente
- Impacto
- Línea de tiempo
- Causa raíz
- Acciones correctivas
- Acciones preventivas
- Lecciones aprendidas

---

# 20. Coding Standards Document

Extensión aproximada: **3–6 páginas**

## Contenido

- Convenciones de naming
- Estructura de carpetas
- Manejo de errores
- Logging
- Documentación del código
- Code review guidelines

---

# 21. Engineering Guidelines

Extensión aproximada: **5–10 páginas**

## Contenido

### Principios de ingeniería

- simplicidad
- mantenibilidad
- escalabilidad

### Principios de diseño

- SOLID
- Clean Architecture
- Domain-Driven Design

### Gestión de deuda técnica

---

# 22. DevOps Infrastructure Document

Extensión aproximada: **5–10 páginas**

## Contenido

- Arquitectura de infraestructura
- Entornos
- CI/CD
- Gestión de secretos
- Infraestructura como código

---

# 23. Data Governance Document

Extensión aproximada: **5–10 páginas**

## Contenido

- Gestión de datos
- Calidad de datos
- Retención de datos
- Privacidad
- Cumplimiento

---

# 24. Product Roadmap

Extensión aproximada: **3–6 páginas**

## Contenido

- Fases del producto
- Releases
- Hitos
- Prioridades
- Dependencias

---

# 25. Repository Documentation (README)

Extensión aproximada: **2–4 páginas**

## Contenido

- Descripción del proyecto
- Instalación
- Configuración
- Ejecución
- Testing
- Contribución
- Licencia

---

# Estructura profesional del repositorio


 docs/

product/  
vision.md  
prd.md  
user-stories.md  
05_Product_Roadmap.md
06_Master_Backlog_Epics.md
07_Granular_Backlog_Execution.md

architecture/  
architecture.md  
system-design.md  
diagrams.md

design/  
sdd.md  
tech-spec.md

rfc/  
rfc-001.md  
rfc-002.md

adr/  
adr-001.md  
adr-002.md

api/  
openapi.yaml  
api-spec.md

data/  
data-model.md  
data-governance.md

security/  
security-design.md

testing/  
testing-strategy.md

devops/  
deployment.md  
infrastructure.md

operations/  
runbook.md  
observability.md  
sre-reliability.md

incidents/  
postmortem-template.md

engineering/  
coding-standards.md  
engineering-guidelines.md

training/
01_Manual_Lead_AI_Engineer.md

README.md 


Tamaño total típico de documentación  
  
| Documento | Páginas aproximadas |  
|-----------|---------------------|  
 

Vision | 3–6 |  
PRD | 15–25 |  
RFC | 5–15 |  
User Stories | 5–10 |  
SRS | 20–40 |  
Architecture | 10–20 |  
SDD | 20–40 |  
Tech Spec | 10–20 |  
ADR | 1–2 por decisión |  
API | 10–25 |  
Data Model | 5–15 |  
Security | 5–10 |  
Testing | 5–10 |  
DevOps | 5–10 |  
Observability | 4–8 |  
SRE | 5–10 |  
Runbook | 5–10 |  
Postmortem | 2–4 |  
Coding Standards | 3–6 |  
Engineering Guidelines | 5–10 |  
Roadmap | 3–6 |  
  
---  
  
# Tamaño total estimado  
  
Un sistema serio bien documentado puede tener aproximadamente:  
  
**150 – 300 páginas de documentación técnica.**
