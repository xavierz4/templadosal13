# Software Design Document (SDD)

**Sistema:** Plataforma Integral de Generación de Demanda - Templados AL13  
**Versión:** 1.0 (Diseño de Componentes Core & Base de Datos Propia)  
**Fecha:** Febrero 2026  

**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Diseño de Arquitectura Estructural (System Architecture)

El SDD gobierna la **Ingeniería de Componentes** (Cómo se escribe el código) no la Topología de Red (Ya definida en el Architecture Document).

### 1.1 Estructura del Monorepo (Directorio Táctico)
Se impone una distribución mono-repositorio orientada a dominios (Domain-Driven Design) basada en el Framework Astro + Svelte para las "Islas":

```text
/templados-core
  ├── /src
  │   ├── /components       # UI Pura estática (Botones, Headers, Cards)
  │   ├── /islands          # UI Interactiva CSR (CalculadoraSvelte.svelte, VisorWebGL.svelte)
  │   ├── /content          # Modelos de Markdown/MDX (Si aplica para CMS estático híbrido)
  │   ├── /pages            # Rutas SSG (/contacto, /catalogo, /admin)
  │   ├── /server           # Node.js / Bun Logic (Edge API Supabase)
  │   │   ├── /db           # Supabase Types (Generados)
  │   │   ├── /auth         # Utilidades Supabase Auth
  │   │   └── /services     # Casos de uso
  │   └── /styles           # Configuración de Tailwind CSS Tailwind (global.css)
  ├── /public               # Assets hiper-estáticos (.avif pre-procesados, logos)
  ├── astro.config.mjs      # SSG/SSR Adapter Configuration (Cloudflare Network)
  └── package.json
```

## 2. Decisiones de Diseño de Componentes (Component Design)

### 2.1 Patrón State Machine para la Calculadora (Isla B2B)
La calculadora paramétrica (Svelte) es demasiado compleja para depender de flujos condicionales simples (`if/else`).
*   **Decisión SDD:** Se **DEBE** utilizar un patrón de Máquina de Estados (Store de Svelte con transiciones explícitas).
*   **Estados Válidos:** `IDLE` -> `DIMENSIONING` -> `CALCULATING_TOLERANCE` -> `ERROR_PHYSICS` -> `REQUESTING_LEAD_DATA` -> `SUBMITTING` -> `SUCCESS` | `FAIL_NETWORK`.
*   **Transiciones Duras:** Es algorítmicamente imposible pasar al estado `SUBMITTING` si las variables internas de $Ancho \times Alto$ rebasan el estado de validez de `CALCULATING_TOLERANCE`. Este blindaje ocurre antes del `POST` al backend de Supabase.

### 2.2 Patrón de Ciclo de Vida WebGL (Isla B2C `<model-viewer>`)
El visor tridimensional requiere control de memoria para prevenir Out of Memory.
*   **Decisión SDD:** Uso obligatorio de **Threlte**.
*   **Justificación:** Threlte como ecosistema nativo de Svelte maneja el ciclo de vida (Mount/Destroy) de manera declarativa. Libera automáticamente los buffers de geometría y tensores de memoria de la GPU sin necesidad de inyectar manualmente `renderer.dispose()` en hooks de desmontaje, lo cual es vital para dispositivos móviles.

## 3. Modelo Realacional de Datos (Database Design)

Se instanciará una BD SQL central con **Supabase (PostgreSQL)**. A continuación, el esquema canónico DDL para las dos entidades nucleares de AL13.

### 3.1 Entidad: `Leads` (El Motor Comercial)
```sql
CREATE TABLE crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL UNIQUE,
    client_phone VARCHAR(50),
    segment VARCHAR(20) CHECK (segment IN ('B2B_ARCHITECT', 'B2C_HOME', 'B2B_BUILDER')),
    interest_product_id UUID REFERENCES inventory_products(id),
    raw_dimensions JSONB, -- Ejemplo: {"width": 3.0, "height": 2.1, "glass": "8mm_tempered"}
    status VARCHAR(20) DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'QUOTED', 'CLOSED_WON', 'LOST')),
    CONSTRAINT valid_email CHECK (client_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);
```
*Justificación:* El campo `raw_dimensions` se mantiene en `JSONB` previendo que la complejidad del ensamblaje B2B mutará con nuevos perfiles (ej. sumando marcos curvos en el futuro) sin necesidad de hacer complejas migraciones de esquemas (`ALTER TABLE`) constantemente.

### 3.2 Entidad: `Inventory_Products` (El CMS Soberano)
```sql
CREATE TABLE inventory_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL, -- Identificador SEO URL: /producto/puerta-batiente-5020
    name VARCHAR(150) NOT NULL,
    description TEXT,
    system_type VARCHAR(50) NOT NULL, -- Ej: 'Corrediza', 'Batiente', 'Fija'
    base_price_sqm DECIMAL(10, 2), -- Precio base Metro Cuadrado en COP
    has_3d_model BOOLEAN DEFAULT FALSE,
    model_s3_url VARCHAR(500), -- Apuntador a Bucket Cloudflare R2 / AWS S3
    is_published BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indice para velocidad Giga-Rápida de listado público en CMS
CREATE INDEX idx_products_published ON inventory_products(is_published) WHERE is_published = TRUE;
```

## 4. Diseño del API de Panel de Control (Admin Endpoints)

La seguridad para el Dueño de AL13 se blinda en las rutas de Backend API (`/server/api/*`).

### 4.1 Protección de Mutación (The CRUD Barrier)
Cualquier endpoint expuesto o mutación directa hacia **Supabase** **ESTÁ OBLIGADO** a cursar por políticas de **Row Level Security (RLS)**.
*   **Procedimiento SDD:** El cliente o el Edge Worker envía el `Authorization: Bearer <Supabase JWT>`. PostgreSQL, a través de Supabase GoTrue, evalúa si el rol asume permiso de `INSERT/UPDATE`. Si el esquema RLS falla, se rechaza directamente en la capa de base de datos sin consumir lógica del servidor.

## 5. Estrategia de Caché y Renderizado (Caching & SSR Strategy)

Dado que AL13 usa **Astro**, el diseño se segmenta:

1.  **Modo de Salida (Output Mode):** Servidor Híbrido (`output: 'hybrid'`).
2.  **Rutas Estáticas Absolutas (SSG pre-render):** `/`, `/nosotros`, `/catalogo` y `/catalogo/[slug]`. Estas rutas se compilan a HTML puro en el Servidor de Integración (CI) o mediante Webhooks (`On-Demand Builders`) al momento que cambia la DB. Latencia de servicio: $~20ms$ (Entregado directo desde la CDN).
3.  **Rutas Server-Side Rendering Obigatorias (SSR - Isomorphic API):** Las rutas `/api/internal/ingest` y `/admin/*` inyectan el flag `export const prerender = false;`. Su ejecución corre físicamente en un Isolate V8 sobre la marcha computando datos frescos ($~150ms$ overhead de RTT a Base de Datos de La Guajira).

## 6. Observabilidad Lógica (Logging Interno)
*   **Transacciones CRUD:** Toda Inserción o Modificación a `inventory_products` efectuada por el Dueño y cualquier error `500 Internal Server Error` debe generar un Log Estructurado en JSON (Ej. vía Winston o Pino Logger) y volcarse al `stdout`. El servidor de alojamiento (Vps/Edge) lo redirigirá al DataDog/Grafana interno.
*   **Silencio Táctico:** Prohíbese estrictamente hacer `console.log(lead_data)` con PII (Nombre/Email) del cliente B2B en producción. Violación de cumplimiento.

---
*Fin Documento de Diseño (SDD). Los ingenieros están prohibidos de inyectar dependencias de ReactJS en componentes estáticos o mutar la DB burlando las RLS.*
