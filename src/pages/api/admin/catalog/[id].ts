import type { APIRoute } from 'astro';
import { TogglePublishSchema } from '@core/domain/catalogSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseCatalogRepository } from '@core/infrastructure/repositories/SupabaseCatalogRepository';
import { SupabaseStorageService } from '@core/infrastructure/storage/SupabaseStorageService';

export const prerender = false;

/**
 * PATCH /api/admin/catalog/[id]  — Toggle publicación del proyecto
 * DELETE /api/admin/catalog/[id] — Elimina proyecto + imagen del bucket
 */

// ── Shared Auth Guard ─────────────────────────────────────────────────────
async function getAuthenticatedClient(cookies: Parameters<APIRoute>[0]['cookies']) {
  const client = createSupabaseServerClient(cookies);
  const {
    data: { session },
  } = await client.auth.getSession();
  return { client, session };
}

const UNAUTHORIZED = new Response(JSON.stringify({ error: 'No autorizado.' }), {
  status: 401,
  headers: { 'Content-Type': 'application/json' },
});

// ── PATCH — Toggle is_published ───────────────────────────────────────────
export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const { client, session } = await getAuthenticatedClient(cookies);
  if (!session) return UNAUTHORIZED;

  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID requerido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { is_published } = TogglePublishSchema.parse(body);

    const catalogRepository = new SupabaseCatalogRepository(client);
    await catalogRepository.togglePublish(id, is_published);

    return new Response(JSON.stringify({ success: true, id, is_published }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const isZodError =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';
    if (isZodError) {
      return new Response(JSON.stringify({ error: 'Payload inválido.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (error instanceof Error) {
      console.error('[CatalogPatch] Error:', { message: error.message, id });
    }
    return new Response(JSON.stringify({ error: 'Error al actualizar el proyecto.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// ── DELETE — Elimina proyecto + imagen del bucket ─────────────────────────
export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  const { client, session } = await getAuthenticatedClient(cookies);
  if (!session) return UNAUTHORIZED;

  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID requerido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Leer el image_path antes de borrar (necesitamos el path para borrar del bucket)
    const body = await request.json().catch(() => ({}));
    const imagePath = (body as { image_path?: string }).image_path;

    const catalogRepository = new SupabaseCatalogRepository(client);
    await catalogRepository.delete(id);

    // Borrar imagen del bucket (fire-and-check — secundario, no bloquea respuesta)
    if (imagePath) {
      const storageService = new SupabaseStorageService(client);
      await storageService.deleteFile(imagePath);
    }

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[CatalogDelete] Error:', { message: error.message, id });
    }
    return new Response(JSON.stringify({ error: 'Error al eliminar el proyecto.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
