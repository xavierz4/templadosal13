# UI/UX & Motion System Document

**Sistema:** Sistema de Diseño Premium y Motor de Animación (Templados AL13)  
**Versión:** 1.0 (B2B Tactile / B2C Cinematic)  
**Fecha:** Febrero 2026  

**Agente Compilador:** The Architect-Scribe V2.0  

---
> 🛡️ **[REPORTE DID - AUDITORÍA DE INTEGRIDAD]**
> *Métrica de Densidad:* Supresión drástica de interfaces "genéricas tipo Bootstrap/Material" o "Generadas por LLM Vanilla". Se decreta un enfoque "Boutique/Luxury" usando matemáticas de resortes (Spring Physics) en lugar de transiciones lineales muertas.
> *Restricción de Flujo:* Se instituye **Motion** (el motor moderno de Framer Motion / Motion One) atado a la View Transitions API de Astro. Quedan prohibidas las animaciones que colapsen el Main Thread del móvil.
---

![Templados AL13 - Premium UI Concept](C:\Users\xavie\.gemini\antigravity\brain\583fd908-8b36-42d9-b74e-9c843de01868\templados_al13_premium_quoter_ui_1771722679686.png)

## 1. Filosofía de Diseño: El "Anti-Plantilla" (The Boutique Paradigm)

El software comercial web de la época 2024-2025 se homogeneizó en tarjetas blancas planas y sombras difusas predecibles (Tailwind defaults). Templados AL13 exige un **Branding Cinematográfico y Táctil** que proyecte ingeniería de alta gama (Aluminio/Vidrio).

### 1.1 Estética Visual Básica (Visual Core)
*   **Tematización Dinámica (`light-dark()`):** No hay botones de "Cambiar tema" que recargan la UI. Se explota el CSS O.S native `light-dark()`. 
    *   *Modo Claro:* No es `#FFFFFF` puro. Es blanco titanio, simulando rebote de luz en vidrio esmerilado (`#F8F9FA`).
    *   *Modo Oscuro:* No es `#000000`. Es anodizado negro profundo con reflejos metálicos (`#0A0A0C`), evitando la fatiga ocular y ahorrando batería OLED del Contratista.
*   **Glassmorphism Estructural:** Uso restrictivo del `backdrop-filter: blur(16px)` para las superposiciones del HUD B2B (Calculadora Quoter) sobre el modelo 3D subyacente interactuando con las luces del Render WebGL sin ocultarlo.
*   **Tipografía de Precisión (Variable Fonts):** Descarte de fuentes genéricas (Inter/Roboto default). Adopción de fuentes Geométricas Variables (Ej. *Outfit* o *Syne* para Headers B2C, y familia *JetBrains Mono* estricta paramétrica para números y cotas del Quoter B2B). 

## 2. El Ecosistema Kinético: Motion & Física Web

Las interfaces no deben "aparecer" ni fundirse en seco (Fade in). Las interfaces AL13 **Tienen Masa y Fricción** simulando la manipulación de cristales estructurales pesados. Estrechamente apoyado en la librería `Motion` (Aceleración de Hardware).

### 2.1 Micro-Interacciones de Resorte (Spring Physics)
Se abandona la curva de Bézier fácil (`ease-in-out`). Todas las interacciones de botones transaccionales B2B y tarjetas de Catálogo en `React/Astro` inyectarán cálculos de masa y rigidez:

```javascript
/* Matriz Global de Animación Motion - B2B/B2C */
export const AL13_SPRING_CONFIG = {
  tactile_button: { type: "spring", stiffness: 400, damping: 10, mass: 0.8 },
  glass_card_hover: { type: "spring", stiffness: 300, damping: 20 },
  page_transition: { type: "spring", bounce: 0, duration: 0.4 }
};
```
*   **Hover States (Efecto Táctil Densa):** Al posar el dedo o cursor en un *Lead Submit*, el botón no solo cambia de color; su escala sufre un *shrink* de `scale: 0.97` impulsado por el resorte, informando solidez estructural antes del Tap, y al disparar, propaga una onda (Ripple) contenida que viaja hasta `opacity: 0`.

### 2.2 Layout Animations & Shared Elements
*   **Transiciones sin costura (View Transitions API + Astro):** Cuando el Cliente (B2C) hace click en una miniatura del "Cristal Oro" en `/catalogo`, la tarjeta estática **no navega a otra página de golpe**. Se eleva en Z-Space y *crece* para convertirse en la Imagen Hero (Fotografía principal) de la página `/catalogo/cristal-oro`, manteniendo continuidad espacial absoluta sin cargar el cerebro del usuario con un borrado de pantalla blanco.

## 3. Jerarquía y Carga Cognitiva B2B (The Quoter UI)

Los contratistas no tienen tiempo. La arquitectura UI del Quoter paramétrico se diseña bajo la Ley de Hick (Minimizar tiempo de decisión).

### 3.1 Diseño HUD Paramétrico (Heads-Up Display)
*   **Zero-Scroll Layout:** Todo el Quoter B2B se engloba dentro del Viewport del móvil (`100dvh`). El formulario nunca obliga al contratista a hacer scroll infinito. 
*   **Step-by-Step Kinético:** En vez de un formulario masivo paralizante de 10 campos, la interfaz muta fluídamente con `<motion.div layout>` exponiendo el siguiente input (Ej: de Ancho $\to$ Alto $\to$ Material) *sólo si* el anterior Zod Schema pasó la condición determinística de "Viento/Tolerancia" ejecutada en JavaScript local.
*   **Retroalimentación Háptica (Vibration API):** Si el contratista teclea `width: 800cm` (Dimensión ilegal imposible para el vidrio seleccionado), el dispositivo ejecuta `navigator.vibrate([50, 50, 50])` si es un móvil, acompañando el input box de un `<motion.div animate={{ x: [-10, 10, -10, 10, 0] }} transition={AL13_SPRING_CONFIG.error}>` simulando una sacudida física "Denegado".
---

![Templados AL13 - Landing Page Hero Concept](C:\Users\xavie\.gemini\antigravity\brain\583fd908-8b36-42d9-b74e-9c843de01868\templados_al13_premium_landing_hero_1771727491217.png)

![Templados AL13 - Catalog Grid Concept](C:\Users\xavie\.gemini\antigravity\brain\583fd908-8b36-42d9-b74e-9c843de01868\templados_al13_premium_catalogo_1771727695161.png)

## 4. Renderizado Inmersivo B2C (Model-Viewer Overlays)

El catálogo 3D B2C exige a la GPU, por tanto la UI debe ser fantasmal (Ghost UI) para no competir con los reflejos PBR.
*   **Cinematography Loading:** Mientras el tensor de texturas pesadas `.glb` descarga ($5\text{MB}$), la interfaz pinta un Skeleton Loader difuminado, reemplazándose con un Fade cruzado inyectado por `Motion` que arrastra la cámara virtual de Three.js en un "Dolly Shot" hacia la Puerta o el Proyecto desde un ángulo cenital en picada al ángulo frontal (Simulación Dron), generando asombro e impresión ultra-tecnológica.

---
*Fin Documentación de Sistema UI/UX y Animación Frontal. Los ingenieros tienen terminantemente prohibido usar pseudo-componentes plásticos (Bootstrap/MUI) estériles. Todo polígono y píxel debe estar sometido a masa y vector vía librería Motion.*
