

# Módulo 7: Arquitectura de Pruebas (TDD & Fail-Fast)

En FAANG (Meta, Amazon, Apple, Netflix, Google), una frase destructiva para la mentalidad Junior es común: *"Mi código ya funciona, solo me falta probarlo"*. 

**La verdad absoluta:** El código que no se puede probar (Testable Code) es, por definición, mal código. Si no puedes aislar tu función para probarla, tu función hace demasiadas cosas o está acoplada al sistema entero.

## 1. El Costo de un Bug (The Shift-Left Paradigm)

*   **En Desarrollo:** Encontrar un bug mientras escribes la función cuesta $1 dólar (en tiempo).
*   **En QA/Staging:** Encontrarlo al final del sprint antes de lanzar cuesta $100 dólares.
*   **En Producción:** Encontrarlo cuando un Arquitecto trata de pagar en Templados AL13 cuesta la pérdida del cliente y reputación ($10,000+ dólares).

La filosofía *Fail-Fast* trata de encontrar los fallos en tu computadora, milisegundos después de teclear, mediante pruebas automatizadas.

## 2. La Pirámide de Testing

No todas las pruebas son iguales ni cuestan el mismo tiempo de CPU. Para no asfixiar el Servidor de Integración (CI/CD), estratificamos:

### Nivel 1: Unit Testing (Pruebas Unitarias) - El Fundamento (Ej: Vitest / Jest)
Prueban funciones y matemáticas puras aisladas del universo, sin base de datos ni red.
*   *Qué probamos:* Nuestra clase `ToleranciaVidrio.calcular(ancho, alto)`.
*   *Mandato:* Deberían ser el 70% del volumen de tus tests. Corren en 2 milisegundos.

### Nivel 2: Integration Testing (Pruebas de Integración)
Prueban si las piezas de LEGO encajan juntas. Ej: ¿Mi controlador HTTP habla bien con mi clase de Base de Datos PostgreSQL local?
*   *Mandato:* Deberían ser el 20%. Son vitales para chequear que los adaptadores *Adapter Pattern* funcionen.

### Nivel 3: End-to-End (E2E) - La Cúspide (Ej: Playwright / Cypress)
Un robot de IA (Navegador Headless) entra a tu página como si fuera un humano, hace clic en el botón de Login de Auth, llena el usuario, da clic a Submit y verifica que salga el Panel de "Bienvenidos".
*   *Mandato:* Son el 10% porque son frágiles, costosas y lentas (toman minutos en correr). Solo pruébanse rutas de conversión críticas de negocio (El proceso de Pago B2B o el formulario de Lead del CRM).

## 3. Test-Driven Development (TDD) en el Ecosistema Core

TDD significa "Desarrollo Guiado por Pruebas". Es escribir la prueba *antes* de escribir la función real.
*   **Fase Roja (Red):** Escribes `expect(calcularArea(2, 2)).toBe(4)`. La prueba rompe y se pone roja porque la función no existe.
*   **Fase Verde (Green):** Escribes el código más feo y burdo posible: `function calcularArea() { return 4; }`. La prueba enciende en verde. ¡Celebramos!
*   **Fase Refactorización (Refactor):** Pules el código por matemática real: `return w * h;`. Si en tu pulido rompes algo, la luz vuelve a rojo y te avisa al instante.

> **Lección de Lead Architect:** Una buena arquitectura se delata por la facilidad para escribir Testing. Si te toma 500 líneas simular el entorno para probar una función de 3 líneas, tu arquitectura es basura y no estás cumpliendo el *Principio de Inversión de Dependencias (SOLID)*.
