# User Stories Document (USD)

**Proyecto:** Plataforma de Generación de Demanda y Operación Autónoma - Templados AL13  
**Versión:** 1.0 (Especificación Ejecutable BDD)  
**Fecha:** Febrero 2026  

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

### US-103: Gestión Integral del Catálogo (CRUD de Productos)
**Como** Administrador de Templados AL13  
**Quiero** crear, editar y deshabilitar referencias de perfiles y accesorios en el sistema CMS  
**Para** mantener el inventario público B2C y los parámetros B2B sincronizados con la realidad de los proveedores sin pedir cambios de código.

*   **Prioridad:** Alta (P1) | **Estimación:** 5 Story Points
*   **Dependencias:** Base de Datos Relacional (PostgreSQL), On-Demand Revalidation Webhook.

**Criterios de Aceptación (Gherkin/BDD Executable):**
```gherkin
Feature: CMS Catalog Mutation
  Scenario: Actualización de Parámetros B2B
    Given el usuario administrador se encuentra en "/admin/catalogo/editar/perfil-5020"
    When modifica el campo "Precio Base M2" de "150000" a "160000"
    And hace clic en "Actualizar Producto"
    Then el Backend valida el JWT de la sesión
    And emite un comando UPDATE seguro (Sanitizado) a la tabla "inventory_products"
    And dispara el webhook interno de revalidación SSG para Cloudflare Edge
    And el catálogo público muestra el nuevo precio instantáneamente (LCP preservado).
```

### US-104: Operación Local del CRM (Gestor de Pipeline)
**Como** Empleado Comercial / Vendedor de Templados AL13  
**Quiero** visualizar una lista interactiva de los leads B2B crudos que llegan desde la calculadora periférica  
**Para** contactarlos, registrar acuerdos físicos y cambiar su estado en el embudo (Kanban) hacia "Cerrado Ganado".

*   **Prioridad:** Alta (P1) | **Estimación:** 8 Story Points
*   **Dependencias:** Endpoint de Mutación de Estado `/api/secure/lead/:id`, UI de Tablero.

**Criterios de Aceptación (Gherkin/BDD Executable):**
```gherkin
Feature: CRM Pipeline Management
  Scenario: Promoción de Lead de "Nuevo" a "Cotizado"
    Given el vendedor ingresa a "/admin/crm"
    And detecta un Lead bajo la columna "NEW" con el email "hector@arq.com"
    When hace clic sobre la tarjeta de Héctor y selecciona "Cambiar Estado -> COTIZADO"
    Then la interfaz ejecuta una petición PATCH asíncrona hacia el Backend Soberano
    And la base de datos mueve el `status` de 'NEW' a 'QUOTED'
    And el tablero reordena visualmente la tarjeta hacia la columna correcta sin hacer un "Full Page Reload".
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

### US-304: Filtrado de Catálogo Público Dinámico
**Como** Consumidor B2C visitante de templados-al13.com  
**Quiero** filtrar el listado visual de obras arquitectónicas mediante categorías clave (Ej: "Sistemas Corredizos", "Espejos")  
**Para** encontrar opciones de diseño específicas para mi próxima remodelación en La Guajira en segundos.

*   **Prioridad:** Media (P2) | **Estimación:** 3 Story Points
*   **Dependencias:** Estado local de Astro/NanoStores, URL Query Params.

**Criterios de Aceptación (Gherkin/BDD Executable):**
```gherkin
Feature: B2C Client-Side Filtering
  Scenario: Conmutación de Catálogo Instantánea sin Renderizado Completo
    Given el usuario se encuentra en la URL principal estática "/catalogo"
    And visualiza 20 tarjetas de proyectos mixtos (Plegables, Batientes)
    When presiona el botón de filtro rápido "Sistemas Batientes"
    Then la URL de la página muta silenciosamente a "/catalogo?categoria=batiente"
    And las tarjetas que no corresponden a esta categoría se desvanecen (Opacity transition CSS) a "display: none"
    And ningún archivo HTML base o script pesado es re-descargado desde Edge (zero-latency filtering).
```

---
*The Scribe V2.0 dictamina que este conjunto de historias encapsula el core operativo atípico e hiper-eficiente de La Guajira 2026. Al enviar estas historias a The Coder, la arquitectura de Astro y Supabase/PostgreSQL quedará validada por diseño de prueba.*
