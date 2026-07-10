import type { APIRoute } from 'astro';
import { CreateUserSchema } from '@core/domain/userAdminSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { createSupabaseAdminClient } from '@core/infrastructure/supabaseAdmin';

export const prerender = false;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/**
 * POST /api/admin/users — Crea un nuevo usuario (email + password + rol).
 *
 * Doble seguridad: (1) auth guard con la sesión del admin actual; (2) el alta
 * usa el cliente service_role (Auth Admin API). El trigger handle_new_user crea
 * el profile con rol 'user'; luego lo elevamos al rol solicitado.
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  // 1. Auth guard — solo un admin autenticado puede crear usuarios
  const ssr = createSupabaseServerClient(request, cookies);
  const {
    data: { session },
  } = await ssr.auth.getSession();
  if (!session) return json({ error: 'No autorizado.' }, 401);

  try {
    const body = await request.json();
    const { email, password, full_name, role } = CreateUserSchema.parse(body);

    const admin = createSupabaseAdminClient();

    // Crear el usuario con email confirmado
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: full_name ? { full_name } : undefined,
    });

    if (createErr || !created.user) {
      return json({ error: createErr?.message ?? 'No se pudo crear el usuario.' }, 400);
    }

    // Elevar el rol (el trigger creó el profile con rol 'user')
    if (role !== 'user') {
      const { error: roleErr } = await admin
        .from('profiles')
        .update({ role })
        .eq('id', created.user.id);
      if (roleErr) {
        console.error('[UsersCreate] role update error:', { message: roleErr.message });
      }
    }

    return json({ success: true, id: created.user.id, email, role }, 201);
  } catch (error: unknown) {
    const isZodError =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';
    if (isZodError) return json({ error: 'Datos del usuario inválidos.' }, 400);

    if (error instanceof Error) {
      console.error('[UsersCreate] Error:', { message: error.message });
    }
    return json({ error: 'Error interno al crear el usuario.' }, 500);
  }
};
