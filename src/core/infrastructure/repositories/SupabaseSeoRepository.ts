import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@core/types/database.types';
import type { ISeoRepository } from '@core/domain/repositories/ISeoRepository';
import {
  toSlug,
  type SeoSystem,
  type SeoLocation,
  type SeoSystemInput,
  type SeoLocationInput,
} from '@core/domain/seoSchema';

export class SupabaseSeoRepository implements ISeoRepository {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getAllSystems(): Promise<SeoSystem[]> {
    const { data, error } = await this.client.from('seo_systems').select('id, slug, name');

    if (error) {
      console.error('[SupabaseSeoRepository] Error fetching systems:', error);
      throw new Error('No se pudieron obtener los sistemas SEO.');
    }

    return data || [];
  }

  async getAllLocations(): Promise<SeoLocation[]> {
    const { data, error } = await this.client
      .from('seo_locations')
      .select('id, slug, name, department');

    if (error) {
      console.error('[SupabaseSeoRepository] Error fetching locations:', error);
      throw new Error('No se pudieron obtener las ubicaciones SEO.');
    }

    return data || [];
  }

  // ─── CRUD admin (Fase 6) — respeta la política is_admin() de la migración ───

  async createSystem(input: SeoSystemInput): Promise<SeoSystem> {
    const slug = input.slug || toSlug(input.name);
    const { data, error } = await this.client
      .from('seo_systems')
      .insert({ slug, name: input.name })
      .select('id, slug, name')
      .single();

    if (error) {
      console.error('[SupabaseSeoRepository] createSystem error:', error.message);
      throw new Error(
        error.code === '23505'
          ? `Ya existe un sistema con el slug "${slug}".`
          : 'No se pudo crear el sistema SEO.'
      );
    }
    return data;
  }

  async updateSystem(id: string, input: SeoSystemInput): Promise<SeoSystem> {
    const slug = input.slug || toSlug(input.name);
    const { data, error } = await this.client
      .from('seo_systems')
      .update({ slug, name: input.name })
      .eq('id', id)
      .select('id, slug, name')
      .single();

    if (error) {
      console.error('[SupabaseSeoRepository] updateSystem error:', error.message);
      throw new Error('No se pudo actualizar el sistema SEO.');
    }
    return data;
  }

  async deleteSystem(id: string): Promise<void> {
    const { error } = await this.client.from('seo_systems').delete().eq('id', id);
    if (error) {
      console.error('[SupabaseSeoRepository] deleteSystem error:', error.message);
      throw new Error('No se pudo eliminar el sistema SEO.');
    }
  }

  async createLocation(input: SeoLocationInput): Promise<SeoLocation> {
    const slug = input.slug || toSlug(input.name);
    const { data, error } = await this.client
      .from('seo_locations')
      .insert({ slug, name: input.name, department: input.department })
      .select('id, slug, name, department')
      .single();

    if (error) {
      console.error('[SupabaseSeoRepository] createLocation error:', error.message);
      throw new Error(
        error.code === '23505'
          ? `Ya existe una ubicación con el slug "${slug}".`
          : 'No se pudo crear la ubicación SEO.'
      );
    }
    return data;
  }

  async updateLocation(id: string, input: SeoLocationInput): Promise<SeoLocation> {
    const slug = input.slug || toSlug(input.name);
    const { data, error } = await this.client
      .from('seo_locations')
      .update({ slug, name: input.name, department: input.department })
      .eq('id', id)
      .select('id, slug, name, department')
      .single();

    if (error) {
      console.error('[SupabaseSeoRepository] updateLocation error:', error.message);
      throw new Error('No se pudo actualizar la ubicación SEO.');
    }
    return data;
  }

  async deleteLocation(id: string): Promise<void> {
    const { error } = await this.client.from('seo_locations').delete().eq('id', id);
    if (error) {
      console.error('[SupabaseSeoRepository] deleteLocation error:', error.message);
      throw new Error('No se pudo eliminar la ubicación SEO.');
    }
  }
}
