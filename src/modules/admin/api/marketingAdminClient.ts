/**
 * Cliente HTTP para el módulo de marketing (REGLA 4 — UI Dumb).
 */
import type {
  MarketingContent,
  GenerateRequest,
  ContentUpdate,
} from '@core/domain/marketingSchema';

export interface GenerateResponse {
  success?: boolean;
  content?: MarketingContent[];
  error?: string;
}

export interface UpdateResponse {
  success?: boolean;
  content?: MarketingContent;
  error?: string;
}

/** Genera un lote de contenido. POST /api/admin/marketing/generate */
export async function generateContent(req: GenerateRequest): Promise<GenerateResponse> {
  try {
    const res = await fetch('/api/admin/marketing/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[MarketingAdminClient] generate error:', { message: error.message });
    }
    return { error: 'Error de conexión al generar contenido.' };
  }
}

/** Edita / cambia estado de una pieza. PATCH /api/admin/marketing/:id */
export async function updateContent(id: string, patch: ContentUpdate): Promise<UpdateResponse> {
  try {
    const res = await fetch(`/api/admin/marketing/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[MarketingAdminClient] update error:', { message: error.message });
    }
    return { error: 'Error de conexión al actualizar.' };
  }
}

/** Descarta una pieza. DELETE /api/admin/marketing/:id */
export async function discardContent(id: string): Promise<{ success?: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/admin/marketing/${id}`, { method: 'DELETE' });
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[MarketingAdminClient] discard error:', { message: error.message });
    }
    return { error: 'Error de conexión al descartar.' };
  }
}
