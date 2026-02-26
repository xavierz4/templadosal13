import { supabase } from '@core/infrastructure/supabase';
import type { ILeadRepository } from '@core/domain/repositories/ILeadRepository';
import type { LeadPayload } from '@core/domain/leadSchema';
import type { PhysicsResult } from '@core/domain/physicsEngine';


/**
 * Adaptador de Infraestructura para Supabase (Database Repository)
 */
export class SupabaseLeadRepository implements ILeadRepository {
  async saveLead(payload: LeadPayload, physics: PhysicsResult): Promise<{ id: string }> {
      const { data: insertedLead, error: dbError } = await supabase
          .from('leads')
          .insert([{
              product_type: payload.productType,
              customer_name: payload.contactName,
              customer_phone: payload.phone,
              measurements: {
                  width_mm: payload.width,
                  height_mm: payload.height,
                  glass_color: payload.glassColor,
                  aluminum_color: payload.aluminumColor,
                  thickness_recommended: physics.recommendedThickness
              },
              notes: payload.companyName ? `Empresa: ${payload.companyName}` : null,
              status: 'NUEVO' // Asumiendo Enum de BDD
          }])
          .select()
          .single();

      if (dbError) {
          console.error("Supabase Error [LeadRepository]:", dbError);
          throw new Error("No pudimos guardar los datos en nuestra bóveda.");
      }

      return { id: insertedLead.id };
  }
}
