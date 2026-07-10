import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@core/types/database.types';
import type { IAnalyticsRepository } from '@core/domain/repositories/IAnalyticsRepository';
import type { AnalyticsRPCResponse, SourceAnalyticsResponse } from '@core/domain/analyticsSchema';

export class SupabaseAnalyticsRepository implements IAnalyticsRepository {
  /**
   * REGLA 2: Constructor Injection.
   * Pasamos el SupabaseClient ya instanciado desde Astro SSR con cookies validadas.
   */
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async getDashboardAnalytics(): Promise<AnalyticsRPCResponse> {
    const { data, error } = await this.supabase
      .rpc('get_dashboard_analytics')
      .returns<AnalyticsRPCResponse>();

    if (error) {
      console.error('[SupabaseAnalyticsRepository] Failed to fetch BI telemetry:', error);
      throw new Error(`Analytics Fetch Error: ${error.message}`);
    }

    return data || [];
  }

  async getSourceAnalytics(): Promise<SourceAnalyticsResponse> {
    const { data, error } = await this.supabase
      .rpc('get_source_analytics')
      .returns<SourceAnalyticsResponse>();

    if (error) {
      console.error('[SupabaseAnalyticsRepository] Failed to fetch source attribution:', error);
      throw new Error(`Source Analytics Fetch Error: ${error.message}`);
    }

    return data || [];
  }
}
