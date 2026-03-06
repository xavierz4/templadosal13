import type { ClientLogPayload } from '../clientLogSchema';

/**
 * Contrato del Respositorio de Client Logs
 * Principio SOLID: Inversión de Dependencias (Interface Segregation)
 */
export interface IClientLogRepository {
  /**
   * Ingresa un nuevo log asíncronamente en el sistema gestor.
   * 
   * @param data Payload estructurado validado
   * @param userAgent User-Agent original del navegador reportante
   */
  saveLog(data: ClientLogPayload, userAgent: string): Promise<void>;
}
