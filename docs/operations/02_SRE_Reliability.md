# SRE & Reliability Document

**Sistema:** Operaciones Base B2B Soberano (AL13)  
**Versión:** 1.0 (Service Level Strict Objectives)  
**Fecha:** Febrero 2026  

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
