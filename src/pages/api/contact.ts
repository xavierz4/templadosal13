export const prerender = false;
import type { APIRoute } from 'astro';
import { ContactPayloadSchema } from '@core/domain/contactSchema';

// Dependency Injection
import { SupabaseContactRepository } from '@core/infrastructure/repositories/SupabaseContactRepository';
import { ResendEmailService } from '@core/infrastructure/services/ResendEmailService';

const contactRepository = new SupabaseContactRepository();
const emailService = new ResendEmailService();

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    const validatedData = ContactPayloadSchema.parse(payload);

    // Save to DB
    const { id: insertedContactId } = await contactRepository.saveContact(validatedData);

    // Fire-and-Forget Email
    emailService.sendContactNotification(validatedData, insertedContactId);

    return new Response(JSON.stringify({
      message: 'Mensaje corporativo recibido exitosamente.',
      contactId: insertedContactId,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    const isZodError = typeof error === 'object' && error !== null && (error as { name?: string }).name === 'ZodError';

    if (isZodError) {
        const zodErr = error as { errors: unknown[] };
        return new Response(JSON.stringify({
            error: 'Campos de entrada inválidos o faltantes.',
            details: zodErr.errors
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    console.error('Error procesando Contacto B2B:', error);
    return new Response(JSON.stringify({
      error: 'Error interno procesando su mensaje de contacto.',
      debug: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
