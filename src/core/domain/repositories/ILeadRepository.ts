import type { LeadPayload } from '../leadSchema';
import type { PhysicsResult } from '../physicsEngine';

/**
 * Puerto Secundario (Outbound Port)
 * Define el contrato estricto sobre cómo el núcleo interactúa 
 * con cualquier base de datos de persistencia de Leads, sin importar
 * si es Supabase, AWS, o MongoDB.
 */
export interface ILeadRepository {
  /**
   * Persiste un lead estructuralmente validado.
   * @throws Error si falla la persistencia.
   */
  saveLead(payload: LeadPayload, physics: PhysicsResult): Promise<{ id: string }>;
}
