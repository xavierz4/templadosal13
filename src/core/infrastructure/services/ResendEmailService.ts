import { Resend } from 'resend';
import { config } from '../../config/env';
import { generateB2BEmailHtml } from '../emailTemplate';
import type { IEmailService } from '../../domain/services/IEmailService';
import type { LeadPayload } from '../../domain/leadSchema';
import type { PhysicsResult } from '../../domain/physicsEngine';

// Instanciación aislada
const resend = new Resend(config.RESEND_API_KEY);

/**
 * Adaptador de Infraestructura para Resend (Email Provider)
 */
export class ResendEmailService implements IEmailService {
  async sendB2BLeadNotification(payload: LeadPayload, physics: PhysicsResult, leadId: string): Promise<void> {
      try {
          const emailHtmlTemplate = generateB2BEmailHtml(payload, physics, leadId);
          
          resend.emails.send({
              from: 'Sistema AL13 <leads@templadosal13.com>', 
              to: ['ceotemplados@gmail.com'], // TODO: Centralizar
              subject: `🚨 NUEVO LEAD B2B: ${payload.productType.toUpperCase()}`,
              html: emailHtmlTemplate
          }).then((data) => {
               console.log("Email B2B enviado asincronamente:", data);
          }).catch((err) => {
               console.error("Error silencioso enviando correo Resend:", err);
          });
      } catch (e) {
          // Fallo interno del compilador de plantillas, la ejecución del endpoint sobrevive.
          console.error("Fallo crítico iniciando servicio de plantillas de correo Resend", e);
      }
  }
}
