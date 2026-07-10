import { createClient } from '@supabase/supabase-js';
import { config } from '@core/config/env';
import type { Database } from '@core/types/database.types';

/**
 * Cliente Supabase con service_role (bypass RLS + Auth Admin API).
 *
 * SOLO para operaciones que la anon key no puede hacer, p. ej. crear usuarios
 * (auth.admin.createUser). NUNCA exponer al cliente ni usar en rutas sin auth
 * guard: la service_role salta TODAS las políticas de seguridad.
 */
export function createSupabaseAdminClient() {
  if (!config.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY no configurada en el entorno.');
  }
  return createClient<Database>(config.PUBLIC_SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
