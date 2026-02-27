/**
 * Tipos de dominio para el Admin Panel CRM (Task 4.2)
 *
 * LeadStatus: enum de estados posibles del Kanban (REGLA 7 — TypeScript strict)
 * AdminLead: forma completa de un lead leído de la BD por el admin
 *
 * NO mezclar con leadSchema.ts (ese es para el payload de entrada del validador)
 */

export const LEAD_STATUSES = ['NUEVO', 'COTIZADO', 'CERRADO_GANADO', 'PERDIDO'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/**
 * Representa un Lead completo tal como viene de la BD (lectura admin).
 * Mapea 1:1 con las columnas de la tabla `leads` en Supabase.
 */
export interface AdminLead {
  id: string;
  customer_name: string;
  customer_phone: string;
  product_type: string;
  notes: string | null;
  status: LeadStatus;
  created_at: string;
  measurements: {
    width_mm: number;
    height_mm: number;
    glass_color: string;
    aluminum_color?: string;
    thickness_recommended: number;
  } | null;
}

/**
 * Schema Zod para validar el payload del PATCH /api/admin/leads/[id]
 */
import { z } from 'zod';

export const LeadStatusUpdateSchema = z.object({
  status: z.enum(LEAD_STATUSES),
});

export type LeadStatusUpdate = z.infer<typeof LeadStatusUpdateSchema>;
