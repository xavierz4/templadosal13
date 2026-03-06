import type { IClientLogRepository } from '@core/domain/repositories/IClientLogRepository';
import type { ClientLogPayload } from '@core/domain/clientLogSchema';
import { createSupabaseServerClient } from '../supabaseServer';

/**
 * Adaptador Concreto para Supabase (Infraestructura)
 */
export class SupabaseClientLogRepository implements IClientLogRepository {
  private request: Request;
  private cookies: any; // Type 'AstroCookies' would require importing from Astro but any is safest here if we don't have it

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(request: Request, cookies: any) {
    this.request = request;
    this.cookies = cookies;
  }

  async saveLog(data: ClientLogPayload, userAgent: string): Promise<void> {
    // Al instanciar sin cookies válidas, forzamos usar ANON para escribir.
    const supabase = createSupabaseServerClient(this.request, this.cookies);

    // TODO: [TECH-002] Remove `any` cast after regenerating types.
    // Causa: La tabla "client_logs" es nueva; los tipos en database.types.ts (generados desde la nube)
    // aún no la contienen. Resolver: Al ejecutar `supabase gen types typescript`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('client_logs')
      .insert({
        level: data.level,
        message: data.message,
        source: data.source,
        lineno: data.lineno,
        colno: data.colno,
        error_stack: data.error_stack,
        url: data.url,
        user_agent: userAgent,
      });

    if (error) {
      // Fail Loudly en los logs del servidor (Edge/Node), pero la app sobrevive.
      console.error("[ClientLogRepository] Fallo silencioso insertando cliente log:", error.message);
      throw new Error(`DB Insert Error: ${error.message}`);
    }
  }
}
