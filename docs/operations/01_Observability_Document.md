# Observability Document

**Sistema:** Telemetría B2B y Auditoría del CMS AL13  
**Versión:** 1.0 (Zero-Blind-Spot Protocol)  
**Fecha:** Febrero 2026  

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
