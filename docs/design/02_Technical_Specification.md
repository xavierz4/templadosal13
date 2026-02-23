# Technical Specification (Tech Spec)

**Módulo Central:** Motor Paramétrico (Quoter) & Ingestor CMS de Medios.  
**Versión:** 1.0 (Especificación de Vuelo)  
**Fecha:** Febrero 2026  
**ESTADO DID:** `[DID_CERTIFIED]`  
**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Objetivo Técnico (Technical Objective)
Dotar al Core B2B de Templados AL13 de un motor condicional determinista. El Frontend calculará la validez estructural de la perfilaría, mientras que el Backend orquestará exclusivamente las inyecciones de base de datos seguras y transcodificación de imágenes asíncronas para el CMS, salvaguardando los recursos del CPU en Vps / Cloudflare Workers.

## 2. API de Ingestión Front-To-Back (Quoter Payload)

### 2.1 Esquema Transaccional B2B (TypeScript)
El esquema TypeScript inferido por Zod/Joi para el endpoint de recepción B2B `/api/internal/ingest`:

```typescript
// Schema de Ingestión Estricto V1.0 - Zod Compliant
export const LeadIngestSchema = z.object({
  clientData: z.object({
    role: z.enum(["ARCHITECT", "BUILDER", "HOMEOWNER"]),
    fullName: z.string().min(3).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^\+?([0-9]{10,14})$/, "Invalid LatAm format")
  }),
  parametricConfig: z.object({
    width_cm: z.number().int().positive().max(600), // Max 6 metros
    height_cm: z.number().int().positive().max(350), // Max 3.5 metros (Piso-Techo)
    glassTypeId: z.string().uuid(), // Referencia DB: 8mm Incoloro, Vidrio Laminado
    profileSystemId: z.enum(["5020_SLIDER", "7038_SLIDER", "8025_SWING"])
  }),
  timestamp: z.string().datetime()
});
```
*Mandamiento Técnico:* Si un B2B emite `width_cm: 700`, la API de Edge (o middleware) devuelve un HTTP 422 Unprocessable Entity en menos de 20ms, negando acceso libre a la Base de datos Supabase para proteger ciclos de red.

## 3. Arquitectura Detallada de CMS Upload (S3 R2 Flow)

El gerente de AL13 manipula fotos y modelos (hasta 15MB). Subir archivos pesados por un túnel `POST` satura la memoria Node. Se impone el patrón **Direct-To-Storage con Pre-Signed URLs**.

### 3.1 Algoritmo de Flujo de Carga (Media Transcode Protocol)
1.  **Init (Cliente):** El Panel Admín (/admin/upload) solicita *permiso de subida* al Backend propio `GET /api/secure/upload-ticket`.
2.  **Firma (Backend):** El servidor usa el R2/S3 SDK y su clave secreta. Genera una URL Prefirmada temporal (Ej: expira en 5 minutos) restringiendo el `Content-Type` a `image/jpeg` o `model/gltf-binary`.
3.  **Transferencia Directa:** El navegador de gerencia hace el POST `multipart/form-data` *directamente* al servidor de Almacenamiento (Supabase Storage o Cloudflare R2), salteando nuestro Worker principal si el bucket lo permite.
4.  **Mutación de DB (Backend Hook):** S3 emite un evento de Éxito al servidor. El servidor asocia `r2://al13-bucket/foto.jpg` al ID de proyecto transaccional, encola un Job `ffmpeg/sharp` asíncrono para generar miniaturas .AVIF, y revalida la caché del sitio (SSG Rebuild).

## 4. Algoritmos Core de Validación Cotizadora (Client-Side Logic)

### 4.1 Lógica de Presión de Viento (Heurística Estática)
El sistema *Svelte Quoter* aplica una matriz condicional antes de permitir el Submit para el sistema:

```javascript
/* Pseudocodigo Vectorial - Validación Eslbelta */
const MAX_AREA_M2 = 4.5; // Supuesto Estático 8mm Templado

function validateTolerance(width_cm, height_cm, glass_thickness) {
  const area = (width_cm / 100) * (height_cm / 100);
  const ratio = width_cm / height_cm;
  
  if (area > MAX_AREA_M2 && glass_thickness === 8) {
     return { valid: false, reason: "EXCEEDS_MAX_AREA_FOR_8MM" };
  }
  if (ratio < 0.25 || ratio > 4.0) {
     return { valid: false, reason: "STRUCTURAL_RATIO_VIOLATION" };
  }
  return { valid: true };
}
```
*   **Decisión Tech Spec:** Validaciones de leyes físicas básicas operan siempre en *cliente* para brindar respuesta de $0 ms$ al Arquitecto, rebotando la cotización instantáneamente en la interfaz.

## 5. Rendimiento Esperado (Performance QoS)
*   **TTFB API (Read):** Las lecturas del catálogo `GET` en el Panel CMS responderán en $\le 50ms$ p95 (Apoyados sobre Supabase en el edge o CDN local).
*   **Transcodificación Imagen:** Un archivo Raw JPG 24MP (12MB) de la obra deberá demorar $\le 4$ segundos netos de CPU Time en el entorno de Backend hasta obtener derivadas responsivas generadas (400w, 800w, 1200w WebP).

---
*Fin Documentación Técnica (Tech Spec). Las especificaciones dictan protocolos determinísticos, pre-firmas de túneles P2P S3-Cliente y esquemas Zod infalibles en Edge.*
