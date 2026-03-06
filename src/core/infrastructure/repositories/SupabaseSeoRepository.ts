import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@core/types/database.types';
import type { ISeoRepository } from '@core/domain/repositories/ISeoRepository';
import type { SeoSystem, SeoLocation } from '@core/domain/seoSchema';

export class SupabaseSeoRepository implements ISeoRepository {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getAllSystems(): Promise<SeoSystem[]> {
    const { data, error } = await this.client
      .from('seo_systems')
      .select('id, slug, name');
    
    if (error) {
      console.error("[SupabaseSeoRepository] Error fetching systems:", error);
      throw new Error("No se pudieron obtener los sistemas SEO.");
    }
    
    return data || [];
  }

  async getAllLocations(): Promise<SeoLocation[]> {
    const { data, error } = await this.client
      .from('seo_locations')
      .select('id, slug, name, department');
    
    if (error) {
      console.error("[SupabaseSeoRepository] Error fetching locations:", error);
      throw new Error("No se pudieron obtener las ubicaciones SEO.");
    }
    
    return data || [];
  }
}
