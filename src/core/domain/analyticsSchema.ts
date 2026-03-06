import { z } from 'zod';
import type { Database } from '../types/database.types';

// El LeadStatus ya existe en leadAdminSchema, pero por simplicidad de módulo BI lo extraemos de Supabase Types
export type LeadStatus = Database['public']['Enums']['lead_status'];

// Schema de validación (Fallback / Testing)
export const DashboardAnalyticsRowSchema = z.object({
  record_month: z.string(),
  product_type: z.string(),
  status: z.string(),
  leads_count: z.number(),
  total_estimated_value: z.number().nullable(),
});

export type DashboardAnalyticsRow = z.infer<typeof DashboardAnalyticsRowSchema>;

// Tipo exacto del RPC generado por Supabase (`get_dashboard_analytics`)
export type AnalyticsRPCResponse = Database['public']['Functions']['get_dashboard_analytics']['Returns'];
