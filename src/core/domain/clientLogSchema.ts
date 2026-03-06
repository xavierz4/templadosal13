import { z } from 'zod';

// Función utilitaria anti-XSS básica para sanear strings entrantes
const sanitizeHtml = (str: string) => str.replace(/<\/?[^>]+(>|$)/g, "").trim();

export const ClientLogPayloadSchema = z.object({
  level: z.enum(['error', 'warn', 'info']).default('error'),
  message: z.string().min(1).max(2000).transform(sanitizeHtml),
  source: z.string().max(1000).optional().transform(v => v ? sanitizeHtml(v) : v),
  lineno: z.number().int().nonnegative().optional(),
  colno: z.number().int().nonnegative().optional(),
  error_stack: z.string().max(5000).optional().transform(v => v ? sanitizeHtml(v) : v),
  url: z.string().url().max(1000).optional(),
});

export type ClientLogPayload = z.infer<typeof ClientLogPayloadSchema>;
