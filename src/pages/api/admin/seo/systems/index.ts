import type { APIRoute } from 'astro';
import { SeoSystemInputSchema } from '@core/domain/seoSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseSeoRepository } from '@core/infrastructure/repositories/SupabaseSeoRepository';

export const prerender = false;

const json = (b: unknown, s: number) =>
  new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });

/** POST /api/admin/seo/systems — crea un sistema SEO. */
export const POST: APIRoute = async ({ request, cookies }) => {
  const client = createSupabaseServerClient(request, cookies);
  const {
    data: { session },
  } = await client.auth.getSession();
  if (!session) return json({ error: 'No autorizado.' }, 401);

  try {
    const input = SeoSystemInputSchema.parse(await request.json());
    const repo = new SupabaseSeoRepository(client);
    const system = await repo.createSystem(input);
    return json({ success: true, system }, 201);
  } catch (error: unknown) {
    const isZod =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';
    if (isZod) return json({ error: 'Datos del sistema inválidos.' }, 400);
    const message = error instanceof Error ? error.message : 'Error al crear el sistema.';
    console.error('[SeoSystemsCreate]', message);
    return json({ error: message }, 500);
  }
};
