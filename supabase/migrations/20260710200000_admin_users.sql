-- ==========================================
-- 20260710200000_admin_users.sql
-- Gestión de usuarios y roles desde el panel admin (Fase 5).
--   1. Política de UPDATE para admins sobre profiles (cambiar rol de cualquiera)
--   2. RPC get_admin_users(): lista perfiles + email de auth.users, guardado por
--      is_admin() (el email vive en auth.users, no accesible por la anon key).
-- ==========================================

-- 1. Admins pueden actualizar cualquier perfil (además de la política existente
--    "Usuarios pueden actualizar su propio perfil"). Las políticas permisivas se
--    combinan con OR: usuario edita el suyo, admin edita cualquiera.
CREATE POLICY "Admins actualizan cualquier perfil"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin());

-- 2. RPC que expone la lista de usuarios con su email para el admin.
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE (
  id uuid,
  email text,
  role text,
  full_name text,
  company_name text,
  phone_number text,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id,
    u.email::text,
    p.role::text,
    p.full_name,
    p.company_name,
    p.phone_number,
    p.created_at
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  WHERE public.is_admin()
  ORDER BY p.created_at DESC;
$$;

REVOKE EXECUTE ON FUNCTION public.get_admin_users() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_admin_users() TO authenticated;
