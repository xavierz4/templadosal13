# AGENTS.md — Contrato Permanente de Arquitectura para Templados AL13

> Este archivo es leído automáticamente por el agente de IA en cada sesión de trabajo.  
> Define las **16 reglas inviolables** de arquitectura que deben aplicarse proactivamente  
> en cada pieza de código generado, revisado o deployado en Templados AL13.
>
> **Documento de referencia completo:** `docs/training/arquitectura/12_Manual_de_Reglas_Arquitectonicas.md`

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

---

## 📐 Arquitectura del Proyecto: HSA (Hex-Sovereign Architecture)

```
src/
├── core/           # Lógica de Dominio pura — SIN dependencias de framework
│   ├── config/     # env.ts (Zod Fail-Fast validation)
│   ├── domain/     # Entities, Schemas, PhysicsEngine, Strategies, Interfaces
│   │   ├── repositories/  # Interfaces (ILeadRepository)
│   │   ├── services/      # Interfaces (IEmailService)
│   │   └── strategies/    # Pattern Strategy por ProductType
│   ├── infrastructure/ # Adaptadores concretos (Supabase, Resend)
│   │   ├── repositories/  # SupabaseLeadRepository
│   │   └── services/      # ResendEmailService
│   └── types/      # database.types.ts (generado por Supabase)
├── shared/         # Componentes y utilidades REUTILIZABLES globalmente
├── modules/        # Features verticales (FSD — Feature Sliced Design)
│   ├── landing/    # index.ts (Barrel File público)
│   └── quoter/     
│       ├── index.ts        # Barrel File público — ÚNICO punto de entrada externo
│       ├── ui/             # Svelte (solo presentación, cero lógica de red)
│       └── api/            # leadClient.ts (HTTP, sin lógica de negocio)
└── pages/          # Rutas Astro + endpoints API (/api/*)
```

---

## 🔒 LAS 16 REGLAS INVIOLABLES

---

### REGLA 0 — Rutas Absolutas: Aliases Obligatorios (NUEVO)

**Todo import entre capas distintas DEBE usar un path alias. Prohibida la navegación relativa `../../`.**

```typescript
// ✅ CORRECTO — Alias absoluto
import { LeadPayloadSchema } from '@core/domain/leadSchema';
import { submitLeadB2B }    from '@modules/quoter/api/leadClient';
import { Badge }            from '@shared/ui/Badge.svelte';

// ❌ PROHIBIDO — Ruta relativa entre capas
import { LeadPayloadSchema } from '../../core/domain/leadSchema';
import { Badge }             from '../../../shared/ui/Badge.svelte';
```

**Aliases configurados en `tsconfig.json`:**
```json
"@core/*"    → "src/core/*"
"@shared/*"  → "src/shared/*"
"@modules/*" → "src/modules/*"
```

**Excepción permitida:** imports dentro del mismo módulo/carpeta inmediata.
```typescript
// ✅ OK — mismo nivel dentro del módulo
import { sanitizeHtml } from './utils';
import { CabinaDuchaStrategy } from './CabinaDuchaStrategy';
```

---

### REGLA 1 — SOLID Score 5/5

| Letra | Pregunta de Control | Ejemplo en Templados AL13 |
|---|---|---|
| **S** Single Responsibility | ¿Una sola razón para cambiar? | `validateStructuralFeasibility()` solo calcula física |
| **O** Open/Closed | ¿Extensión sin modificación? | Nuevo producto = nueva `XxxStrategy`, no modificar `physicsEngine.ts` |
| **L** Liskov Substitution | ¿Implementaciones intercambiables? | `MongoLeadRepository` reemplaza `SupabaseLeadRepository` sin cambiar el llamador |
| **I** Interface Segregation | ¿Interfaces granulares? | `ILeadRepository` solo tiene `saveLead()` |
| **D** Dependency Inversion | ¿Alto nivel depende de abstracciones? | `leads.ts` usa `ILeadRepository`, nunca `supabase` directamente |

---

### REGLA 2 — Patrón Repository + Service (Hexagonal)

- `src/pages/api/` → Solo valida, orquesta y responde HTTP. Cero lógica de negocio.
- `src/core/infrastructure/` → **ÚNICO** lugar donde viven SDKs externos (Supabase, Resend).
- `src/core/domain/` → Cero dependencias de framework. Solo lógica de negocio pura.

```
pages/api/leads.ts → ILeadRepository → SupabaseLeadRepository → Supabase SDK
```

---

### REGLA 3 — Barrel Files (FSD Encapsulation)

```typescript
// ✅ Correcto — API pública del módulo
import { TechnicalValidator } from '@modules/quoter';

// ❌ Prohibido — acceso al interior del módulo
import TechnicalValidator from '@modules/quoter/ui/TechnicalValidator.svelte';
```

Cada módulo en `src/modules/` DEBE tener un `index.ts` con sus exports públicos.

---

### REGLA 4 — UI "Dumb" (Presentación Pura)

Los componentes Svelte en `ui/` **NO** hacen `fetch()`, **NO** importan SDKs, **NO** contienen lógica de negocio.

```svelte
<!-- ❌ Prohibido en src/modules/*/ui/ -->
const result = await fetch('/api/leads', { ... });

<!-- ✅ Correcto: delega al api/ client del módulo -->
import { submitLeadB2B } from '../api/leadClient';
const result = await submitLeadB2B(quoteData);
```

---

### REGLA 5 — XSS + Sanitización Zod (Zero-Trust Input)

Todo campo de texto libre de usuario **debe** pasar por `sanitizeHtml` en el schema Zod:

```typescript
const sanitizeHtml = (str: string) => str.replace(/<\/?[^>]+(>|$)/g, "").trim();

contactName: z.string().min(3).max(255).transform(sanitizeHtml),
companyName: z.string().max(255).optional().transform(v => v ? sanitizeHtml(v) : v),
```

---

### REGLA 6 — Variables de Entorno → Fail Fast

**CERO** `process.env.X` o `import.meta.env.X` directos fuera de `src/core/config/env.ts`.

```typescript
// src/core/config/env.ts — ÚNICA fuente de verdad de configuración
export const config = EnvSchema.parse(import.meta.env);
// Si falta una variable → el servidor NO arranca → error claro en 3s, no bug a las 3am
```

---

### REGLA 7 — TypeScript Estricto (No `any` sin Justificación)

```typescript
// ❌ Prohibido
catch (err: any) { console.error(err.message) }

// ✅ Correcto — narrowing explícito
catch (err: unknown) {
  if (err instanceof Error) console.error(err.message);
}

// ✅ Tolerado con ticket
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// TODO: [TECH-042] Tipar cuando migremos la lib legacy
const raw: any = externalLib.getData();
```

---

### REGLA 8 — Patrón Strategy para ProductType (OCP)

Añadir un nuevo producto de vidrio al catálogo:
1. Crear `src/core/domain/strategies/NuevoProductoStrategy.ts`
2. Añadir `| 'nuevo_producto'` al tipo `ProductType`
3. Registrar en `strategyRegistry` en `physicsEngine.ts`
4. **NUNCA** modificar la función `validate()` de otra estrategia existente

---

### REGLA 9 — Conventional Commits Obligatorios

```
feat(scope): descripción en presente y lowercase
fix(scope): descripción
refactor(scope): descripción
docs(scope): descripción
test(scope): descripción
chore(scope): descripción
perf(scope): descripción
```

Tipos: `feat · fix · refactor · docs · test · chore · perf · ci · build`

---

### REGLA 10 — DRY · KISS · YAGNI · Naming · Boy Scout

| Práctica | Pregunta | Acción |
|---|---|---|
| **DRY** | ¿Código duplicado en 2+ sitios? | Extraer a función/util/hook |
| **KISS** | ¿Se puede con menos código? | Simplificar sin sacrificar claridad |
| **YAGNI** | ¿Requisito real HOY? | No implementar para "el futuro hipotético" |
| **Naming** | ¿El nombre revela intención? | `validateStructuralFeasibility()` > `calc()` |
| **Boy Scout** | ¿Dejé el archivo mejor? | Borrar debug logs, mejorar 1 nombre |

---

### REGLA 11 — Manejo de Errores: Fail Loudly, Recover Silently

```typescript
// CRÍTICO — Lanzar y loguear (el flujo no puede continuar)
if (dbError) {
  console.error("[LeadRepository] Insert failed:", dbError);
  throw new Error("No pudimos guardar los datos.");
}

// SECUNDARIO — Silenciar CON log (el flujo principal sobrevive)
emailService.sendB2BLeadNotification(data, physics, id)
  .catch(err => console.warn("[EmailService] Notification failed:", err.message));
```

**Mandato:** CERO `catch {}` vacíos. Todo error capturado debe loguearse o relanzarse.

---

### REGLA 12 — Observabilidad: Log Estructurado

Formato obligatorio: `[Contexto] Descripción { datos relevantes }`

```typescript
// ✅ Estructurado y filtrable
console.error("[LeadRepository] Supabase insert failed:", { phone: data.phone, error: dbError });
console.warn("[EmailService] Resend failed, lead saved:", { leadId, err: e.message });
console.log("[Leads API] Lead created:", { leadId, productType: data.productType });

// ❌ Inútil en producción
console.log("aqui");
console.log(response);
```

**Nunca loguear:** tokens, contraseñas, API keys, datos personales completos.

---

### REGLA 13 — Contratos de Testing (Pirámide de Cohn)

- **Unit Tests (Vitest):** Toda lógica de dominio ≥ 80% de cobertura
- **Mocks:** Siempre mockear los ADAPTADORES (Repository/Service), no los SDKs directos
- **Naming semántico:** `it('should [comportamiento] when [condición]', ...)`

```typescript
// ✅ Test atómico y semántico — mockea el adaptador correcto
vi.mock('@core/infrastructure/repositories/SupabaseLeadRepository', () => ({
  SupabaseLeadRepository: class { saveLead = vi.fn().mockResolvedValue({ id: 'test-id' }); }
}));
it('should return 201 when valid lead payload is submitted', async () => { ... });
```

---

### REGLA 14 — Resiliencia API: Fire-and-Forget para Efectos Secundarios

El envío de email, webhooks, analytics y notificaciones Push **nunca** bloquean la respuesta HTTP primaria.

```typescript
// ✅ Correcto — la respuesta HTTP no espera el email
const { id } = await leadRepository.saveLead(data, physics); // ← await: operación primaria
emailService.sendB2BLeadNotification(data, physics, id);     // ← sin await: efecto secundario

return new Response(JSON.stringify({ leadId: id }), { status: 201 }); // ← responde inmediatamente
```

---

### REGLA 15 — Deuda Técnica → TODO con Ticket

```typescript
// ❌ Deuda invisible — prohibida
// TODO: Arreglar esto

// ✅ Deuda rastreable — obligatoria
// TODO: [TECH-034] Centralizar email destino en env var NOTIFICATION_EMAIL.
// Causa: Sprint Express de lanzamiento. Resolver antes del V1.1.
const email = config.NOTIFICATION_EMAIL ?? 'ceotemplados@gmail.com';
```

**La Regla del 20%:** Ningún sprint asigna el 100% al roadmap de producto. El 20% se dedica al repago de deuda técnica documentada.

---

## ✅ Checklist Pre-Commit (7 Preguntas Clave)

```
1. ¿Todos los imports usan @aliases (sin ../ entre capas)?         → REGLA 0
2. ¿Cada función/clase tiene una única responsabilidad?             → REGLA 1 (S)
3. ¿Las dependencias apuntan a interfaces, no a SDKs?               → REGLA 1 (D)
4. ¿Los strings de usuario pasan por sanitizeHtml?                  → REGLA 5
5. ¿Las vars de entorno vienen solo de env.ts?                      → REGLA 6
6. ¿Hay al menos un test unitario para la nueva lógica?             → REGLA 13
7. ¿El commit message sigue la convención semántica?                → REGLA 9
```

---

## 📚 Documentación de Referencia

| Documento | Ruta |
|---|---|
| **Manual completo (16 reglas)** | `docs/training/arquitectura/12_Manual_de_Reglas_Arquitectonicas.md` |
| Coding Standards | `docs/engineering/01_Coding_Standards.md` |
| Engineering Guidelines | `docs/engineering/02_Engineering_Guidelines.md` |
| Buenas Prácticas (DRY/KISS/YAGNI) | `docs/training/arquitectura/11_Buenas_Practicas_de_Ingenieria.md` |
| Caso de estudio AL13 | `docs/training/arquitectura/10_Caso_Estudio_Arquitectura_AL13.md` |
| Workflow de revisión | `.agents/workflows/code_review.md` |

---
*Templados AL13 — AGENTS.md — Versión 3.0 — 16 Reglas | SOLID 5/5 | HSA | Zero-Trust | Absolute Imports*
