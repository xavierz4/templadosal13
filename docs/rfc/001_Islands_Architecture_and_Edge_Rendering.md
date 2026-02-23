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
