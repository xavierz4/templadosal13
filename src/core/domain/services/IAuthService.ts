import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Resultado de una operación de autenticación.
 */
export interface AuthResult {
  success: boolean;
  error?: string;
}

/**
 * Puerto de Autenticación — Contrato abstracto para Auth.
 * Implementado por SupabaseAuthService en infrastructure/.
 *
 * Sigue el patrón Hexagonal (REGLA 2):
 * pages/api/auth/* → IAuthService → SupabaseAuthService → Supabase Auth SDK
 */
export interface IAuthService {
  /**
   * Autentica un usuario con email y password.
   * @returns AuthResult con success/error
   */
  signIn(email: string, password: string): Promise<AuthResult>;

  /**
   * Cierra la sesión del usuario autenticado.
   */
  signOut(): Promise<void>;
}

/**
 * Factory type para crear IAuthService con un SupabaseClient inyectado.
 * Permite que el endpoint inyecte el client con cookies del request.
 */
export type AuthServiceFactory = (client: SupabaseClient) => IAuthService;
