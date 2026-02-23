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