import type { APIRoute } from 'astro';
import { PresignRequestSchema } from '@core/domain/catalogSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseStorageService } from '@core/infrastructure/storage/SupabaseStorageService';

export const prerender = false;

/**
 * POST /api/admin/catalog/presign
 *
 * Genera una URL firmada de upload directo al bucket de Storage.
 * El cliente usará esta URL para subir la imagen sin pasar por Node.js.
 *
 * Body: { filename: string, contentType: "image/jpeg|png|webp|avif" }
 * Response: { signedUrl, path, publicUrl }
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
    const { filename, contentType } = PresignRequestSchema.parse(body);

    const storageService = new SupabaseStorageService(supabaseClient);
    const result = await storageService.createPresignedUploadUrl(filename);

    return new Response(
      JSON.stringify({
        signedUrl: result.signedUrl,
        path: result.path,
        publicUrl: result.publicUrl,
        contentType,
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
      return new Response(JSON.stringify({ error: 'Filename o contentType inválido.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (error instanceof Error) {
      console.error('[CatalogPresign] Error:', { message: error.message });
    }
    return new Response(JSON.stringify({ error: 'Error al generar URL de subida.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
