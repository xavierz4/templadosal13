**ESTADO DID:** `[DID_CERTIFIED]`

# Módulo 3: Patrones de Diseño Clásicos

En 1994, cuatro ingenieros (conocidos como la **Gang of Four - GoF**) se dieron cuenta de algo fundamental: "Los problemas en el software se repiten".

Sin importar si haces una app bancaria en C++ u observas procesos satelitales en Java, siempre terminas chocando con cuellos de botella similares. La GoF catalogó 23 "Soluciones Universales" a esto y las llamó **Patrones de Diseño**. No son código exacto, son "Plantillas de Solución".

Se dividen en 3 familias principales:

## 1. Patrones Creacionales (Cómo nacen los objetos)

**El problema:** Hacer siempre `new Car()` acopla tu código fuertemente. ¿Qué pasa si necesitas instanciar lógica compleja antes de crear el objeto?

### A. Factory (Fábrica)
En lugar de llamar directamente a `new User()`, llamas a una función fábrica: `UserFactory.createAdmin()`. La fábrica oculta la complejidad (quizás crea el admin, le asigna roles, le inyecta permisos) y te entrega el objeto listo para usar. 

### B. Singleton 
Garantiza que una clase tenga solo **una instancia** en toda la vida del programa y te da un punto global de acceso a ella.
*   **Uso clásico:** La conexión a la base de datos o el logger de errores. No quieres crear 50.000 conectores a la DB en memoria.
*   **El lado oscuro:** Hoy se considera un anti-patrón en muchos círculos porque actúa como una variable global camuflada, haciendo las pruebas unitarias (TDD) una pesadilla.

## 2. Patrones Estructurales (Cómo se conectan los objetos)

**El problema:** Tienes piezas de código antiguo (Legacy) o librerías de terceros que "no encajan" con la arquitectura pulcra que acabas de definir.

### A. Adapter (Adaptador)
*   **Holísticamente:** ¿Has comprado un enchufe europeo y estás en América? Necesitas un adaptador físico.
*   **En Software (The Wrapper Strategy):** Si usas la librería externa `Stripe` para pagos, Stripe expone `Stripe.chargeMoney()`. NO uses eso en las 500 vistas de tu app. Crea una clase propia `MiCobrador` que exponga un método `cobrar()`. Dentro de `cobrar()` haces el puente a `Stripe.chargeMoney()`. Si cambias a PayPal, modificas 1 solo archivo.

### B. Facade (Fachada)
Oculta un sistema inmensamente complejo (imagina un proceso de encoding de video con 20 clases matemáticas) detrás de una única clase simple con una función tonta como `VideoPro.convertir()`. Le presentas al desarrollador junior una "fachada" bonita para que no destruya el sistema interno.

## 3. Patrones de Comportamiento (Cómo se comunican los objetos)

**El problema:** Si 10 botones distintos tienen que reaccionar cuando un dato cambie, ¿hacemos que el dato rastree a los 10 botones? Eso generaría dependencias cruzadas infames.

### A. Observer (Observador / Pub-Sub)
*   **El Rey del Frontend Moderno:** React, Svelte, Vue existen gracias a este paradigma.
*   **Concepto:** Tienes un "Editor" (Ej. El precio del vidrio) y tienes "Suscriptores" (Ej. El texto total de la pantalla, un input de pago, la barra de estado). Cuando el precio muta, el Editor grita "¡CAMBIÉ!", y todos los Suscriptores hacen el trabajo de actualizarse a sí mismos de forma automática. 

### B. Strategy (Estrategia)
Te permite encapsular diferentes algoritmos enteros intercambiables en tiempo de ejecución.
*   **Ejemplo:** Imagina un e-commerce calculando envíos. En lugar del temible `if(FedEx) { ... } else if(UPS) { ... }`, creas objetos clase `CalculoFedex`, `CalculoUPS` que comparten la misma interfaz. El carrito de compras simplemente ejecuta `CurrentStrategy.calcularTarifa()`, inmutando la algoritmia sin romper las sentencias de control lógicas.

---

### Lo más valioso de los patrones
Como Lead Engineer, saber Patrones de Diseño **te da vocabulario**.
En una reunión no dices: "Voy a hacer un archivo central que exporte funciones para conectar la vieja librería a la nueva escondiendo los bugs". Tú dices: *"Voy a implementar el Patrón Adapter con un Facade"*. Y cualquier ingeniero de alto calibre del mundo entenderá tu arquitectura en 3 segundos.
