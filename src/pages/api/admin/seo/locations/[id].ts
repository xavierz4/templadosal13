import type { APIRoute } from 'astro';
import { SeoLocationInputSchema } from '@core/domain/seoSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseSeoRepository } from '@core/infrastructure/repositories/SupabaseSeoRepository';

export const prerender = false;

const json = (b: unknown, s: number) =>
  new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });

async function guard(request: Request, cookies: Parameters<APIRoute>[0]['cookies']) {
  const client = createSupabaseServerClient(request, cookies);
  const {
    data: { session },
  } = await client.auth.getSession();
  return session ? client : null;
}

/** PATCH /api/admin/seo/locations/[id] — edita una ubicación. */
export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const client = await guard(request, cookies);
  if (!client) return json({ error: 'No autorizado.' }, 401);
  const { id } = params;
  if (!id) return json({ error: 'ID requerido.' }, 400);

  try {
    const input = SeoLocationInputSchema.parse(await request.json());
    const repo = new SupabaseSeoRepository(client);
    const location = await repo.updateLocation(id, input);
    return json({ success: true, location }, 200);
  } catch (error: unknown) {
    const isZod =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';
    if (isZod) return json({ error: 'Datos inválidos.' }, 400);
    const message = error instanceof Error ? error.message : 'Error al actualizar.';
    console.error('[SeoLocationsPatch]', message);
    return json({ error: message }, 500);
  }
};

/** DELETE /api/admin/seo/locations/[id] — elimina una ubicación. */
export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  const client = await guard(request, cookies);
  if (!client) return json({ error: 'No autorizado.' }, 401);
  const { id } = params;
  if (!id) return json({ error: 'ID requerido.' }, 400);

  try {
    const repo = new SupabaseSeoRepository(client);
    await repo.deleteLocation(id);
    return json({ success: true, id }, 200);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error al eliminar.';
    console.error('[SeoLocationsDelete]', message);
    return json({ error: message }, 500);
  }
};
