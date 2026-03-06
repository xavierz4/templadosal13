import type { APIRoute } from 'astro';
import { ClientLogPayloadSchema } from '@core/domain/clientLogSchema';
import { SupabaseClientLogRepository } from '@core/infrastructure/repositories/SupabaseClientLogRepository';

export const prerender = false;

/**
 * ENDPOINT: POST /api/logs
 * 
 * Propósito: Gateway seguro para recibir reporte de excepciones
 * emitidas por los navegadores cliente.
 * Regla AL13: Fire-and-Forget, nunca lanza 500 para evitar loops
 * infinitos en el lado del cliente y overhead innecesario.
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const rawData = await request.json();
    
    // Zod Parsing: Drop silenciosamente payload malformado (bot noise)
    const result = ClientLogPayloadSchema.safeParse(rawData);
    if (!result.success) {
      return new Response(null, { status: 204 }); 
    }

    const payload = result.data;
    const userAgent = request.headers.get('user-agent') ?? 'Unknown JS Agent';

    // Inyección de dependencias estricta (Infraestructura via DOMAIN)
    const repository = new SupabaseClientLogRepository(request, cookies);

    // Mandato REGLA 14 (Fire-and-forget resiliencia):
    // El await se usa para que el worker cloudflare persista en BD antes
    // de que se mate el contexto (lifeycle SSR), pero capturamos el
    // crash local aquí para asegurar siempre retornar 204
    await repository.saveLog(payload, userAgent).catch(e => {
        console.warn("[API Logs] Falla al delegar BD client log:", e.message);
    });

    // Siempre retornar 204 No Content, la menor carga posible.
    return new Response(null, { status: 204 });
  } catch (_e) {
    // Si la lectura del JSON revienta, aborta silenciosamente
    return new Response(null, { status: 204 });
  }
};
