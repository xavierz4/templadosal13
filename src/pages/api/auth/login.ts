import type { APIRoute } from 'astro';
import { LoginPayloadSchema } from '@core/domain/loginSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseAuthService } from '@core/infrastructure/services/SupabaseAuthService';

// SSR obligatorio para auth con cookies
export const prerender = false;

/**
 * POST /api/auth/login
 *
 * Endpoint de autenticación admin. Solo orquesta (REGLA 2):
 * 1. Valida payload con Zod (LoginPayloadSchema)
 * 2. Delega a SupabaseAuthService.signIn()
 * 3. Responde HTTP
 *
 * Las cookies de sesión se inyectan automáticamente via @supabase/ssr.
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const payload = await request.json();

    // Validación Zod (REGLA 5 — sanitización XSS incluida en el schema)
    const validatedData = LoginPayloadSchema.parse(payload);

    // DI: crear client SSR con cookies del request
    const supabaseClient = createSupabaseServerClient(cookies);
    const authService = new SupabaseAuthService(supabaseClient);

    // Delegar autenticación al servicio (Hexagonal — REGLA 2)
    const result = await authService.signIn(validatedData.email, validatedData.password);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: result.error ?? 'Credenciales inválidas.',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Autenticación exitosa.',
        success: true,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: unknown) {
    const isZodError =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';

    if (isZodError) {
      const zodErr = error as { errors: unknown[] };
      return new Response(
        JSON.stringify({
          error: 'Datos de login inválidos.',
          details: zodErr.errors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.error('[Auth Login API] Unexpected error:', error);
    return new Response(
      JSON.stringify({
        error: 'Error interno del servidor de autenticación.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
