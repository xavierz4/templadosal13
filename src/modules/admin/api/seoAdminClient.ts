/**
 * Cliente HTTP para el panel SEO del admin (REGLA 4 — UI Dumb).
 */
import type { SeoSystem, SeoLocation } from '@core/domain/seoSchema';

export interface SystemResponse {
  success?: boolean;
  system?: SeoSystem;
  error?: string;
}
export interface LocationResponse {
  success?: boolean;
  location?: SeoLocation;
  error?: string;
}
export interface DeleteResponse {
  success?: boolean;
  id?: string;
  error?: string;
}

async function send<T>(url: string, method: string, body?: unknown): Promise<T> {
  try {
    const res = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    return (await res.json()) as T;
  } catch (error: unknown) {
    if (error instanceof Error) console.error('[SeoAdminClient]', method, url, error.message);
    return { error: 'Error de conexión.' } as T;
  }
}

// Sistemas
export const createSystem = (input: { name: string; slug?: string }) =>
  send<SystemResponse>('/api/admin/seo/systems', 'POST', input);
export const updateSystem = (id: string, input: { name: string; slug?: string }) =>
  send<SystemResponse>(`/api/admin/seo/systems/${id}`, 'PATCH', input);
export const deleteSystem = (id: string) =>
  send<DeleteResponse>(`/api/admin/seo/systems/${id}`, 'DELETE');

// Ubicaciones
export const createLocation = (input: { name: string; department: string; slug?: string }) =>
  send<LocationResponse>('/api/admin/seo/locations', 'POST', input);
export const updateLocation = (
  id: string,
  input: { name: string; department: string; slug?: string }
) => send<LocationResponse>(`/api/admin/seo/locations/${id}`, 'PATCH', input);
export const deleteLocation = (id: string) =>
  send<DeleteResponse>(`/api/admin/seo/locations/${id}`, 'DELETE');
