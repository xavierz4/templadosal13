import type { AnalyticsRPCResponse } from '../analyticsSchema';

/**
 * Interface Repository para abstraer las consultas de BI Analytics.
 * SOLID (Dependency Inversion): La UI y páginas web no hablan con BD directamente.
 */
export interface IAnalyticsRepository {
  /**
   * Obtiene la matriz completa generada por la vista de agregación y el RPC.
   * Cero matemática local, el backend ya filtró la suma y el conteo.
   */
  getDashboardAnalytics(): Promise<AnalyticsRPCResponse>;
}
