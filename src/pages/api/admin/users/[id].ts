import type { APIRoute } from 'astro';
import { RoleUpdateSchema } from '@core/domain/userAdminSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseProfileRepository } from '@core/infrastructure/repositories/SupabaseProfileRepository';

export const prerender = false;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/**
 * PATCH /api/admin/users/[id] — Cambia el rol de un usuario.
 */
export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const client = createSupabaseServerClient(request, cookies);
  const {
    data: { session },
  } = await client.auth.getSession();
  if (!session) return json({ error: 'No autorizado.' }, 401);

  const { id } = params;
  if (!id) return json({ error: 'ID de usuario requerido.' }, 400);

  // Un admin no puede quitarse el rol a sí mismo (evita auto-bloqueo)
  if (id === session.user.id) {
    return json({ error: 'No puedes cambiar tu propio rol.' }, 400);
  }

  try {
    const body = await request.json();
    const { role } = RoleUpdateSchema.parse(body);

    const repo = new SupabaseProfileRepository(client);
    await repo.updateRole(id, role);

    return json({ success: true, id, role }, 200);
  } catch (error: unknown) {
    const isZodError =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';
    if (isZodError) return json({ error: 'Rol inválido.' }, 400);

    if (error instanceof Error) {
      console.error('[UsersPatch] Error:', { message: error.message, id });
    }
    return json({ error: 'Error interno al actualizar el rol.' }, 500);
  }
};
