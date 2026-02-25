import type { APIRoute } from 'astro';
import { LeadPayloadSchema } from '../../lib/leadSchema';
import { supabase } from '../../lib/supabase';
import { validateStructuralFeasibility } from '../../lib/physicsEngine';
import { generateB2BEmailHtml } from '../../lib/emailTemplate';
import { Resend } from 'resend';

// Inicializar SDK de Resend con la variable de entorno
const resend = new Resend(import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY);

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

    // Task 3.1.3 & 3.1.4 - Guardar en base de datos previniendo inyección por SDK
    const { data: insertedLead, error: dbError } = await supabase
        .from('leads')
        .insert([{
            product_type: validatedData.productType,
            width_mm: validatedData.width,
            height_mm: validatedData.height,
            glass_color: validatedData.glassColor,
            aluminum_color: validatedData.aluminumColor,
            contact_name: validatedData.contactName,
            company_name: validatedData.companyName,
            phone: validatedData.phone,
            thickness_recommended: physicsFeedback.recommendedThickness,
            status: 'NEW' // Kanban default status
        }])
        .select()
        .single();

    if (dbError) {
        console.error("Supabase Error:", dbError);
        throw new Error("No pudimos guardar los datos en nuestra bóveda.");
    }

    // Task 3.4.1 - Notificaciones Asíncronas Push (Resend SDK)
    // Se ejecuta de manera "Fire-and-Forget" (sin await estricto que bloquee)
    try {
        const emailHtmlTemplate = generateB2BEmailHtml(validatedData, physicsFeedback, insertedLead.id);
        
        resend.emails.send({
            from: 'Sistema AL13 <leads@templadosal13.com>', // Debe ser un dominio verificado
            to: ['ceotemplados@gmail.com'], // TODO: Mover a env var
            subject: `🚨 NUEVO LEAD B2B: ${validatedData.productType.toUpperCase()}`,
            html: emailHtmlTemplate
        }).then((data) => {
             console.log("Email B2B enviado asincronamente:", data);
        }).catch((err) => {
             console.error("Error silencioso enviando correo Resend:", err);
        });
    } catch (e) {
        // Fallar el correo no debe fallar el Lead
        console.error("Fallo crítico iniciando Resend", e);
    }

    return new Response(JSON.stringify({
      message: 'Ingeniería solicitada y Lead guardado con éxito.',
      leadId: insertedLead.id,
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
