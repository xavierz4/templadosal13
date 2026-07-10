/**
 * Cliente HTTP para el CRM Admin — Leads (REGLA 4 — UI Dumb)
 *
 * Los componentes Svelte en ui/ NO hacen fetch() directo.
 * Delegan a este módulo para operaciones HTTP del CRM.
 */
import type { AdminLead, LeadStatus, LeadUpdate } from '@core/domain/leadAdminSchema';

export interface UpdateLeadResponse {
  success?: boolean;
  lead?: AdminLead;
  error?: string;
}

export interface DeleteLeadResponse {
  success?: boolean;
  id?: string;
  error?: string;
}

/**
 * Muta el status de un lead en el Kanban (drag & drop).
 * Llama PATCH /api/admin/leads/:id
 */
export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<UpdateLeadResponse> {
  return patchLead(id, { status });
}

/**
 * Edita campos de un lead desde el drawer de detalle.
 * Llama PATCH /api/admin/leads/:id
 */
export async function updateLead(id: string, patch: LeadUpdate): Promise<UpdateLeadResponse> {
  return patchLead(id, patch);
}

async function patchLead(id: string, patch: LeadUpdate): Promise<UpdateLeadResponse> {
  try {
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    return (await response.json()) as UpdateLeadResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[LeadsAdminClient] Network error:', { message: error.message });
    }
    return { error: 'Error de conexión al actualizar el lead.' };
  }
}

/**
 * Elimina un lead. Llama DELETE /api/admin/leads/:id
 */
export async function deleteLead(id: string): Promise<DeleteLeadResponse> {
  try {
    const response = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    return (await response.json()) as DeleteLeadResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[LeadsAdminClient] Network error:', { message: error.message });
    }
    return { error: 'Error de conexión al eliminar el lead.' };
  }
}
