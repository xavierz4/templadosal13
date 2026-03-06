import { supabase } from '@core/infrastructure/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { IContactRepository } from '@core/domain/repositories/IContactRepository';
import type { ContactPayload } from '@core/domain/contactSchema';

export class SupabaseContactRepository implements IContactRepository {
  private readonly client: SupabaseClient;

  constructor(client?: SupabaseClient) {
    this.client = client ?? supabase;
  }

  async saveContact(payload: ContactPayload): Promise<{ id: string }> {
    const generatedId = crypto.randomUUID();
    const { error: dbError } = await this.client
      .from('leads')
      .insert([
        {
          id: generatedId,
          product_type: 'CONTACTO_GENERAL',
          customer_name: payload.name,
          customer_phone: payload.phone,
          measurements: {}, 
          notes: `Email: ${payload.email} | Mensaje: ${payload.message}`,
          status: 'NUEVO',
        },
      ]);

    if (dbError) {
      console.error('[SupabaseContactRepository] saveContact error:', { message: dbError.message });
      throw new Error('No pudimos guardar el mensaje en nuestra bóveda.');
    }

    return { id: generatedId };
  }
}
