import type { SupabaseClient } from '@supabase/supabase-js';
import type { IAuthService, AuthResult } from '@core/domain/services/IAuthService';

/**
 * Adaptador de Infraestructura para Supabase Auth (GoTrue).
 * 
 * Implementa IAuthService (REGLA 2 — Hexagonal / Dependency Inversion).
 * Recibe SupabaseClient por constructor para DI con cookies del request.
 * 
 * Patrón: pages/api/auth/* → IAuthService → SupabaseAuthService → Supabase GoTrue
 */
export class SupabaseAuthService implements IAuthService {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      const { error } = await this.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.warn('[AuthService] Login failed:', { email, error: error.message });
        return { success: false, error: error.message };
      }

      console.warn('[AuthService] Login successful:', { email });
      return { success: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('[AuthService] Unexpected error during signIn:', { message: error.message });
        return { success: false, error: 'Error interno de autenticación.' };
      }
      console.error('[AuthService] Unknown error during signIn:', { error });
      return { success: false, error: 'Error desconocido de autenticación.' };
    }
  }

  async signOut(): Promise<void> {
    try {
      const { error } = await this.client.auth.signOut();

      if (error) {
        console.warn('[AuthService] SignOut error:', { error: error.message });
        throw new Error('No se pudo cerrar la sesión.');
      }

      console.warn('[AuthService] SignOut successful');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('[AuthService] Unexpected error during signOut:', { message: error.message });
        throw error;
      }
      console.error('[AuthService] Unknown error during signOut:', { error });
      throw new Error('Error desconocido al cerrar sesión.');
    }
  }
}
