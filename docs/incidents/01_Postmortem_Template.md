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
