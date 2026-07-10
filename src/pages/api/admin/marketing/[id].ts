import type { APIRoute } from 'astro';
import { ContentUpdateSchema } from '@core/domain/marketingSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseMarketingRepository } from '@core/infrastructure/repositories/SupabaseMarketingRepository';

export const prerender = false;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

async function requireSession(request: Request, cookies: Parameters<APIRoute>[0]['cookies']) {
  const client = createSupabaseServerClient(request, cookies);
  const {
    data: { session },
  } = await client.auth.getSession();
  return session ? client : null;
}

/**
 * PATCH /api/admin/marketing/[id] — editar pieza / cambiar estado
 * (draft→approved→published, o editar hook/body/cta/scheduled_for).
 */
export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const client = await requireSession(request, cookies);
  if (!client) return json({ error: 'No autorizado.' }, 401);

  const { id } = params;
  if (!id) return json({ error: 'ID requerido.' }, 400);

  try {
    const body = await request.json();
    const patch = ContentUpdateSchema.parse(body);

    const repo = new SupabaseMarketingRepository(client);
    const content = await repo.update(id, patch);

    return json({ success: true, content }, 200);
  } catch (error: unknown) {
    const isZodError =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';
    if (isZodError) return json({ error: 'Datos inválidos.' }, 400);

    if (error instanceof Error) {
      console.error('[MarketingPatch] Error:', { message: error.message, id });
    }
    return json({ error: 'Error al actualizar la pieza.' }, 500);
  }
};

/**
 * DELETE /api/admin/marketing/[id] — descartar (soft delete → status='discarded').
 */
export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  const client = await requireSession(request, cookies);
  if (!client) return json({ error: 'No autorizado.' }, 401);

  const { id } = params;
  if (!id) return json({ error: 'ID requerido.' }, 400);

  try {
    const repo = new SupabaseMarketingRepository(client);
    await repo.setStatus(id, 'discarded');
    return json({ success: true, id }, 200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[MarketingDelete] Error:', { message: error.message, id });
    }
    return json({ error: 'Error al descartar la pieza.' }, 500);
  }
};
