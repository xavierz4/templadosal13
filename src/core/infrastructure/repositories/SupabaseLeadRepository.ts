import { supabase } from '@core/infrastructure/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { ILeadRepository } from '@core/domain/repositories/ILeadRepository';
import type { LeadPayload } from '@core/domain/leadSchema';
import type { PhysicsResult } from '@core/domain/physicsEngine';
import type { AdminLead, LeadStatus } from '@core/domain/leadAdminSchema';

/**
 * Adaptador de Infraestructura para Supabase (Database Repository)
 *
 * Implementa ILeadRepository (REGLA 2 — Hexagonal / Dependency Inversion).
 * Acepta opcionalmente un client SSR inyectado (para endpoints admin con cookies JWT).
 * Sin client inyectado, usa el client anónimo público (para leads del validador).
 */
export class SupabaseLeadRepository implements ILeadRepository {
  private readonly client: SupabaseClient;

  /**
   * @param client - Client Supabase SSR (con cookies) para rutas admin.
   *                 Si no se pasa, usa el client público anónimo.
   */
  constructor(client?: SupabaseClient) {
    // DI: si se inyecta un client SSR, usarlo; si no, usar el anónimo
    this.client = client ?? supabase;
  }

  // ─── Método existente (Task 3.x) ─────────────────────────────────────────
  async saveLead(payload: LeadPayload, physics: PhysicsResult): Promise<{ id: string }> {
    const generatedId = crypto.randomUUID();
    const { error: dbError } = await this.client
      .from('leads')
      .insert([
        {
          id: generatedId,
          product_type: payload.productType,
          customer_name: payload.contactName,
          customer_phone: payload.phone,
          measurements: {
            width_mm: payload.width,
            height_mm: payload.height,
            glass_color: payload.glassColor,
            aluminum_color: payload.aluminumColor,
            thickness_recommended: physics.recommendedThickness,
          },
          notes: payload.companyName ? `Empresa: ${payload.companyName}` : null,
          status: 'NUEVO',
          utm_source: payload.utmSource,
          utm_campaign: payload.utmCampaign,
        },
      ]);

    if (dbError) {
      console.error('[LeadRepository] saveLead error:', { message: dbError.message });
      throw new Error('No pudimos guardar los datos en nuestra bóveda.');
    }

    return { id: generatedId };
  }

  // ─── Nuevos métodos para el Admin CRM (Task 4.2) ─────────────────────────

  /**
   * Retorna todos los leads para el panel admin Kanban.
   * Ordenados por created_at DESC (más recientes primero).
   */
  async getAll(): Promise<AdminLead[]> {
    const { data, error } = await this.client
      .from('leads')
      .select(
        'id, customer_name, customer_phone, product_type, notes, status, created_at, measurements'
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[LeadRepository] getAll error:', { message: error.message });
      throw new Error('Error al obtener los leads del CRM.');
    }

    return (data ?? []) as AdminLead[];
  }

  /**
   * Muta el status de un lead en el Kanban.
   * Usado por PATCH /api/admin/leads/[id].
   */
  async updateStatus(id: string, status: LeadStatus): Promise<void> {
    const { error } = await this.client.from('leads').update({ status }).eq('id', id);

    if (error) {
      console.error('[LeadRepository] updateStatus error:', { id, status, message: error.message });
      throw new Error(`Error al actualizar el status del lead ${id}.`);
    }
  }
}
