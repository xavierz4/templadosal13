import type { LeadPayload } from '../leadSchema';
import type { PhysicsResult } from '../physicsEngine';
import type { AdminLead, LeadStatus } from '../leadAdminSchema';

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

  /**
   * Retorna todos los leads para el panel admin CRM (Task 4.2).
   * Ordenados por created_at DESC.
   */
  getAll(): Promise<AdminLead[]>;

  /**
   * Muta el status de un lead en el Kanban (Task 4.2).
   * @throws Error si el lead no existe o falla la persistencia.
   */
  updateStatus(id: string, status: LeadStatus): Promise<void>;
}
