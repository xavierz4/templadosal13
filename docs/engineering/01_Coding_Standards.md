# Coding Standards Document

**Sistema:** Templados AL13 Monorepo Base (Astro/Islands + Node Backend)  
**Versión:** 1.0 (Strict-Typing & Descriptive Domain)  
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
  const result = await db.insert(payload).timeout(5000); // 5s timeout máximo
  // Insertar en Logger (No PII) 
  return new Response(JSON.stringify({ success: true, id: result.uuid }), { status: 201 });
} catch (error) {
  logger.error({ msg: "CRM_INSERT_FAIL", trace: error.message });
  return new Response(JSON.stringify({ success: false, tag: "DB_LATENCY" }), { status: 503 });
}
```

### 1.2 La Muerte Legal de `any`
El tipado `any` en TypeScript es equivalente a deshabilitar los frenos del carro de QA.
*   *Mandato CI:* Si el pipeline de GitHub Action detecta una declaración explícita de `any` no autorizada (Sin un `eslint-disable-next-line` justificado largamente con comentario), **El Build Falla instantáneamente.**
*   *Sustituto:* Ingestión de datos exóticos usa `unknown` condicionado a validaciones de la librería `Zod`. (Ref. a Doc #8 Tech Specs).

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

---
*Fin Documentación de Estándares de Codificación. Este es el contrato legal entre los desarrolladores e IAs mutando la Plataforma. Cada línea no adherente inyectará debilidad al pilar fundamental SRE.*
