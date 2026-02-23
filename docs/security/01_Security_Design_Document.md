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

### 2.1 Cadena de Certificados y Sesión (Supabase Auth / GoTrue)
El sistema **NO** desarrollará flujos de autenticación artesanales. Se impone el uso dictatorial de **Supabase Auth (GoTrue)** para anular vectores de ataque por malas prácticas de encriptación humana.
*   **Contraseñas en Reposo (Identity Provider):** El hashing criptográfico (salting) se delega íntegramente al motor blindado C-Level integrado genéricamente por Supabase en su esquema duro relacional `auth.users`.
*   **Interacciones JWT de Sesión (Astro SSR):**
    1.  `Intercambio Seguro`: Se debe operar con la directiva oficial del SDK SSR (`@supabase/ssr`) para interceptar la sesión fuera del cliente Javascript reactivo.
    2.  `Cookies Estrictas`: El Access Token y Refresh Token se inyectan en el ecosistema Edge con los marcadores absolutos `Set-Cookie: HttpOnly; Secure; SameSite=Strict`. El comportamiento por defecto del cliente SPA de Supabase (inyección libre del JWT en `localStorage`) **DEBE** inhabilitarse preventivamente (`auth.storageKey` en `null` o equivalente) previniendo en todo momento el secuestro XSS.

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
