# AGENTS.md — Contrato Permanente de Arquitectura para Templados AL13

> Este archivo es leído automáticamente por el agente de IA en cada sesión de trabajo.
> Define las reglas inviolables de arquitectura, patrones de diseño y buenas prácticas
> que **deben aplicarse** proactivamente en cada pieza de código generado.

---

## 🏛️ Stack Tecnológico del Proyecto
- **Framework Web:** Astro (BFF / SSG / SSR)
- **UI Components:** Svelte 5 (con Runes: `$state`, `$derived`)
- **Lenguaje:** TypeScript (strict mode, sin `any` salvo excepciones documentadas)
- **Base de Datos:** Supabase (PostgreSQL)
- **Email Transaccional:** Resend
- **Validación de Schemas:** Zod
- **Testing:** Vitest (unit), Playwright (E2E)
- **CSS:** Tailwind CSS
- **CI/CD:** Husky + lint-staged (pre-commit hooks)

## 📐 Arquitectura del Proyecto: HSA (Hex-Sovereign Architecture)

```
src/
├── core/           # Lógica de Dominio pura — SIN dependencias de framework
│   ├── config/     # env.ts (Zod Fail-Fast)
│   ├── domain/     # Entities, Schemas, PhysicsEngine, Strategies, Interfaces
│   │   ├── repositories/  # Interfaces (ILeadRepository)
│   │   ├── services/      # Interfaces (IEmailService)
│   │   └── strategies/    # Pattern Strategy (IPhysicsStrategy + implementaciones)
│   ├── infrastructure/ # Adapters concretos (Supabase, Resend)
│   │   ├── repositories/  # SupabaseLeadRepository
│   │   └── services/      # ResendEmailService
│   └── types/      # database.types.ts (generado por Supabase)
├── shared/         # Componentes y utilidades REUTILIZABLES globalmente
├── modules/        # Features verticales (FSD — Feature Sliced Design)
│   ├── landing/    # index.ts (Barrel File público)
│   └── quoter/     
│       ├── index.ts        # Barrel File público — ÚNICO punto de entrada
│       ├── ui/             # Componentes Svelte (solo presentación)
│       └── api/            # leadClient.ts (HTTP, sin lógica de negocio)
└── pages/          # Rutas Astro + endpoints API (/api/*)
```

---

## 🔒 REGLAS INVIOLABLES — Se aplican en CADA generación de código

### REGLA 1: SOLID Score 5/5
Antes de generar cualquier clase, función o módulo, verificar:

| Letra | Pregunta de Control |
|---|---|
| **S** — Single Responsibility | ¿Esta unidad tiene SOLO una razón para cambiar? |
| **O** — Open/Closed | ¿Funciona via extensión (Strategy/Plugin) sin modificar código existente? |
| **L** — Liskov Substitution | ¿Las implementaciones son intercambiables con la interfaz sin efectos? |
| **I** — Interface Segregation | ¿La interfaz tiene solo los métodos que el cliente necesita? |
| **D** — Dependency Inversion | ¿Los módulos de alto nivel dependen de ABSTRACCIONES, no de implementaciones? |

### REGLA 2: Patrón Repository + Service (Hexagonal)
- **Los endpoints Astro (`src/pages/api/`):** solo orquestan. Nunca contienen lógica de base de datos o email.
- **Los Repositorios (`src/core/infrastructure/repositories/`):** son los ÚNICOS archivos que hablan con Supabase.
- **Los Services (`src/core/infrastructure/services/`):** son los ÚNICOS archivos que hablan con Resend.
- **Las Interfaces (`src/core/domain/`):** son los contratos. La lógica de negocio solo ve contratos.

### REGLA 3: Barrel Files (FSD Encapsulation)
- Cada módulo en `src/modules/` DEBE tener un `index.ts` que defina su API pública.
- Ningún archivo fuera del módulo puede importar directamente desde subdirectorios internos (`ui/`, `api/`).
- ✅ `import { TechnicalValidator } from '@modules/quoter'`
- ❌ `import TechnicalValidator from '@modules/quoter/ui/TechnicalValidator.svelte'`

### REGLA 4: UI "Dumb" (Presentación Pura)
- Los componentes Svelte en `ui/` NO hacen `fetch()`, NO importan SDKs, NO contienen lógica de negocio.
- Toda llamada de red pasa por el `api/` client del módulo correspondiente.

### REGLA 5: XSS + Zod Sanitización
- Cualquier campo de texto del usuario que llegue a la base de datos DEBE pasar por `.transform(sanitizeHtml)` en el schema Zod.
- `sanitizeHtml` elimina tags HTML: `str.replace(/<\/?[^>]+(>|$)/g, "").trim()`

### REGLA 6: Variables de Entorno — Zod Fail-Fast
- CERO `process.env.X` o `import.meta.env.X` directos en código de aplicación.
- TODAS las variables de entorno se leen ÚNICAMENTE desde `src/core/config/env.ts`.
- Si falta una variable, el servidor NO arranca → error claro, no bug silencioso.

### REGLA 7: TypeScript Estricto
- PROHIBIDO el tipo `any` sin un comentario explicando POR QUÉ es necesario.
- PREFERIR `unknown` y narrowing sobre `any`.
- Usar tipos Zod-inferred (`z.infer<typeof Schema>`) para DTOs.

### REGLA 8: Patrón Strategy para física por ProductType
- Agregar un nuevo `ProductType` = crear una nueva clase en `src/core/domain/strategies/`.
- NUNCA modificar `physicsEngine.ts` (OCP).
- Registrar la nueva clase en `strategyRegistry` dentro de `physicsEngine.ts`.

### REGLA 9: Conventional Commits Obligatorios
Formato: `<tipo>(<scope>): <descripción en lowercase>`

```
feat(quoter): add real-time price estimation panel
fix(physics): correct area threshold for glass weight
refactor(core): extract email sending to ResendEmailService
docs(training): add module 11 best practices course
test(quoter): add vitest coverage for lead validation boundary cases
```

### REGLA 10: Buenas Prácticas Automáticas
- **DRY:** Si el mismo código aparece 2+ veces → extraer función/hook/util.
- **KISS:** La solución más simple que pasa los tests es la correcta.
- **YAGNI:** No implementar para "el futuro hipotético". Solo requisitos actuales.
- **Naming:** Los nombres revelan intención. Nunca abrevies: `usr`, `tmp`, `fn`.
- **Boy Scout:** Siempre dejar el archivo levemente mejor que al encontrarlo.

---

## 🧪 Checklist Pre-Commit (Mental)

Antes de generar o modificar código, recorrer este checklist:

- [ ] ¿El código tiene una única responsabilidad?
- [ ] ¿Importa dependencias a través de abstracciones (no SDKs directos)?
- [ ] ¿Los strings de usuario pasan por sanitización XSS?
- [ ] ¿Las variables de entorno vienen de `env.ts`?
- [ ] ¿Los módulos exponen solo su `index.ts` público?
- [ ] ¿Hay tests para la lógica nueva?
- [ ] ¿El commit message sigue la convención?

---

## 🗂️ Path Aliases Configurados

```typescript
'@core/*'    → 'src/core/*'
'@shared/*'  → 'src/shared/*'
'@modules/*' → 'src/modules/*'
```

---

## 📚 Documentación de Referencia
- Estándares de código: `docs/engineering/01_Coding_Standards.md`
- Arquitectura del sistema: `docs/architecture/`
- Curso de arquitectura: `docs/training/arquitectura/`
- Caso de estudio AL13: `docs/training/arquitectura/10_Caso_Estudio_Arquitectura_AL13.md`
- Buenas prácticas (Módulo 11): `docs/training/arquitectura/11_Buenas_Practicas_de_Ingenieria.md`

---
*Templados AL13 — AGENTS.md — Versión 2.0 — Arquitectura HSA + SOLID 5/5*
