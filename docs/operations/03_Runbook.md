# Runbook / Operations Manual

**Sistema:** Tácticas de Emergencia B2B AL13 (The Playbook)  
**Versión:** 1.0 (Crisis Management Standard)  
**Fecha:** Febrero 2026  

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
