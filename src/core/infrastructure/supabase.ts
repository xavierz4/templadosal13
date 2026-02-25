import { createClient } from '@supabase/supabase-js';

// Usamos import.meta.env para Vite/Astro
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Faltan variables de entorno de Supabase. Revisa tu archivo .env.");
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
