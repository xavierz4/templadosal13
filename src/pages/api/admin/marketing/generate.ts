import type { APIRoute } from 'astro';
import { GenerateRequestSchema, buildTargetUrl } from '@core/domain/marketingSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseMarketingRepository } from '@core/infrastructure/repositories/SupabaseMarketingRepository';
import { DeepSeekMarketingService } from '@core/infrastructure/services/DeepSeekMarketingService';

export const prerender = false;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/**
 * POST /api/admin/marketing/generate
 *
 * Genera un lote de contenido con IA y lo guarda como borradores.
 * Orquesta (REGLA 2): auth → Zod → servicio IA → dominio (UTMs) → repositorio.
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient(request, cookies);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return json({ error: 'No autorizado.' }, 401);

  try {
    const body = await request.json();
    const req = GenerateRequestSchema.parse(body);

    // 1. Generar contenido creativo con la IA
    const service = new DeepSeekMarketingService();
    const pieces = await service.generateContent(req);

    // 2. Cerrar el embudo: cada pieza lleva su link con UTMs (dominio puro)
    const targetUrl = buildTargetUrl(req.channel, req.system_slug, req.location_slug);
    const rows = pieces.map((p) => ({
      channel: req.channel,
      system_slug: req.system_slug,
      location_slug: req.location_slug ?? null,
      angle: req.angle ?? null,
      hook: p.hook,
      body: p.body,
      hashtags: p.hashtags,
      cta: p.cta,
      target_url: targetUrl,
      scheduled_for: null,
    }));

    // 3. Persistir como borradores
    const repo = new SupabaseMarketingRepository(supabase);
    const created = await repo.createBatch(rows);

    return json({ success: true, content: created }, 201);
  } catch (error: unknown) {
    const isZodError =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';
    if (isZodError) return json({ error: 'Parámetros de generación inválidos.' }, 400);

    const message = error instanceof Error ? error.message : 'Error al generar contenido.';
    // Mensaje de la falta de API key llega tal cual (útil para el admin).
    const isConfigError = message.includes('DEEPSEEK_API_KEY');
    console.error('[MarketingGenerate] Error:', { message });
    return json({ error: message }, isConfigError ? 503 : 500);
  }
};
