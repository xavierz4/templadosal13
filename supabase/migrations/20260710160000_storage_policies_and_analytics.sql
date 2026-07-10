-- ==========================================
-- 20260710160000_storage_policies_and_analytics.sql
-- Repone infraestructura que existía solo en el proyecto Supabase original
-- (creada a mano vía dashboard, nunca migrada):
--   1. Políticas RLS de storage.objects para el bucket catalog-images
--      (sin ellas, el presign de subida del CMS admin falla)
--   2. Vista leads_analytics_view + RPC get_dashboard_analytics
--      (los usa /admin/analytics vía SupabaseAnalyticsRepository)
-- ==========================================

-- ── 1. Storage: bucket catalog-images ────────────────────────────────
-- El bucket es público para lectura (getPublicUrl), pero INSERT/UPDATE/DELETE
-- via API autenticada requieren políticas explícitas en storage.objects.

CREATE POLICY "Authenticated sube a catalog-images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'catalog-images');

CREATE POLICY "Authenticated actualiza catalog-images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'catalog-images');

CREATE POLICY "Authenticated borra de catalog-images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'catalog-images');

CREATE POLICY "Lectura publica de catalog-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'catalog-images');

-- ── 2. Analytics B.I. ─────────────────────────────────────────────────
-- Agregación mensual de leads por producto y estado.

CREATE OR REPLACE VIEW public.leads_analytics_view AS
SELECT
  date_trunc('month', created_at) AS record_month,
  product_type,
  status,
  count(*)::int AS leads_count,
  sum(total_value)::numeric AS total_estimated_value
FROM public.leads
GROUP BY 1, 2, 3;

-- RPC consumido por el dashboard. SECURITY DEFINER para saltar RLS de leads,
-- pero con doble guarda: solo ejecutable por authenticated Y filtrado por
-- is_admin() — un usuario autenticado no-admin recibe cero filas.
CREATE OR REPLACE FUNCTION public.get_dashboard_analytics()
RETURNS SETOF public.leads_analytics_view
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.leads_analytics_view WHERE public.is_admin();
$$;

REVOKE EXECUTE ON FUNCTION public.get_dashboard_analytics() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_dashboard_analytics() TO authenticated;
