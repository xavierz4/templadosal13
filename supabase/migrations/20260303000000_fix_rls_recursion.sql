-- ==========================================
-- fix_rls_recursion.sql
-- Solución para el infinite recursion detectado en public.profiles y public.leads
-- ==========================================

-- 1. Crear función Security Definer para evitar RLS reentrante
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'ceo')
  );
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

-- 2. Actualizar las Políticas problemáticas en profiles
DROP POLICY IF EXISTS "Admins pueden ver todos los perfiles" ON public.profiles;

CREATE POLICY "Admins pueden ver todos los perfiles" ON public.profiles
  FOR SELECT USING ( public.is_admin() );

-- 3. Actualizar las Políticas problemáticas en leads
DROP POLICY IF EXISTS "Admins pueden leer y gestionar todos los leads" ON public.leads;

CREATE POLICY "Admins pueden leer y gestionar todos los leads" ON public.leads
  FOR ALL USING ( public.is_admin() );
