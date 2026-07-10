import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  MarketingContent,
  MarketingStatus,
  ContentUpdate,
} from '@core/domain/marketingSchema';

/**
 * Adaptador de Infraestructura — contenido de marketing.
 * Constructor injection del client SSR (con cookies) para respetar RLS admin.
 *
 * Nota: se usa SupabaseClient sin el genérico Database porque la tabla
 * marketing_content es nueva; los tipos se regeneran al aplicar la migración.
 */
export class SupabaseMarketingRepository {
  constructor(private readonly client: SupabaseClient) {}

  async getAll(): Promise<MarketingContent[]> {
    const { data, error } = await this.client
      .from('marketing_content')
      .select('*')
      .neq('status', 'discarded')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[MarketingRepository] getAll error:', { message: error.message });
      throw new Error('Error al cargar el contenido de marketing.');
    }
    return (data ?? []) as MarketingContent[];
  }

  /** Inserta un lote de piezas generadas (en estado draft). Devuelve las filas. */
  async createBatch(
    rows: Array<Omit<MarketingContent, 'id' | 'created_at' | 'status' | 'created_by'>>
  ): Promise<MarketingContent[]> {
    const payload = rows.map((r) => ({ ...r, status: 'draft', created_by: 'ai' }));
    const { data, error } = await this.client.from('marketing_content').insert(payload).select();

    if (error) {
      console.error('[MarketingRepository] createBatch error:', { message: error.message });
      throw new Error('Error al guardar el contenido generado.');
    }
    return (data ?? []) as MarketingContent[];
  }

  async update(id: string, patch: ContentUpdate): Promise<MarketingContent> {
    const { data, error } = await this.client
      .from('marketing_content')
      .update(patch)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[MarketingRepository] update error:', { id, message: error.message });
      throw new Error(`Error al actualizar la pieza ${id}.`);
    }
    return data as MarketingContent;
  }

  /** Descartar = soft delete (status='discarded'), para no perder el historial. */
  async setStatus(id: string, status: MarketingStatus): Promise<void> {
    const { error } = await this.client.from('marketing_content').update({ status }).eq('id', id);

    if (error) {
      console.error('[MarketingRepository] setStatus error:', { id, message: error.message });
      throw new Error(`Error al cambiar el estado de la pieza ${id}.`);
    }
  }
}
