import { Resend } from 'resend';
import { config } from '@core/config/env';
import { generateB2BEmailHtml } from '@core/infrastructure/emailTemplate';
import type { IEmailService } from '@core/domain/services/IEmailService';
import type { LeadPayload } from '@core/domain/leadSchema';
import type { ContactPayload } from '@core/domain/contactSchema';
import type { PhysicsResult } from '@core/domain/physicsEngine';


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
               console.warn("[EmailService] Email B2B enviado asincrónamente:", data);
          }).catch((err) => {
               console.error("Error silencioso enviando correo Resend:", err);
          });
      } catch (e) {
          // Fallo interno del compilador de plantillas, la ejecución del endpoint sobrevive.
          console.error("Fallo crítico iniciando servicio de plantillas de correo Resend", e);
      }
  }

  async sendContactNotification(payload: ContactPayload, contactId: string): Promise<void> {
    try {
        const emailHtmlTemplate = `
        <div style="font-family: sans-serif; color: #111;">
          <h2>NUEVA CONSULTA CORPORATIVA - AL13</h2>
          <p><strong>De:</strong> ${payload.name}</p>
          <p><strong>Teléfono:</strong> ${payload.phone}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <br/>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="background: #f4f4f5; padding: 15px; border-left: 4px solid #06b6d4;">
             ${payload.message}
          </blockquote>
          <hr/>
          <p style="font-size: 11px; color: #666;">ID Registro: ${contactId}</p>
        </div>`;
        
        resend.emails.send({
            from: 'Sistema AL13 <leads@templadosal13.com>', 
            to: ['ceotemplados@gmail.com'], 
            subject: `📧 CONSULTA CORPORATIVA B2B: ${payload.name}`,
            html: emailHtmlTemplate
        }).then((data) => {
             console.warn("[EmailService] Contacto B2B notificado asincrónamente:", data);
        }).catch((err) => {
             console.error("Error silencioso enviando correo Resend (Contacto):", err);
        });
    } catch (e) {
        console.error("Fallo crítico iniciando notificación de contacto Resend", e);
    }
  }
}
