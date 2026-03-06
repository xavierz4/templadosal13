import { z } from 'zod';

export const SeoSystemSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string()
});

export const SeoLocationSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  department: z.string()
});

export type SeoSystem = z.infer<typeof SeoSystemSchema>;
export type SeoLocation = z.infer<typeof SeoLocationSchema>;
