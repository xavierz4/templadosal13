# Engineering Guidelines Document

**Sistema:** Principios C-Level de Ingeniería (Ecosistema AL13)  
**Versión:** 1.0 (Simplicity & Domain Rule)  
**Fecha:** Febrero 2026  

**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Principios Reactores de Ingeniería (Core Philosophies)

Cualquier arquitectura, módulo o refactor propuesto para el CRM/CMS de AL13 o su Frontend 3D debe orbitar los siguientes mandatos:

### 1.1 Simplicidad Despiadada (KISS & YAGNI)
*"Keep It Simple, Stupid"* & *"You Aren't Gonna Need It"*.
*   **Axioma:** La complejidad de un código cuesta dinero en mantenimiento mensual. Prohibido añadir abstracciones, librerías monstruosas (Ej: Redux Global o Apollo GraphQL) o Microservicios distribuidos por Kubernetes si el requerimiento de negocio se satisface al 100% con un servidor crudo Serverless Fetch o una base **Supabase (PostgreSQL)** indexada nativamente.
*   **Penalización:** La sobreingeniería intencional sin un ADR justificativo (Ver Doc #9) es causa inmediata de rechazo de PR.

El código de AL13 no se organiza por "Tipos de Archivos" arcaicos (e.g. `controllers/`, `views/`, `models/`), sino bajo la estricta **Hexagonal-Sovereign Architecture (HSA)**. La carpeta `src/` opera como un búnker estructurado en **4 Dominios Absolutos**:
*   📁 **`core/`**: El núcleo de infraestructura (Ej: Tematización global de Tailwind, esquemas Zod, utilidades de base de datos Supabase).
*   📁 **`shared/`**: Componentes visuales y lógicos universales (Ej: Layout maestro, Botones base, formato de fechas).
*   📁 **`modules/`**: Los islotes de negocio aislados (`QuotingB2B`, `CmsAdmin`). Agrupan validadores de presión, pesos matemáticos y modelos visuales UI WebGL.
*   📁 **`pages/`**: Las rutas de Next.js/Astro (`index.astro`, `/api`) que actúan como integradores de módulos, pero **tienen terminantemente prohibido albergar lógica de negocio pura**.
*   *Mandato:* Si un agente de IA o desarrollador humano intenta crear una carpeta ajena a estas 4 (ej. `src/utils` o `src/services`), el Pull Request será considerado hostil y rechazado en el acto.

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
