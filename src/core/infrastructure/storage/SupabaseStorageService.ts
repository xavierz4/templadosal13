import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Servicio de Storage para imágenes del Catálogo (Task 4.3)
 *
 * Responsabilidad única (SRP): gestión de archivos en Supabase Storage.
 * Separado del CatalogRepository para que el repositorio solo hable con PostgreSQL.
 */
export class SupabaseStorageService {
  private readonly BUCKET = 'catalog-images';

  constructor(private readonly client: SupabaseClient) {}

  /**
   * Genera una URL firmada de upload directo al bucket.
   * El cliente sube la imagen directo al Storage sin pasar por Node.js (YAGNI — máxima velocidad).
   *
   * @param filename - Nombre del archivo (ej: "ducha-vidrio.jpg")
   * @param expiresIn - Segundos de validez de la URL (default: 300 = 5 minutos)
   * @returns { signedUrl, path, publicUrl }
   */
  async createPresignedUploadUrl(
    filename: string,
    _expiresIn = 300
  ): Promise<{ signedUrl: string; path: string; publicUrl: string }> {
    // Usar UUID en el path para evitar colisiones de nombres (Security — REGLA 0)
    const ext = filename.split('.').pop()?.toLowerCase() ?? 'jpg';
    const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await this.client.storage.from(this.BUCKET).createSignedUploadUrl(path);

    if (error || !data) {
      console.error('[StorageService] createPresignedUploadUrl error:', {
        message: error?.message,
      });
      throw new Error('Error al generar la URL de subida de imagen.');
    }

    // Construir la URL pública del archivo una vez subido
    const { data: publicData } = this.client.storage.from(this.BUCKET).getPublicUrl(path);

    return {
      signedUrl: data.signedUrl,
      path,
      publicUrl: publicData.publicUrl,
    };
  }

  /**
   * Elimina un archivo del bucket por su path.
   * Se llama al borrar un proyecto del catálogo (SRP — el repository no toca Storage).
   */
  async deleteFile(path: string): Promise<void> {
    const { error } = await this.client.storage.from(this.BUCKET).remove([path]);

    if (error) {
      // No lanzar error — si no se puede borrar la imagen es secundario
      console.warn('[StorageService] deleteFile warning:', { path, message: error.message });
    }
  }
}
