/**
 * marketingSchema.ts — Tipos de dominio del módulo de marketing con IA.
 */
import { z } from 'zod';

export const MARKETING_CHANNELS = ['instagram', 'facebook', 'linkedin'] as const;
export type MarketingChannel = (typeof MARKETING_CHANNELS)[number];

export const MARKETING_STATUSES = ['draft', 'approved', 'published', 'discarded'] as const;
export type MarketingStatus = (typeof MARKETING_STATUSES)[number];

/** Fila completa de marketing_content (1:1 con la tabla). */
export interface MarketingContent {
  id: string;
  channel: MarketingChannel;
  system_slug: string | null;
  location_slug: string | null;
  angle: string | null;
  hook: string;
  body: string;
  hashtags: string[];
  cta: string | null;
  target_url: string | null;
  status: MarketingStatus;
  scheduled_for: string | null;
  created_by: string;
  created_at: string;
}

/** Petición de generación desde el admin. */
export const GenerateRequestSchema = z.object({
  channel: z.enum(MARKETING_CHANNELS),
  system_slug: z.string().min(1),
  location_slug: z.string().min(1).optional(),
  angle: z.string().max(200).optional(),
  count: z.number().int().min(1).max(5).default(3),
});
export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

/**
 * Forma de una pieza generada por el LLM (structured output). El servicio la
 * combina con el target_url calculado antes de persistir.
 */
export interface GeneratedPiece {
  hook: string;
  body: string;
  hashtags: string[];
  cta: string;
}

/** JSON Schema para output_config.format (structured outputs de Claude). */
export const GENERATED_BATCH_JSON_SCHEMA = {
  type: 'object',
  properties: {
    pieces: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          hook: { type: 'string' },
          body: { type: 'string' },
          hashtags: { type: 'array', items: { type: 'string' } },
          cta: { type: 'string' },
        },
        required: ['hook', 'body', 'hashtags', 'cta'],
        additionalProperties: false,
      },
    },
  },
  required: ['pieces'],
  additionalProperties: false,
} as const;

/** Schema para actualizar el estado / editar una pieza desde el admin. */
export const ContentUpdateSchema = z
  .object({
    hook: z.string().min(1).max(500).optional(),
    body: z.string().min(1).max(4000).optional(),
    cta: z.string().max(300).nullable().optional(),
    status: z.enum(MARKETING_STATUSES).optional(),
    scheduled_for: z.string().datetime().nullable().optional(),
  })
  .refine((o) => Object.keys(o).length > 0, { message: 'Nada para actualizar.' });
export type ContentUpdate = z.infer<typeof ContentUpdateSchema>;

/**
 * Construye el link de la landing con UTMs — así el embudo queda cerrado: el post
 * lleva a la página SEO/catálogo y el lead que se capture trae la atribución.
 */
export function buildTargetUrl(
  channel: MarketingChannel,
  systemSlug: string,
  locationSlug?: string
): string {
  const base = 'https://templados-al13.com';
  // Ruta SEO programática si hay ubicación; si no, el catálogo filtrado.
  const path = locationSlug ? `/catalogo/${systemSlug}/${locationSlug}` : `/catalogo`;
  const campaign = locationSlug ? `${systemSlug}_${locationSlug}` : systemSlug;
  const params = new URLSearchParams({
    utm_source: channel,
    utm_medium: 'social',
    utm_campaign: campaign,
  });
  return `${base}${path}?${params.toString()}`;
}
