import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@core/types/database.types';
import type { ClientLog } from '@core/domain/clientLogSchema';

/**
 * Adaptador de lectura de client_logs para el dashboard de errores del admin
 * (Fase 7). Constructor injection del client SSR (con cookies) — la RLS de la
 * migración 20260304200000 ya restringe la lectura a admins.
 *
 * Distinto de SupabaseClientLogRepository (que solo escribe desde el tracker).
 */
export class SupabaseAdminLogRepository {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getRecent(limit = 200): Promise<ClientLog[]> {
    const { data, error } = await this.client
      .from('client_logs')
      .select('id, level, message, source, lineno, colno, error_stack, url, user_agent, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[AdminLogRepository] getRecent error:', { message: error.message });
      throw new Error('Error al cargar los logs de errores.');
    }
    return (data ?? []) as ClientLog[];
  }
}
