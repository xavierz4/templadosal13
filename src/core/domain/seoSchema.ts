import { z } from 'zod';

export const SeoSystemSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
});

export const SeoLocationSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  department: z.string(),
});

export type SeoSystem = z.infer<typeof SeoSystemSchema>;
export type SeoLocation = z.infer<typeof SeoLocationSchema>;

// Normaliza a slug: minúsculas, sin acentos, espacios → guiones.
const toSlug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const stripHtml = (s: string) => s.replace(/<\/?[^>]+(>|$)/g, '').trim();

/** Alta/edición de un sistema SEO. El slug se deriva del nombre si no se da. */
export const SeoSystemInputSchema = z.object({
  name: z.string().min(2).max(200).transform(stripHtml),
  slug: z
    .string()
    .max(120)
    .optional()
    .transform((v) => (v ? toSlug(v) : undefined)),
});
export type SeoSystemInput = z.infer<typeof SeoSystemInputSchema>;

/** Alta/edición de una ubicación SEO. */
export const SeoLocationInputSchema = z.object({
  name: z.string().min(2).max(200).transform(stripHtml),
  department: z.string().min(2).max(200).transform(stripHtml),
  slug: z
    .string()
    .max(120)
    .optional()
    .transform((v) => (v ? toSlug(v) : undefined)),
});
export type SeoLocationInput = z.infer<typeof SeoLocationInputSchema>;

export { toSlug };
