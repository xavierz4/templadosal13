---
description: Checklist de revisión arquitectónica antes de hacer commit de cualquier código nuevo
---

# 🏛️ Workflow: Revisión Arquitectónica Pre-Commit

Ejecutar este checklist **antes de hacer commit** de cualquier feature, refactor o fix.
El objetivo es garantizar que el código cumpla con los estándares SOLID, HSA, y Buenas Prácticas del proyecto Templados AL13.

---

## Paso 1 — Rutas Absolutas (Aliases)

```
¿Todos los imports entre capas diferentes usan @alias?
  → @core/*   para imports del núcleo de dominio e infraestructura
  → @shared/* para componentes y utils globales
  → @modules/* para acceso al API pública de otro módulo
  → Rutas relativas ./ solo permitidas dentro del mismo directorio inmediato
  → Prohibido ../../ entre capas distintas
```

---

## Paso 2 — Revisión SOLID (5/5)

Verificar CADA principio contra el código nuevo:

```
S — ¿La clase/función tiene UNA SOLA razón para cambiar?
O — ¿Se extiende sin modificar (Strategy/Plugin/Registry)?
L — ¿Las implementaciones cumplen el contrato de la interfaz sin sorpresas?
I — ¿Las interfaces son granulares (1 responsabilidad por interfaz)?
D — ¿Los módulos de alto nivel dependen de interfaces, no de clases concretas?
```

Si alguna respuesta es NO → refactorizar antes de continuar.

---

## Paso 2 — Revisión de Capa (Arquitectura HSA)

```
¿El código nuevo está en la capa correcta?
  → UI (presentación pura, sin fetch, sin SDK)
  → api/ (cliente HTTP del módulo, sin lógica de negocio)
  → domain/ (reglas de negocio, sin framework, sin SDK)
  → infrastructure/ (SDKs: Supabase, Resend)
  → pages/api/ (orquestador: valida → repositorio → servicio → responde)
```

---

## Paso 3 — Security Checklist

```
[ ] Strings de usuario → sanitizeHtml en schema Zod
[ ] Variables de entorno → solo desde src/core/config/env.ts
[ ] No hay secrets hardcodeados en el código
[ ] No hay `console.log` con datos sensibles
```

---

## Paso 4 — Buenas Prácticas Rápidas

```
[ ] DRY: ¿Existe código duplicado que pueda extraerse?
[ ] Naming: ¿Los nombres revelan intención sin abreviaciones?
[ ] TypeScript: ¿Sin `any` sin justificación?
[ ] YAGNI: ¿Todo el código responde a un requisito actual real?
```

---

## Paso 5 — Barrel Files (si se toca un módulo)

```
[ ] El módulo tiene index.ts actualizado con sus exports públicos
[ ] Los imports externos usan el index.ts (no rutas internas)
```

---

## Paso 6 — Tests

```
[ ] La lógica nueva tiene al menos un test unitario en Vitest
[ ] Los mocks apuntan a las interfaces (no a los SDKs directos)
[ ] npx vitest run → todos los tests pasan en verde
```

---

## Paso 7 — Commit Semántico

Formato obligatorio:
```
<tipo>(<scope>): <descripción corta en presente>

feat(quoter): add real-time price estimation
fix(physics): correct wind load for facades > 2.1m
refactor(core): extract email logic to ResendEmailService
docs(training): add module 11 best practices
test(leads): add boundary test for zod xss sanitization
```

---

## ✅ Si todos los pasos están en verde → `git commit`

```bash
git add .
git commit -m "feat(scope): descripción"
```

El pre-commit hook de Husky ejecutará ESLint + Prettier automáticamente.
Si falla → corregir el error antes de commitear.
