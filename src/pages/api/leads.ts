import type { APIRoute } from 'astro';
import { LeadPayloadSchema } from '@core/domain/leadSchema';
import { validateStructuralFeasibility } from '@core/domain/physicsEngine';

// Dependency Injection (Instanciación de Adapters de Infraestructura)
import { SupabaseLeadRepository } from '@core/infrastructure/repositories/SupabaseLeadRepository';
import { ResendEmailService } from '@core/infrastructure/services/ResendEmailService';

const leadRepository = new SupabaseLeadRepository();
const emailService = new ResendEmailService();

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parsea el cuerpo del request a JSON
    const payload = await request.json();

    // Task 3.1.2 - Validar Payload JSON con Zod
    const validatedData = LeadPayloadSchema.parse(payload);

    // Calculate physics values natively to prevent client tampering
    const physicsFeedback = validateStructuralFeasibility({
        width: validatedData.width,
        height: validatedData.height,
        productType: validatedData.productType
    });

    if (!physicsFeedback.isValid) {
        return new Response(JSON.stringify({
            error: "Medidas imposibles. " + physicsFeedback.explanation
          }), {
            status: 422,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Task 3.1.3 & 3.1.4 - Guardar en base de datos mediante el Repositorio (Inversión de Dependencia)
    const { id: insertedLeadId } = await leadRepository.saveLead(validatedData, physicsFeedback);

    // Task 3.4.1 - Notificaciones Asíncronas Push delegadas al Servicio (Fire-and-Forget)
    emailService.sendB2BLeadNotification(validatedData, physicsFeedback, insertedLeadId);

    return new Response(JSON.stringify({
      message: 'Ingeniería solicitada y Lead guardado con éxito.',
      leadId: insertedLeadId,
      physics: physicsFeedback
    }), {
      status: 201, // Status Created
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error: any) {
    if (error.name === 'ZodError') {
         // Errores de validación de Zod
        return new Response(JSON.stringify({
            error: 'Campos de entrada inválidos o faltantes.',
            details: error.errors
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    console.error('Error procesando Lead B2B:', error);
    return new Response(JSON.stringify({
      error: 'Error interno del validador procesador de la API.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

