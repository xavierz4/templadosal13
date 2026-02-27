/**
 * Cliente HTTP para autenticación admin (REGLA 4 — UI Dumb).
 *
 * Los componentes Svelte en ui/ NO hacen fetch() directo.
 * Delegan a este módulo api/ para todas las operaciones HTTP.
 */

export interface LoginResponse {
  success?: boolean;
  message?: string;
  error?: string;
  details?: unknown[];
}

/**
 * Autentica al administrador via POST /api/auth/login.
 * @returns LoginResponse con success/error
 */
export async function loginAdmin(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[AuthClient] Network error during login:', { message: error.message });
    }
    return { error: 'Error de conexión. Intente de nuevo.' };
  }
}

/**
 * Cierra la sesión del administrador via POST /api/auth/logout.
 * @returns LoginResponse con success/error
 */
export async function logoutAdmin(): Promise<LoginResponse> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data: LoginResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[AuthClient] Network error during logout:', { message: error.message });
    }
    return { error: 'Error de conexión al cerrar sesión.' };
  }
}
