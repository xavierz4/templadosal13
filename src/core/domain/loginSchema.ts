import { z } from 'zod';

// Función utilitaria anti-XSS básica para sanear strings entrantes (REGLA 5)
const sanitizeHtml = (str: string) => str.replace(/<\/?[^>]+(>|$)/g, '').trim();

/**
 * Schema de validación para login de administrador.
 * Usa Zod con sanitización XSS obligatoria (REGLA 5).
 */
export const LoginPayloadSchema = z.object({
  email: z
    .string()
    .email('El email debe tener un formato válido')
    .max(255, 'Email demasiado largo')
    .transform(sanitizeHtml),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(128, 'Contraseña demasiado larga'),
});

export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
