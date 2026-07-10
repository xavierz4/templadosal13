import Anthropic from '@anthropic-ai/sdk';
import { config } from '@core/config/env';
import type { IMarketingAgentService } from '@core/domain/services/IMarketingAgentService';
import {
  GENERATED_BATCH_JSON_SCHEMA,
  type GenerateRequest,
  type GeneratedPiece,
  type MarketingChannel,
} from '@core/domain/marketingSchema';
import { MARKETING_SYSTEM_PROMPT } from '@core/domain/marketingBrandKit';

/**
 * Adaptador de IA — genera contenido con Claude (Sonnet 4.6).
 *
 * Optimización de costo:
 *  - El system prompt (brand kit) va como bloque CACHEADO (cache_control): cada
 *    generación reusa ese prefijo a ~0.1x de costo. Verificable con
 *    usage.cache_read_input_tokens > 0.
 *  - effort "low" + thinking disabled: la redacción no es tarea de razonamiento;
 *    esto reduce latencia y tokens.
 *  - structured outputs (output_config.format): la respuesta ya viene como JSON
 *    validado contra el schema, sin parsing frágil.
 */
export class AnthropicMarketingService implements IMarketingAgentService {
  private readonly client: Anthropic;

  constructor() {
    if (!config.ANTHROPIC_API_KEY) {
      throw new Error(
        'ANTHROPIC_API_KEY no está configurada. El generador de contenido con IA requiere una API key de Anthropic (pago por uso).'
      );
    }
    this.client = new Anthropic({ apiKey: config.ANTHROPIC_API_KEY });
  }

  async generateContent(request: GenerateRequest): Promise<GeneratedPiece[]> {
    const userPrompt = this.buildUserPrompt(request);

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      thinking: { type: 'disabled' },
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: GENERATED_BATCH_JSON_SCHEMA },
      },
      system: [
        {
          type: 'text',
          text: MARKETING_SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: userPrompt }],
    });

    // Log de eficiencia de caché (no bloquea).
    if (response.usage) {
      console.warn('[MarketingService] usage:', {
        cache_read: response.usage.cache_read_input_tokens,
        cache_write: response.usage.cache_creation_input_tokens,
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
      });
    }

    const textBlock = response.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('La IA no devolvió contenido de texto.');
    }

    const parsed = JSON.parse(textBlock.text) as { pieces?: GeneratedPiece[] };
    if (!parsed.pieces || !Array.isArray(parsed.pieces)) {
      throw new Error('La IA devolvió un formato inesperado.');
    }
    return parsed.pieces;
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
      'Cada pieza debe cerrar con un CTA que invite a cotizar o ver el sistema en el sitio web (el link se añade aparte, no lo incluyas en el texto).',
      'Devuelve el resultado en el formato JSON solicitado.',
    ]
      .filter(Boolean)
      .join('\n');
  }
}
