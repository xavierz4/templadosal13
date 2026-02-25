

# Módulo 9: Comunicación Asíncrona API y Mutaciones (Resiliencia B2B)

El internet se corta, los microservicios fallan en AWS, un usuario en La Guajira entra a un túnel con su celular cuando justo oprime "Comprar Proyecto". **Asumir que un POST a tu API es exitoso es ingeniería inmadura.**

Una verdadera arquitectura no diseña sobre el "Camino Feliz" (Happy Path), diseña su red asumiendo catástrofes.

## 1. El Formato del Mensajero: REST, tRPC y GraphQL

Durante los últimos 20 años el Software as-a-Service ha debatido de qué forma enviar los JSON en la web.
1.  **Arquitectura RESTful:** El estándar maduro indiscutible de abuelo a nieto. El problema: El *Overfetching* (Pides al endpoint B2B al cliente y el API te devuelve su nombre, y también datos enteros inútiles pesados de transacciones previas).
2.  **GraphQL:** Solucionó el *Overfetching*. El front pide solo lo que necesita en una jerga semántica tipo grafo (`Query { nombre, id }`). El problema: Exigía librerías front gigante (Apollo), mataba las cachés de los servidores Edge CDN que pre-calculaban las URLs obvias, sumando tremenda lentitud inicial.
3.  **tRPC (La Visión Purista Typescript):** Para un monorepo como Templados AL13, es Dios absoluto. En vez de construir endpoints y validarlos asumiendo si están bien (Postman), el Front y el Backend comparten inferencia estática de Tipos. Si cambias "Nombre" por "PrimerNombre" en el backend Supabase, todo el frontend revienta en fase de VSC (compilación) mostrándote el error alfabético antes de mandar tu código B2B.

## 2. Manejo Terminal de Errores: Boundary Catchers

Históricamente, los ingenieros rodearían todo el proyecto de bloques `try { ... } catch (err) { alert(err) }`.
Esta estrategia crea componentes contaminados con miles de condicionales visuales horribles y es insostenible en catálogos gigantes.
*   **La Solución VSA/React/Astro (Error Boundaries):** En vez de programar un bloque Catch asíncrono en cada botón minúsculo, envuelves la pantalla completa (O la *Isla de Svelte* responsable) en un Boundary. 
*   **Efecto:** Si la Base de datos PostgreSQL cae subrepticiamente por un fallo interno y tu "Botón Comprar" revienta las tripas, en vez de pantallazos blancos al usuario (FOUC of Death), el contenedor traba la caída del render en seco y pinta un `<FallbackCard title={"Servicio Congestionado"}/>` pasivo hermoso, resguardando la imagen B2C de la marca.

## 3. Estados Offline In-Memory (Dead Letter Queue Strategy)

¿Qué pasa si ocurre la caída de la Red (WiFi/4G) antes de inyectar el FormData del prospecto B2B valioso (Lead)?
*   **Mala Arquitectura:** Dar pop-up "Falla de RED 503 HTTP", tirar a la basura de V8 todos sus campos de contacto ingresados, y obligarlo a repetirlo (abandono).
*   **Arquitectura de Alta Resiliencia:** 
    1. Persistir el JSON crudo localmente a un Index LocalStorage temporal (o store IndexedDB/Nano atom pasivo). 
    2. Modificar UI con tag de *Reconectando servidor... Envío puesto en Cola Asíncrona*.
    3. Listener escucha evento "online". Envía cola acumulada.

> **Lección de Lead Architect:** El frontend no es solo para "pintar CSS responsivo". Es la principal capa táctica paramétrica (Edge Computing) del proyecto; la zona que mitiga el dolor del usuario cuando la nube de internet entra en agonía transitoria.
