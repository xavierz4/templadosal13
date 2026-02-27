/**
 * Tipos de dominio para el CMS Catálogo (Task 4.3)
 *
 * CatalogProject: forma completa de un proyecto leído de la BD
 * CatalogProjectInput: payload del formulario de creación (validado con Zod)
 */
import { z } from 'zod';

// Reutiliza el mismo enum de productos del quoter (OCP — sin modificar domains existentes)
export const CATALOG_CATEGORIES = [
  'cabina_ducha',
  'divisor_oficina',
  'fachada_monumental',
  'puerta_pivotante',
] as const;

export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number];

/** Proyecto de catálogo completo (1:1 con la tabla catalog_projects) */
export interface CatalogProject {
  id: string;
  title: string;
  category: CatalogCategory;
  description: string | null;
  image_url: string;
  image_path: string;
  is_published: boolean;
  created_at: string;
}

// Función anti-XSS (REGLA 5 — sanitizeHtml en todo campo de texto libre)
const sanitizeHtml = (str: string) => str.replace(/<\/?[^>]+(>|$)/g, '').trim();

/** Zod schema para el payload de creación desde el formulario admin */
export const CatalogProjectInputSchema = z.object({
  title: z.string().min(3).max(255).transform(sanitizeHtml),
  category: z.enum(CATALOG_CATEGORIES),
  description: z
    .string()
    .max(2000)
    .optional()
    .transform((val) => (val ? sanitizeHtml(val) : val)),
  image_url: z.string().url('URL de imagen inválida'),
  image_path: z.string().min(1, 'Path de imagen requerido'),
});

export type CatalogProjectInput = z.infer<typeof CatalogProjectInputSchema>;

/** Zod schema para presign request */
export const PresignRequestSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z
    .string()
    .regex(/^image\/(jpeg|png|webp|avif)$/, 'Solo se aceptan imágenes jpeg, png, webp o avif'),
});

export type PresignRequest = z.infer<typeof PresignRequestSchema>;

/** Zod schema para toggle publish */
export const TogglePublishSchema = z.object({
  is_published: z.boolean(),
});
