-- ==========================================
-- 20260710180000_source_analytics.sql
-- Atribución de marketing: agrega leads por utm_source/utm_campaign para el
-- dashboard de analytics (Fase 4 del rediseño admin). Mismo patrón de seguridad
-- que get_dashboard_analytics: SECURITY DEFINER + guarda is_admin().
-- ==========================================

CREATE OR REPLACE VIEW public.leads_source_view AS
SELECT
  COALESCE(NULLIF(utm_source, ''), 'directo') AS source,
  COALESCE(NULLIF(utm_campaign, ''), 'sin campaña') AS campaign,
  count(*)::int AS leads_count,
  COALESCE(sum(total_value), 0)::numeric AS total_value
FROM public.leads
GROUP BY 1, 2;

CREATE OR REPLACE FUNCTION public.get_source_analytics()
RETURNS SETOF public.leads_source_view
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.leads_source_view WHERE public.is_admin();
$$;

REVOKE EXECUTE ON FUNCTION public.get_source_analytics() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_source_analytics() TO authenticated;
