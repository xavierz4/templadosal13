/**
 * Cliente HTTP para el CRM Admin — Leads (REGLA 4 — UI Dumb)
 *
 * Los componentes Svelte en ui/ NO hacen fetch() directo.
 * Delegan a este módulo para operaciones HTTP del CRM.
 */
import type { LeadStatus } from '@core/domain/leadAdminSchema';

export interface UpdateStatusResponse {
  success?: boolean;
  id?: string;
  status?: string;
  error?: string;
}

/**
 * Muta el status de un lead en el Kanban.
 * Llama PATCH /api/admin/leads/:id
 */
export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<UpdateStatusResponse> {
  try {
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    const data: UpdateStatusResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[LeadsAdminClient] Network error:', { message: error.message });
    }
    return { error: 'Error de conexión al actualizar el lead.' };
  }
}
