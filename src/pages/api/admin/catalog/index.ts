import type { APIRoute } from 'astro';
import { CatalogProjectInputSchema } from '@core/domain/catalogSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseCatalogRepository } from '@core/infrastructure/repositories/SupabaseCatalogRepository';

export const prerender = false;

/**
 * POST /api/admin/catalog
 *
 * Guarda un nuevo proyecto de catálogo en la BD tras la subida de la imagen.
 * La imagen ya está en Storage cuando se llama este endpoint.
 *
 * Body: { title, category, description?, image_url, image_path }
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  // ── Auth Guard ────────────────────────────────────────────
  const supabaseClient = createSupabaseServerClient(request, cookies);
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    return new Response(JSON.stringify({ error: 'No autorizado.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const validatedInput = CatalogProjectInputSchema.parse(body);

    const catalogRepository = new SupabaseCatalogRepository(supabaseClient);
    const project = await catalogRepository.create(
      validatedInput,
      validatedInput.image_url,
      validatedInput.image_path
    );

    return new Response(JSON.stringify({ success: true, project }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const isZodError =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';

    if (isZodError) {
      const zodErr = error as { errors: unknown[] };
      return new Response(
        JSON.stringify({ error: 'Datos del proyecto inválidos.', details: zodErr.errors }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (error instanceof Error) {
      console.error('[CatalogCreate] Error:', { message: error.message });
    }
    return new Response(JSON.stringify({ error: 'Error al guardar el proyecto.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
