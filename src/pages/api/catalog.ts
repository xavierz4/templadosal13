/**
 * GET /api/catalog — Public catalog endpoint (no auth required)
 * REGLA 2: Pages/API layer only validates, orchestrates, and responds.
 * REGLA 14 (Resiliencia): Returns empty array on DB error — never blocks client render.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseCatalogRepository } from '@core/infrastructure/repositories/SupabaseCatalogRepository';

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    const supabase = createSupabaseServerClient(request, cookies);
    const catalogRepository = new SupabaseCatalogRepository(supabase);
    const projects = await catalogRepository.getPublished();

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache aggressively in CDN, revalidate in background
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error: unknown) {
    console.error('[API /catalog] Failed to fetch published projects:', {
      error: error instanceof Error ? error.message : String(error),
    });
    // REGLA 14: Secondary failure → return empty array, never 500
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
