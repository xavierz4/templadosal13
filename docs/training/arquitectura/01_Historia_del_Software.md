

# Módulo 1: La Era Oscura y el Nacimiento de las Reglas

Para entender por qué hoy aplicamos inyección de dependencias o interfaces, primero debemos entender el dolor de la historia. Las reglas de arquitectura no nacieron de la teoría, nacieron de la **sangre y los fallos críticos**.

## 1. La Crisis del Software (Años 60)
En los inicios de la computación, el hardware (los transistores gigantes y las cintas magnéticas) costaba millones de dólares, mientras que los programadores eran "baratos". 
Se programaba para exprimir cada byte de memoria, importando poco si el código era legible.

El resultado fue lo que la OTAN bautizó en 1968 como la **Crisis del Software**:
- Proyectos que costaban 3 veces su presupuesto original.
- Sistemas que se caían, cobrando vidas (Sistemas médicos de radiación como el Therac-25).
- Código tan enredado que cuando el creador renunciaba, la empresa tenía que tirar el software a la basura porque nadie más lo entendía.

## 2. GOTO y el Código Espagueti
Antes de las funciones, los ciclos `for` o las clases, existía el comando `GOTO` (Ir a).
Le decías a la computadora: *"Ejecuta la línea 1, luego la 2, y si pasa algo, GOTO línea 500"*.

Esto creaba el infame **Código Espagueti**:
Imagina leer un libro donde la página 5 te dice "Ve a la página 90", pero la 90 te dice "Si tienes 18 años, ve a la 12, sino vuelve a la 3". El flujo de ejecución era un plato de pasta enredado. Era imposible de seguir mentalmente.

## 3. La Programación Estructurada (La primera salvación)
En 1968, Edsger W. Dijkstra escribió un artículo brutal: *"La sentencia GO TO considerada dañina"*.
Él propuso quemar el GOTO y reemplazarlo por estructuras limitadas:
1.  **Secuencia:** El código se lee de arriba a abajo.
2.  **Selección:** `if / else`.
3.  **Iteración:** `while / for`.

**El impacto:** De repente, el código se volvió predecible. Esto sentó las bases de lenguajes gigantes como C.

## 4. La Revolución Orientada a Objetos (OOP)
A medida que las aplicaciones crecían (interfaces gráficas en los 80s y 90s), la programación estructurada se quedó corta. Tener funciones sueltas y datos globales generaba choques.

Alan Kay y otros pioneros impulsaron la **Orientación a Objetos**.
La idea era holística: **"Simulemos el mundo real"**.
- Un `Coche` no es solo un montón de variables sueltas. Es un "Objeto" que tiene *Estado* (color, marca) y *Comportamiento* (acelerar, frenar).
- **Encapsulamiento:** Ocultamos los cables del motor. Si quieres que el coche acelere, llamas a `coche.acelerar()`. No manipulas su carburador desde afuera.

La OOP fue la herramienta que permitió construir los grandes sistemas operativos y aplicaciones empresariales de los últimos 30 años (Java, C#, C++).

### El Problema de la OOP
La OOP nos salvó, pero nos sedujo. Comenzamos a crear jerarquías de herencia ridículas: `Perro hereda de Mamífero que hereda de Animal que hereda de Organismo`. Cuando queríamos una "Banana", el lenguaje nos obligaba a cargar con "El Gorila que sostiene la Banana y toda la Selva".

De este dolor, de sistemas rígidamente acoplados, nacieron los **Principios de Diseño** que veremos en el siguiente módulo.
