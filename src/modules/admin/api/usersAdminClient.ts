/**
 * Cliente HTTP para la gestión de usuarios del Admin (REGLA 4 — UI Dumb).
 */
import type { UserRole } from '@core/domain/userAdminSchema';

export interface UserActionResponse {
  success?: boolean;
  id?: string;
  error?: string;
}

/** Cambia el rol de un usuario. PATCH /api/admin/users/:id */
export async function updateUserRole(id: string, role: UserRole): Promise<UserActionResponse> {
  try {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[UsersAdminClient] updateUserRole error:', { message: error.message });
    }
    return { error: 'Error de conexión al actualizar el rol.' };
  }
}

/** Crea un nuevo usuario. POST /api/admin/users */
export async function createUser(payload: {
  email: string;
  password: string;
  full_name?: string;
  role: UserRole;
}): Promise<UserActionResponse> {
  try {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[UsersAdminClient] createUser error:', { message: error.message });
    }
    return { error: 'Error de conexión al crear el usuario.' };
  }
}
