-- ==========================================
-- 001_initial_schema.sql
-- Dominio: Usuarios y Perfiles Corporativos AL13
-- ==========================================

-- 1. Tabla Perfiles de Usuario (Extensión de auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'contractor', 'admin', 'ceo')),
  full_name VARCHAR(255),
  company_name VARCHAR(255),
  phone_number VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Seguridad a Nivel de Filas (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Seguridad RLS
-- Un usuario solo puede leer y actualizar su propio perfil
CREATE POLICY "Usuarios pueden leer su propio perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Los administradores/CEO pueden leer todos los perfiles
CREATE POLICY "Admins pueden ver todos los perfiles" ON public.profiles
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'ceo')
  );

-- 4. Trigger Function para crear perfil al registrar auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
