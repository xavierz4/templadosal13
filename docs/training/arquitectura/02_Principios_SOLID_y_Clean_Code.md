

# Módulo 2: Los Principios Inquebrantables (SOLID & Clean Code)

El código no se escribe para que lo entiendan las máquinas. Las máquinas entienden unos y ceros. **El código se escribe para que lo entiendan otros humanos** (o tu "yo" del futuro en 6 meses). 

## 1. Clean Code (El Pacto de Lectura)
Robert C. Martin (Uncle Bob) popularizó la idea de que ser programador es ser un cirujano. Si un médico no se lava las manos argumentando que "no tiene tiempo", es negligencia. En software, escribir código sucio por entregar rápido, también lo es.

**Reglas Básicas:**
*   **The Zero-Ambiguity Policy (Naming):** El nombre de la variable debe responder: por qué existe, qué hace y cómo se usa. Borra variables como `d` o `data`. Usa `elapsedTimeInDays`.
*   **Funciones diminutas:** Una función debe hacer **una sola cosa**, hacerla bien, y hacer solo eso. Si tu función pasa de 20 líneas, alerta roja.
*   **No comentarios:** "Un mal código no se explica con comentarios, se reescribe."

## 2. Los 5 Mandamientos: S.O.L.I.D.
Para evitar que los sistemas orientados a objetos colapsaran, Uncle Bob recopiló 5 principios matemáticos de diseño de software.

### S - Single Responsibility Principle (SRP)
*"Una clase (o módulo, o archivo) debe tener solo una razón para cambiar."*
*   **El Error:** Un componente `Factura.svelte` que calcula el IVA, guarda en la base de datos y manda un correo. (Si cambia la ley de impuestos, tienes que tocar la UI).
*   **La Solución:** Modularizar. `CalculadoraImpuestos` hace la matemática, `FacturaRepo` guarda en DB, y `Factura.svelte` solo pinta.

### O - Open/Closed Principle (OCP)
*"Las entidades deben estar abiertas para extensión, pero cerradas para modificación."*
*   **El Error:** Un archivo `pagos.ts` con un `if (tipo == 'paypal') {...} else if (tipo == 'stripe') {...}`. Cada vez que añades un medio de pago, tienes que abrir y tocar ese archivo central, arriesgando romper los demás.
*   **La Solución:** Polimorfismo. Creas una interfaz genérica y nuevas clases que se "enchufan" sin tocar el núcleo (Arquitectura de Plugins).

### L - Liskov Substitution Principle (LSP)
*"Las clases derivadas deben poder sustituir a sus clases base sin romper el programa."*
*   **El Ejemplo Clásico:** Tienes una clase `Ave` con el método `volar()`. Creas la clase `Pinguino` que hereda de `Ave` pero si llamas a `Pinguino.volar()` lanza un error. Rompiste Liskov. (La herencia estaba mal planteada; no todas las aves vuelan).

### I - Interface Segregation Principle (ISP)
*"Ningún cliente debe verse obligado a depender de métodos que no usa."*
*   **El Error:** Tener un "Usuario" masivo que tiene métodos `caminar()`, `hablar()`, `dispararRayosLaser()`. Y obligas a un campesino del juego a implementar eso.
*   **La Solución:** Interfaces diminutas y focalizadas.

### D - Dependency Inversion Principle (DIP)
*(El más importante para Arquitecturas Avanzadas como HSA)*
*"Los módulos de alto nivel no deben depender de los módulos de bajo nivel. Ambos deben depender de abstracciones."*
*   **El Error:** Que tu lógica de negocios (Alto Nivel) llame directamente a `Supabase.insert()` (Bajo nivel). Estás casado con Supabase.
*   **La Solución:** Inyección de Dependencias (DI). Al inicio de la app, le pasas a la lógica un "Adaptador" que cumple con las reglas. Si mañana cambias de base de datos, el núcleo no se entera.

### Conclusión
Si dominas SOLID, dejas de ser un "Junior que programa" y te conviertes en un Ingeniero de Software. Es el paso previo obligado antes de hablar de Patrones de Diseño.
