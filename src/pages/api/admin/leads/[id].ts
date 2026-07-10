import type { APIRoute } from 'astro';
import { LeadUpdateSchema } from '@core/domain/leadAdminSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseLeadRepository } from '@core/infrastructure/repositories/SupabaseLeadRepository';

export const prerender = false;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/** Auth guard compartido: devuelve el client SSR o null si no hay sesión. */
async function requireSession(request: Request, cookies: Parameters<APIRoute>[0]['cookies']) {
  const supabaseClient = createSupabaseServerClient(request, cookies);
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  return session ? supabaseClient : null;
}

/**
 * PATCH /api/admin/leads/[id]
 *
 * Edita campos de un lead (nombre, teléfono, producto, notas, valor, status).
 * Sirve tanto para el drag&drop del Kanban ({status}) como para el drawer de
 * detalle (campos completos). Solo orquesta (REGLA 2): auth → Zod → repo.
 */
export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const supabaseClient = await requireSession(request, cookies);
  if (!supabaseClient) return json({ error: 'No autorizado.' }, 401);

  const { id } = params;
  if (!id) return json({ error: 'ID del lead requerido.' }, 400);

  try {
    const body = await request.json();
    const patch = LeadUpdateSchema.parse(body);

    const leadRepository = new SupabaseLeadRepository(supabaseClient);
    const lead = await leadRepository.update(id, patch);

    return json({ success: true, lead }, 200);
  } catch (error: unknown) {
    const isZodError =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';

    if (isZodError) return json({ error: 'Datos del lead inválidos.' }, 400);

    if (error instanceof Error) {
      console.error('[LeadsAdmin PATCH] Error:', { message: error.message, id });
    }
    return json({ error: 'Error interno al actualizar el lead.' }, 500);
  }
};

/**
 * DELETE /api/admin/leads/[id] — elimina un lead del CRM.
 */
export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  const supabaseClient = await requireSession(request, cookies);
  if (!supabaseClient) return json({ error: 'No autorizado.' }, 401);

  const { id } = params;
  if (!id) return json({ error: 'ID del lead requerido.' }, 400);

  try {
    const leadRepository = new SupabaseLeadRepository(supabaseClient);
    await leadRepository.delete(id);
    return json({ success: true, id }, 200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[LeadsAdmin DELETE] Error:', { message: error.message, id });
    }
    return json({ error: 'Error interno al eliminar el lead.' }, 500);
  }
};
