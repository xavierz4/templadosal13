import type { APIRoute } from 'astro';
import { LeadStatusUpdateSchema } from '@core/domain/leadAdminSchema';
import { createSupabaseServerClient } from '@core/infrastructure/supabaseServer';
import { SupabaseLeadRepository } from '@core/infrastructure/repositories/SupabaseLeadRepository';

export const prerender = false;

/**
 * PATCH /api/admin/leads/[id]
 *
 * Muta el status de un Lead en el Kanban CRM (Task 4.2).
 * Solo orquesta (REGLA 2):
 *   1. Auth guard — sesión JWT obligatoria
 *   2. Zod — valida { status: LeadStatus }
 *   3. Repositorio — updateStatus(id, status)
 */
export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  // ── Auth Guard (mismo patrón que AdminLayout) ─────────────
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

  // ── Extraer y validar el ID del lead ─────────────────────
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID del lead requerido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();

    // Zod: valida que status sea un enum válido (REGLA 5)
    const { status } = LeadStatusUpdateSchema.parse(body);

    // DI: repositorio con client SSR autenticado
    const leadRepository = new SupabaseLeadRepository(supabaseClient);
    await leadRepository.updateStatus(id, status);

    return new Response(JSON.stringify({ success: true, id, status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const isZodError =
      typeof error === 'object' &&
      error !== null &&
      (error as { name?: string }).name === 'ZodError';

    if (isZodError) {
      return new Response(JSON.stringify({ error: 'Status inválido.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (error instanceof Error) {
      console.error('[LeadsAdmin PATCH] Error:', { message: error.message, id });
    }

    return new Response(JSON.stringify({ error: 'Error interno al actualizar el lead.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
