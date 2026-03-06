import { z } from 'zod';

const sanitizeHtml = (str: string) => str.replace(/<\/?[^>]+(>|$)/g, "").trim();

export const ContactPayloadSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(255).transform(sanitizeHtml),
  phone: z.string().min(7, "El teléfono debe tener minimo 7 numeros").max(50).transform(sanitizeHtml),
  email: z.string().email("Correo electrónico inválido").transform(sanitizeHtml),
  message: z.string().min(10, "El mensaje debe ser descriptivo (min 10 caracteres)").max(1000).transform(sanitizeHtml),
});

export type ContactPayload = z.infer<typeof ContactPayloadSchema>;
