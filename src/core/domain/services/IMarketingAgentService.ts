import type { GenerateRequest, GeneratedPiece } from '@core/domain/marketingSchema';

/**
 * Puerto secundario — Agente de contenido de marketing (Hexagonal / REGLA 2).
 * Implementado por AnthropicMarketingService (infra). El endpoint no conoce el
 * proveedor de IA, solo este contrato.
 */
export interface IMarketingAgentService {
  /**
   * Genera N piezas de contenido para el canal/sistema/ubicación dados.
   * Devuelve solo el contenido creativo; el link con UTMs lo calcula la capa
   * de aplicación (dominio puro, sin efectos).
   */
  generateContent(request: GenerateRequest): Promise<GeneratedPiece[]>;
}
