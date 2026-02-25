import { z } from 'zod';

// Define the expected strict typing for our environment variables
const envSchema = z.object({
  // Supabase (Obligatory)
  PUBLIC_SUPABASE_URL: z.string().url("Debe ser una URL válida de Supabase"),
  PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Anon Key requerida"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(), // Opcional, solo en scripts admin puros

  // Resend (Obligatory for transactional emails)
  RESEND_API_KEY: z.string().startsWith("re_", "Resend Key debe empezar con re_")
});

// Extraemos las variables del entorno (Astro y Node proveen diferentes vías)
// Nota: en Vite/Astro, import.meta.env tiene precedencia, pero process.env se usa en testing/scripts
const processEnv = {
    PUBLIC_SUPABASE_URL: import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY: import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY: import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY
};

// Fail Fast: Si el schema no pasa, el servidor explota antes de intentar enviar un email o leer DB
const envParseResult = envSchema.safeParse(processEnv);

if (!envParseResult.success) {
    console.error("❌ GRAVE ERROR DE CONFIGURACIÓN ENTORNO ❌");
    console.error("Faltan variables de entorno esenciales o están mal formadas:");
    envParseResult.error.issues.forEach(issue => {
        console.error(`- ${issue.path[0]}: ${issue.message}`);
    });
    // Crash the process intentionally so it does not boot broken
    process.exit(1); 
}

// Export a strictly typed, fully validated configuration constant
export const config = envParseResult.data;
