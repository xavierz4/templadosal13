# Coding Standards Document

**Sistema:** Templados AL13 Monorepo Base (Astro/Islands + Node Backend)  
**Versión:** 2.0 (Strict-Typing & Descriptive Domain — SOLID Enforcement Update)  
**Fecha:** Febrero 2026  

**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Convenciones de Seguridad Lógica y Manejo de Errores (The Core Rules)

Todo desarrollador humano o agente IA editando el código de `templados-al13` **ESTÁ ATADO** a este decálogo:

### 1.1 El Principio del Fracaso Asumido (Defensive Programming)
Nunca se asume que un sistema de terceros, conexión a base de datos, o red del celular de un B2B va a responder en `200 OK`. Toda Promesa Asíncrona (Async Promise) en TypeScript debe ir forzosamente anidada:

**❌ Prohibido (Código Mágico Kamikaze):**
```typescript
const lead = await db.insert(payload);
return new Response(JSON.stringify(lead)); // Si db crashea, la API Backend se ahoga y la UI Frontend explota.
```

**✅ Requerido (El Estándar AL13 Defensa en Profundidad):**
```typescript
try {
  const { id } = await leadRepository.saveLead(payload, physics); // Via ILeadRepository (DIP)
  return new Response(JSON.stringify({ leadId: id }), { status: 201 });
} catch (error: unknown) {
  // OBLIGATORIO: 'unknown' + narrowing. NUNCA 'any'.
  if (error instanceof Error) {
    console.error("[Leads API] Insert failed:", { msg: error.message });
  }
  return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
}
```

### 1.2 La Muerte Legal de `any`
El tipado `any` en TypeScript es equivalente a deshabilitar los frenos del carro de QA.
*   *Mandato CI:* Si el pipeline de GitHub Action detecta una declaración explícita de `any` no autorizada (Sin un `eslint-disable-next-line` justificado largamente con comentario), **El Build Falla instantáneamente.** Enforced por ESLint `@typescript-eslint/no-explicit-any: 'error'`.
*   *Sustituto:* `catch (error: unknown)` + narrowing con `instanceof`. Ingestión de datos exóticos usa `unknown` condicionado a validaciones de la librería `Zod`.

### 1.3 Aliases Absolutos Obligatorios (REGLA 0)
Todo import que cruza capas distintas de la arquitectura HSA (`core/`, `shared/`, `modules/`, `pages/`) **DEBE** usar los path aliases del `tsconfig.json`:
*   `@core/*` → `src/core/*`
*   `@shared/*` → `src/shared/*`
*   `@modules/*` → `src/modules/*`
*   **Prohibido:** `import { X } from '../../core/domain/leadSchema'`
*   **Obligatorio:** `import { X } from '@core/domain/leadSchema'`
*   *Mandato CI:* ESLint `no-restricted-syntax` bloquea automáticamente cualquier `../../` en imports. El commit es rechazado por `lint-staged`.

### 1.3 Pureza del Andamiaje (BigTech Scaffolding Standard)
La raíz del proyecto (`./`) y la carpeta fuente (`./src/`) son zonas de acceso restringido regidas por la **Política de Cero Ambigüedad**.
*   **Axioma de la Raíz:** Prohibido inyectar scripts sueltos, entornos virtuales (`.venv`), o carpetas de herramientas disidentes en la raíz. Toda herramienta externa (Ej. Python DID Auditors) debe vivir encapsulada dentro de `/tools/`. La raíz solo hospeda archivos de manifiesto de Vite/Astro (`astro.config.mjs`, `package.json`, etc.).
*   **Axioma de Fuente (`src/`):** Si un instalador automático (ej. Tailwind) inyecta carpetas genéricas como `styles/`, `lib/` o `layouts/`, el desarrollador/agente **está obligado a exterminarlas** y reubicar su contenido dentro de los 4 pilares HSA estandarizados (`core`, `shared`, `modules`, `pages`).

## 2. Nomenclatura del Dominio (Naming Conventions)

Nombrar variables en AL13 exige modelado del mundo real (Ubiquitous Language B2B).
*   **Axioma Visual:** El código debe leerse como un Manual de Arquitectura.
*   **Variables de Dimensión:** Nunca se usa `w` o `width`. Obligación de sufijos escalares: `width_cm`, `height_mm`, `weight_kg`, `price_cop`. Aliviana cargas mentales en programadores haciendo cálculos del simulador 3D (Isla B2C).
*   **Booleanos de Estado:** Prefijados exhaustivamente: `is_published`, `has_3d_model`, `can_calculate`, `should_render_canvas`.

## 3. Manejo Lógico de UI y Estilo (Tailwind CSS)

Debido al requerimiento de velocidad de iteración y bajo peso de CSS, el proyecto *NO* usará **Sass/Less** o CSS global pesado, sino que se apoyará íntegramente en utilidades Atómicas:

### 3.1 Tailwind CSS & Arbitrary Values
El diseño está fuertemente atado a **Tailwind CSS**.
*   Se prefiere el uso de utilidades estándar (`flex`, `p-4`, `text-lg`).
*   Para valores específicos del Hardware o diseño atípico B2B, se autoriza el uso de valores arbitrarios de Tailwind: `w-[40ch]`, `h-[calc(100vh-80px)]`.
*   Las animaciones complejas o variables del sistema (`light-dark()`) se inyectan en `global.css` como `@apply` o puro CSS Vainilla, pero la construcción de UI diaria es 100% Tailwind.

### 3.2 Tematización de Interfaz Automática (`light-dark()`)
Para disminuir scripts invasivos `toggle-theme.js` y parpadeos blancos nocturnos (Flash of Inaccurate Theme), la paleta de colores del diseño se somete directamente al Root de CSS Vainilla Moderno Level 5 (y se expone a Tailwind via `tailwind.config.mjs`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: light dark;
    --bg-primary: light-dark(var(--aluminio-blanco-matte), var(--aluminio-negro-anodizado));
    --txt-base: light-dark(#1A1A1A, #E0E0E0);
  }
}
```

## 4. Gobernanza del Monorepo Pull Requests (Git Flow)

Ningún desarrollador empuja código a `main`.

### 4.1 Commit Semántico (Conventional Commits)
Se requiere trazabilidad póstuma (`git log` limpio). Se usa `commitlint`:
*   `feat(quoter): inyectado algoritmo de deflección del viento perfil-5020`
*   `fix(canvas-3d): purgado memory leak de texturas PBR tras 5 mounts`
*   `chore(deps): aumento de version vitest a 5.0.1`

### 4.2 Code Reviews (El Rol del IA y Humanos)
Para que un código (Feature nuevo) sea aprobado en Review:
1.  Debe poseer como mínimo 1 caso Test unitario (`Vitest`) confirmando que el nuevo código funciona.
2.  Debe poseer comprobación de Degradación (Qué hace el nuevo código si falla el internet a la mitad de su ejecución). Si carece de Try/Catch asincrónico, es regresado (Changes Requested).

## 5. Restricciones Arquitectónicas de Nivel Empresarial (Big Tech Guardrails)

Para mantener la certificación de "Monolito Modular Híbrido" y prevenir el código espagueti de las Startups tradicionales, es obligatorio acatar las siguientes 3 directivas de aislamiento estructural:

### 5.1 Encapsulamiento FSD (Barrel Files Obligatorios)
Ningún archivo externo a un módulo (`src/modules/[nombre]/`) tiene permitido importar componentes internos aislados de ese módulo (ej. importar desde `src/modules/quoter/ui/Component.svelte` está **estrictamente prohibido**).
*   **Regla:** Todo módulo debe tener un archivo `index.ts` en su raíz (Barrel File) que funcione como su única **API Pública**.
*   **Astro Pages:** Las páginas de Astro (`src/pages/*`) solo pueden consumir lo que el módulo exporte explícitamente en su `index.ts`. Los Módulos son Cajas Negras.

### 5.2 Desacoplamiento Red-UI (UI "Tonta")
Los componentes visuales (HTML/Svelte/React/Astro) tienen prohibido comunicarse directamente con la red (`fetch`, `axios`) o tener conocimiento de las URLs del Backend.
*   **Regla:** Si un módulo necesita comunicarse con la API, debe crearse un cliente dedicado `src/modules/[modulo]/api/[client].ts`. El componente UI simplemente invoca la función asincrónica tipada de ese cliente. La Separación de Responsabilidades (SoC) es total.

### 5.3 Validación Fail-Fast de Entorno (Zod Config Singleton)
Bajo ninguna circunstancia se debe leer el entorno dinámicamente (`import.meta.env.ALGUITO`) en medio de la ejecución lógica de un endpoint o componente.
*   **Regla:** Toda variable de entorno debe ser declarada, parseada y validada estáticamente usando el esquema Zod en el singleton `src/core/config/env.ts`. 
*   **Por qué:** "Fail-Fast". Si falta la llave maestra de la base de datos o el token de correo, el servidor/compilador debe colapsar *inmediatamente* al arrancar, previniendo errores silenciosos o denegaciones de servicio corruptas a mitad de ejecución.

---
*Fin Documentación de Estándares de Codificación. Este es el contrato legal entre los desarrolladores e IAs mutando la Plataforma. Cada línea no adherente inyectará debilidad al pilar fundamental SRE.*
