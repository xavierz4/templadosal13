import { config } from '@core/config/env';
import type { IMarketingAgentService } from '@core/domain/services/IMarketingAgentService';
import type {
  GenerateRequest,
  GeneratedPiece,
  MarketingChannel,
} from '@core/domain/marketingSchema';
import { MARKETING_SYSTEM_PROMPT } from '@core/domain/marketingBrandKit';

/**
 * Adaptador de IA — genera contenido con DeepSeek (API compatible con OpenAI).
 *
 * Se eligió DeepSeek por costo. Al ser compatible con OpenAI, se llama por fetch
 * (mismo código en Node y en edge functions Deno, sin SDK extra).
 *
 * Notas:
 *  - El system prompt (brand kit) va como prefijo estable: DeepSeek aplica
 *    context caching automático (sin parámetro), así que ese prefijo se cobra
 *    más barato en llamadas repetidas.
 *  - response_format json_object fuerza salida JSON; validamos la forma nosotros.
 *  - Base URL y modelo son configurables (env) por si se usa otro proveedor.
 */
export class DeepSeekMarketingService implements IMarketingAgentService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly model: string;

  constructor() {
    if (!config.DEEPSEEK_API_KEY) {
      throw new Error(
        'DEEPSEEK_API_KEY no está configurada. El generador de contenido con IA requiere una API key de DeepSeek (pago por uso).'
      );
    }
    this.apiKey = config.DEEPSEEK_API_KEY;
    this.baseUrl = config.DEEPSEEK_BASE_URL.replace(/\/$/, '');
    this.model = config.DEEPSEEK_MODEL;
  }

  async generateContent(request: GenerateRequest): Promise<GeneratedPiece[]> {
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        temperature: 0.8, // algo de creatividad para copy de redes
        // Holgado: deepseek-v4-pro es un modelo de razonamiento y gasta tokens
        // "pensando" antes de emitir el JSON. Poco margen deja respuesta vacía.
        max_tokens: 6000,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: MARKETING_SYSTEM_PROMPT },
          { role: 'user', content: this.buildUserPrompt(request) },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[DeepSeekMarketing] API error:', { status: res.status, detail });
      if (res.status === 401) {
        throw new Error(
          'DeepSeek rechazó la API key (401). Verifica la key y el saldo de la cuenta.'
        );
      }
      throw new Error(`DeepSeek respondió ${res.status}. Intenta de nuevo en un momento.`);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      usage?: {
        prompt_tokens?: number;
        completion_tokens?: number;
        prompt_cache_hit_tokens?: number;
        prompt_cache_miss_tokens?: number;
      };
    };

    if (data.usage) {
      console.warn('[DeepSeekMarketing] usage:', {
        cache_hit: data.usage.prompt_cache_hit_tokens,
        cache_miss: data.usage.prompt_cache_miss_tokens,
        completion: data.usage.completion_tokens,
      });
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('La IA no devolvió contenido.');
    }

    let parsed: { pieces?: unknown };
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error('La IA devolvió un JSON inválido.');
    }

    if (!Array.isArray(parsed.pieces)) {
      throw new Error('La IA devolvió un formato inesperado (falta "pieces").');
    }

    // Validación defensiva de cada pieza (la salida de un LLM no es de fiar del todo).
    return parsed.pieces.map((raw): GeneratedPiece => {
      const p = raw as Partial<GeneratedPiece>;
      return {
        hook: String(p.hook ?? '').trim(),
        body: String(p.body ?? '').trim(),
        hashtags: Array.isArray(p.hashtags) ? p.hashtags.map((h) => String(h)) : [],
        cta: String(p.cta ?? '').trim(),
      };
    });
  }

  private channelBrief(channel: MarketingChannel): string {
    switch (channel) {
      case 'instagram':
        return 'Instagram: gancho fuerte en la 1ª línea, 3-5 líneas de cuerpo, 5-8 hashtags relevantes.';
      case 'facebook':
        return 'Facebook: 2-4 frases informativas, tono cercano y confiable, 2-3 hashtags.';
      case 'linkedin':
        return 'LinkedIn: profesional, dirigido a decisores de obra (arquitectos, constructoras), sin exceso de hashtags (máx 3).';
    }
  }

  private buildUserPrompt(r: GenerateRequest): string {
    const ubic = r.location_slug ? ` en la ubicación "${r.location_slug}"` : '';
    const angle = r.angle ? `\nÁngulo/enfoque solicitado: ${r.angle}` : '';
    return [
      `Genera ${r.count} pieza(s) de contenido para el canal indicado.`,
      `Sistema/producto: "${r.system_slug}"${ubic}.`,
      this.channelBrief(r.channel),
      angle,
      'Cada pieza cierra con un CTA que invita a cotizar o ver el sistema en el sitio (el link se añade aparte, no lo incluyas en el texto).',
      'Responde ÚNICAMENTE con un objeto JSON con esta forma exacta:',
      '{"pieces":[{"hook":"string","body":"string","hashtags":["string"],"cta":"string"}]}',
    ]
      .filter(Boolean)
      .join('\n');
  }
}
