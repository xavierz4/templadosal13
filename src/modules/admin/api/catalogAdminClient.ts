/**
 * Cliente HTTP para el CMS Admin — Catálogo (REGLA 4 — UI Dumb)
 *
 * Los componentes Svelte en ui/ NO hacen fetch() directamente.
 * Delegan a este módulo para todas las operaciones HTTP del CMS.
 */
import type { CatalogCategory } from '@core/domain/catalogSchema';

export interface PresignResponse {
  signedUrl?: string;
  path?: string;
  publicUrl?: string;
  contentType?: string;
  error?: string;
}

export interface CreateProjectResponse {
  success?: boolean;
  project?: { id: string; title: string };
  error?: string;
}

export interface TogglePublishResponse {
  success?: boolean;
  id?: string;
  is_published?: boolean;
  error?: string;
}

export interface DeleteProjectResponse {
  success?: boolean;
  id?: string;
  error?: string;
}

/** Paso 1 de upload: Obtiene URL firmada para subir al bucket */
export async function getPresignedUrl(
  filename: string,
  contentType: string
): Promise<PresignResponse> {
  try {
    const res = await fetch('/api/admin/catalog/presign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, contentType }),
    });
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[CatalogAdminClient] getPresignedUrl error:', { message: error.message });
    }
    return { error: 'Error de conexión al generar URL de subida.' };
  }
}

/** Paso 2 de upload: Sube la imagen directamente al bucket con la URL firmada */
export async function uploadImageToStorage(
  signedUrl: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ ok: boolean; error?: string }> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ ok: true });
      } else {
        resolve({ ok: false, error: `Error de Storage (${xhr.status})` });
      }
    });

    xhr.addEventListener('error', () => {
      resolve({ ok: false, error: 'Error de red al subir la imagen.' });
    });

    xhr.open('PUT', signedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
}

/** Paso 3 de upload: Registra el proyecto en la BD */
export async function createProject(payload: {
  title: string;
  category: CatalogCategory;
  description?: string;
  image_url: string;
  image_path: string;
}): Promise<CreateProjectResponse> {
  try {
    const res = await fetch('/api/admin/catalog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[CatalogAdminClient] createProject error:', { message: error.message });
    }
    return { error: 'Error de conexión al guardar el proyecto.' };
  }
}

/** Toggle publicación de un proyecto */
export async function togglePublish(
  id: string,
  isPublished: boolean
): Promise<TogglePublishResponse> {
  try {
    const res = await fetch(`/api/admin/catalog/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: isPublished }),
    });
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[CatalogAdminClient] togglePublish error:', { message: error.message });
    }
    return { error: 'Error de conexión.' };
  }
}

/** Elimina un proyecto y su imagen del bucket */
export async function deleteProject(id: string, imagePath: string): Promise<DeleteProjectResponse> {
  try {
    const res = await fetch(`/api/admin/catalog/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_path: imagePath }),
    });
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[CatalogAdminClient] deleteProject error:', { message: error.message });
    }
    return { error: 'Error de conexión.' };
  }
}
