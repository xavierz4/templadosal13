import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@core/types/database.types';
import type { AdminUser, UserRole } from '@core/domain/userAdminSchema';

/**
 * Adaptador de Infraestructura — Gestión de usuarios (Fase 5).
 *
 * Constructor injection del client SSR (con cookies JWT) para respetar RLS.
 * La lista de usuarios se lee vía RPC get_admin_users (une el email de
 * auth.users, no accesible por la anon key). El cambio de rol usa la política
 * de UPDATE admin sobre profiles.
 */
export class SupabaseProfileRepository {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getAll(): Promise<AdminUser[]> {
    const { data, error } = await this.client.rpc('get_admin_users');

    if (error) {
      console.error('[ProfileRepository] getAll error:', { message: error.message });
      throw new Error('Error al cargar los usuarios.');
    }

    return (data ?? []) as AdminUser[];
  }

  async updateRole(id: string, role: UserRole): Promise<void> {
    const { error } = await this.client.from('profiles').update({ role }).eq('id', id);

    if (error) {
      console.error('[ProfileRepository] updateRole error:', { id, role, message: error.message });
      throw new Error(`Error al actualizar el rol del usuario ${id}.`);
    }
  }
}
