# DevOps & Deployment Document

**Sistema:** Tubería de Integración Continua (CI/CD) AL13  
**Versión:** 1.0 (Zero-Downtime Edge Push)  
**Fecha:** Febrero 2026  

**Agente Compilador:** The Architect-Scribe V2.0  


## 1. Arquitectura de Despliegue (Infrastructure as a Pipeline)

Para Templados AL13 no existen "Servidores" a los cuales el equipo de sistemas hace SSH (`Secure Shell`) en el medio de la noche para actualizar el Frontend de la tienda. El despliegue de Astro es Isomórfico y sin Estado (Serverless).

### 1.1 Entornos de Infraestructura Inmutables
La infraestructura responde a los commits del Repositorio de GitHub.
1.  **[DEV] Localhost (Engineer Sandbox):** Node.js o Bun, escuchando en `localhost:4321`. En este nivel, las Bases de Datos operan en Docker (`docker-compose.yml`) interceptando Postgres limpiamente.
2.  **[STG] Staging Environment (Preview Branch):** La rama `.git` hija (e.g. `feat/3d-viewer`). Al subir cambios, Cloudflare instancia un hilo fantasma y emite una Preview URL (`https://hash.templados-al13.pages.dev`). El QA Testea visualmente el Branch aislado *sin tocar ni destruir* la web de los clientes reales.
3.  **[PROD] Production Environment (Main Branch):** Redundancia global en 300+ ciudades de borde. Tras pasar el Pull Request (PR) y mezclar a `main`, la red completa intercambia el puntero al nuevo código instantáneamente (Atomic Deployment). 

## 2. Gestión de Secretos del Proyecto (Secret Governance)

La base de datos propia tiene credenciales (`DB_URL`). El servidor JWT cuenta con un hash asimétrico secreto (`JWT_SECRET`). 
*   **Axioma Técnico:** Queda terminantemente penado ingresar tokens, URLs de conexión o claves API dentro del repositorio Git, ni en `.env` sin encriptar, ni en `constants.ts`.
*   **El Protocolo:** Todos los Secretos de Producción están confinados en el baúl (Vault) de *GitHub Secrets* y *Cloudflare Variables*. Al ejecutar la Action de Build `npm run build`, la CI desencripta efímeramente la variable e inyecta la conexión a Supabase/Postgres dentro del Worker. Apenas el build sube, el worker olvida el string origen garantizando nulo secuestro (Hijacking) del DB URI localmente.

## 3. Estrategia de Despliegue Inversa (Webhooks & SSG)

Mientras un commit actualiza el "Motor Lógico" (Frontend/Backend), las transacciones y fotos del Administrador CMS (El Dueño AL13) modifican la "Realidad Estática" de los clientes *sin hacer commits*.

### 3.1 El Flujo On-Demand Revalidation (OnDR)
Para evitar hacer SSG Builds de todo el sitio de 2 minutos de duración cada vez que el dueño sube un marco de una puerta (Pérdida de Tiempo + Gasto CICD):
1.  **Mutación CMS:** El Dueño inserta o borra la tabla `/productos/serie-5020` desde la UI `admin`.
2.  **API Trigger:** El Endpoint Backend emite un webhook POST cURL a la *Cloudflare On-Demand Revalidation API*.
3.  **Purga Atomática:** Cloudflare *solo purga* los HTML relativos al slug particular `serie-5020`. No tumba el servidor, no recompila la zona `B2B_Calculator`. El Dueño en La Guajira percibe Publicación Inmediata ($~3 \text{ segundos}$) al forzar recarga en su navegador.

## 4. Pipeline Estándar (Deployment Matrix Actions)

### 4.1 YAML CI Crítico: "The PR Gatekeeper"
Cualquier intento de llevar código en desarrollo hacia `main` se traba (Lock) por el `.github/workflows/pr-checks.yml`:

```yaml
# Extracto Lógico de Flujo YAML Requerido
name: 🛡️ AL13 Strict PR Gate
on: [pull_request]

jobs:
  Quality-Assurance:
    runs-on: ubuntu-latest
    steps:
      - name: Checking Out Code
        uses: actions/checkout@v4
      - name: NodeJS Turbo Setup (Bun)
        uses: oven-sh/setup-bun@v1
      - name: Linter & Types Check
        run: bun run lint:strict && bun run typecheck
      - name: Vitest Branch Coverage (Mínimo 90%)
        run: bun run test:unit --coverage=90
      - name: Playwright 3D E2E Over Headless Chromium
        run: bun run test:e2e
      - name: Failsafe (Block Merge)
        if: failure()
        run: echo "PR Rejected. Fix Broken Tests or Typing Errors." && exit 1
```
*Si la terminal de GitHub recibe `exit 1`, el botón de `Merge Pull Request` asume estado CSS Deshabilitado (Gris) bloqueando a gerentes descuidados y protegiendo El Core de Ventas de errores C-Level.*

---
*Fin Documentación de Despliegues (Deployment). El protocolo entierra conceptualmente al programador SSH-Cowboy en favor del control atómico purista y versionado criptográfico en la Nube.*
