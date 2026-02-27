import type { SupabaseClient } from '@supabase/supabase-js';
import type { ICatalogRepository } from '@core/domain/repositories/ICatalogRepository';
import type { CatalogProject, CatalogProjectInput } from '@core/domain/catalogSchema';

/**
 * Adaptador de Infraestructura — Catálogo CMS (Task 4.3)
 *
 * Implementa ICatalogRepository usando el SDK de Supabase.
 * DI constructor: acepta client SSR (con cookies JWT) para endpoints admin.
 */
export class SupabaseCatalogRepository implements ICatalogRepository {
  constructor(private readonly client: SupabaseClient) {}

  async getAll(): Promise<CatalogProject[]> {
    const { data, error } = await this.client
      .from('catalog_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[CatalogRepository] getAll error:', { message: error.message });
      throw new Error('Error al cargar el catálogo.');
    }

    return (data ?? []) as CatalogProject[];
  }

  async getPublished(): Promise<CatalogProject[]> {
    const { data, error } = await this.client
      .from('catalog_projects')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[CatalogRepository] getPublished error:', { message: error.message });
      throw new Error('Error al cargar el catálogo público.');
    }

    return (data ?? []) as CatalogProject[];
  }

  async create(
    input: CatalogProjectInput,
    imageUrl: string,
    imagePath: string
  ): Promise<CatalogProject> {
    const { data, error } = await this.client
      .from('catalog_projects')
      .insert([
        {
          title: input.title,
          category: input.category,
          description: input.description ?? null,
          image_url: imageUrl,
          image_path: imagePath,
          is_published: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('[CatalogRepository] create error:', { message: error.message });
      throw new Error('Error al guardar el proyecto en el catálogo.');
    }

    return data as CatalogProject;
  }

  async togglePublish(id: string, isPublished: boolean): Promise<void> {
    const { error } = await this.client
      .from('catalog_projects')
      .update({ is_published: isPublished })
      .eq('id', id);

    if (error) {
      console.error('[CatalogRepository] togglePublish error:', { id, message: error.message });
      throw new Error(`Error al actualizar publicación del proyecto ${id}.`);
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from('catalog_projects').delete().eq('id', id);

    if (error) {
      console.error('[CatalogRepository] delete error:', { id, message: error.message });
      throw new Error(`Error al eliminar el proyecto ${id}.`);
    }
  }
}
