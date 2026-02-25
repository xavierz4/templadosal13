import { z } from 'zod';
import type { ProductType } from './physicsEngine';

export const LeadPayloadSchema = z.object({
  productType: z.enum(['cabina_ducha', 'divisor_oficina', 'fachada_monumental', 'puerta_pivotante'] as const),
  width: z.number().positive().max(10000, "Ancho excesivo"),
  height: z.number().positive().max(10000, "Altura excesiva"),
  glassColor: z.string().min(2),
  aluminumColor: z.string().optional(),
  contactName: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(255),
  companyName: z.string().max(255).optional(),
  phone: z.string().min(7, "El teléfono debe tener minimo 7 numeros").max(50),
});

export type LeadPayload = z.infer<typeof LeadPayloadSchema>;
