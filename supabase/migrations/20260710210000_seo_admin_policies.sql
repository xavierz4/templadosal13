-- ==========================================
-- 20260710210000_seo_admin_policies.sql
-- Permite al admin gestionar la matriz SEO (sistemas × ubicaciones) que alimenta
-- las rutas /catalogo/[sistema]/[ubicacion] (Fase 6). Las tablas hoy solo tienen
-- lectura pública; añadimos escritura restringida a is_admin().
-- ==========================================

CREATE POLICY "Admins gestionan sistemas SEO"
  ON public.seo_systems
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins gestionan locations SEO"
  ON public.seo_locations
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
