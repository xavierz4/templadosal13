import type { LeadPayload } from '../leadSchema';
import type { PhysicsResult } from '../physicsEngine';

/**
 * Puerto Secundario (Outbound Port)
 * Define el contrato estricto sobre cómo disparar notificaciones transaccionales.
 * Evita que el endpoint de la API sepa sobre Resend o Sendgrid.
 */
export interface IEmailService {
  /**
   * Envía la notificación B2B de forma asíncrona "Fire and Forget".
   */
  sendB2BLeadNotification(payload: LeadPayload, physics: PhysicsResult, leadId: string): Promise<void>;
}
