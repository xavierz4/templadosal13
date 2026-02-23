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
