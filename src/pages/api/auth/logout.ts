import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseAuthService } from '@core/infrastructure/services/SupabaseAuthService';

// SSR obligatorio para auth con cookies
export const prerender = false;

/**
 * POST /api/auth/logout
 * 
 * Cierra la sesión del administrador y limpia cookies.
 * Solo orquesta (REGLA 2): delega a SupabaseAuthService.signOut()
 */
export const POST: APIRoute = async ({ cookies }) => {
  try {
    const supabaseClient = createSupabaseServerClient(cookies);
    const authService = new SupabaseAuthService(supabaseClient);

    await authService.signOut();

    return new Response(JSON.stringify({
      message: 'Sesión cerrada exitosamente.',
      success: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[Auth Logout API] Error:', { message: error.message });
    } else {
      console.error('[Auth Logout API] Unknown error:', { error });
    }

    return new Response(JSON.stringify({
      error: 'Error al cerrar la sesión.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
