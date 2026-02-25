# API Specification Document

**Subsistema:** Backend Soberano CMS / CRM (Templados AL13)  
**Versión:** 1.0 (OAS 3.0 - OpenAPI Compliant)  
**Fecha:** Febrero 2026  

**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Definición del Servidor Base (Base URL & Environments)

Las APIs de Templados AL13 se dividen en dos Redes de Frontera (Edge Networks), protegiendo la carga de Base de datos:

*   **Production Environment (Edge-Cached):** `https://api.templados-al13.com/v1`
*   **Staging/Development API:** `https://staging.api.templados-al13.com/v1`

## 2. Esquema de Autenticación Central (Security Flow)

### 2.1 Peticiones B2B Puras (Public Edge)
Las peticiones generadas por clientes transaccionales en la capa Frontend no requieren Autenticación previa (No JWT). Se validan mediante un **Challenge Anti-Bot** y límite de tasa HTTP (Rate Limiting) de $5 \text{ requests / minuto}$ por IP (Cloudflare WAF).

### 2.2 Peticiones Administrativas (Admin CMS Panel)
*   **Mecanismo (GoTrue):** `Bearer JWT Header` gestionado obligatoriamente por **Supabase Auth (GoTrue)**. Se prohíbe el desarrollo de estrategias JWT manuales o "artesanales" en Node.js.
*   **Validación Criptográfica:** El desencriptado de la firma de token queda delegado directamente al cliente servidor de Supabase o las RLS de PostgreSQL.
*   **Persistencia de Sesión (SSR):** Los tokens Access y Refresh **DEBEN** transportarse en headers vía el estándar `@supabase/ssr` forzando inserción en Cookies (`HttpOnly; Secure; SameSite=Strict`) para ser leídos por Astro.
*   **Request Header Format:** `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...` (Supabase nativo).

---

## 3. Catálogo de Endpoints de Dominio (Router Map)

### 3.1 Módulo [Leads] Ingestión de Motor B2B
Endpoint Crítico para la captura de First-Party Data y cotizaciones.

#### `POST /leads/ingest`
*   **Descripción:** Recibe el payload encriptado desde el motor parametrizado SPA. Escribe directamente en la Base CRM.
*   **Autorización:** None / Captcha Challenge Oculto.
*   **Rate Limit:** $5 \text{ requests} \times \text{minuto} \times \text{IP}$.

**Request Body (application/json):**
```json
{
  "client_name": "Luis Arquitecturas",
  "client_email": "luis@arqlocal.com",
  "client_phone": "3001234567",
  "segment": "B2B_ARCHITECT",
  "product_interest_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "dimensions": {
    "width_mm": 2400,
    "height_mm": 2100,
    "system_ref": "AL-5020_SLIDE"
  }
}
```

**Responses (Respuestas Determinísticas):**
*   🟢 **`201 Created`**:
    ```json
    { "success": true, "lead_id": "8b36-42d9", "message": "Lead acknowledged. CRM trigger fired." }
    ```
*   🔴 **`400 Bad Request`** (Validación Zod fallida / Injection SQL evitada):
    ```json
    { "success": false, "error": "VALIDATION_FAILED", "path": "dimensions.width_mm", "message": "Expected integer <= 6000" }
    ```
*   🔴 **`429 Too Many Requests`** (Abuso DDoS B2B):
    ```json
    { "success": false, "error": "RATE_LIMIT_EXCEEDED" }
    ```

---

### 3.2 Módulo [CMS] Administración de Activos (Sovereign Storage)
Endpoint para otorgar Soberanía de Publicación a la Gerencia.

#### `GET /cms/storage/presign`
*   **Descripción:** Genera una firma temporal HMAC válida por 5 minutos para que el Panel del Cliente pueda subir ficheros masivos (`.GLB` 3D o `JPG`) directamente al AWS S3 / Cloudflare R2 sin engatillar el Backend Node/PHP.
*   **Autorización:** `Bearer JWT` (Requerido: Rol Administrador).

**Query Parameters:**
*   `file_name=` (string): `fachada.jpg`
*   `content_type=` (string): `image/jpeg`

**Responses:**
*   🟢 **`200 OK`**:
    ```json
    {
      "success": true,
      "upload_url": "https://al13-bucket.s3.amazon.com/fachadas.jpg?X-Amz-Signature=b74e9...",
      "expires_in_seconds": 300,
      "key": "fachadas.jpg"
    }
    ```
*   🔴 **`403 Forbidden`** (Intento de Hackeo de Administrador JWT Expirado): Despacha el HTTP sin cuerpo JSON adicional para no filtrar trazas.

#### `POST /cms/products`
*   **Descripción:** Inserta un nuevo producto de archivo transaccional y dispara la recompilación masiva del HTML Estático mundial de Cloudflare (SSG Revalidate).
*   **Autorización:** `Bearer JWT`.

**Request Body (application/json):**
```json
{
  "name": "División de Baño Aluminio Oro",
  "slug": "division-bano-oro",
  "description": "Vidrio 8mm templado. Rodamiento suave.",
  "system_type": "Corrediza",
  "base_price_sqm": 250000.00,
  "media_key": "fachadas.jpg",
  "has_3d_model": false
}
```

**Responses:**
*   🟢 **`202 Accepted`**:
    ```json
    { "success": true, "product_id": "a716-4466", "ssg_trigger": "QUEUED" }
    ```
    *(Nota: Devuelve 202 porque el disparador de compilación HTML de Astro toma $\ge 30 \text{ segundos}$, es un evento diferido).*
*   🔴 **`409 Conflict`**: (Slug del producto ya existe URL SEO idéntica).

---
*Fin Documentación API. Toda nueva función requiere especificación explícita de códigos de respuesta HTTP y contrato tipado para la compilación de SDKs.*
