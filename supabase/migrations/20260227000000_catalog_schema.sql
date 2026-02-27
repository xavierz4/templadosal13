-- ==========================================
-- catalog_schema.sql
-- Dominio: Catálogo de Proyectos AL13 (Task 4.3)
-- ==========================================

-- 1. Tabla de Proyectos del Catálogo
CREATE TABLE public.catalog_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL CHECK (
    category IN ('cabina_ducha', 'divisor_oficina', 'fachada_monumental', 'puerta_pivotante')
  ),
  description TEXT,
  image_url TEXT NOT NULL,        -- URL pública de Supabase Storage
  image_path TEXT NOT NULL,       -- Path interno del bucket (para DELETE)
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security
ALTER TABLE public.catalog_projects ENABLE ROW LEVEL SECURITY;

-- 3. Políticas RLS
-- Lectura pública (catálogo B2C — sin auth requerida)
CREATE POLICY "Lectura pública del catálogo"
  ON public.catalog_projects
  FOR SELECT
  USING (is_published = true);

-- Los admins (autenticados) pueden leer todos (publicados y no)
CREATE POLICY "Admins leen todos los proyectos"
  ON public.catalog_projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Solo admins autenticados pueden crear, actualizar y borrar
CREATE POLICY "Solo admins pueden insertar proyectos"
  ON public.catalog_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Solo admins pueden actualizar proyectos"
  ON public.catalog_projects
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Solo admins pueden borrar proyectos"
  ON public.catalog_projects
  FOR DELETE
  TO authenticated
  USING (true);

-- 4. Índice para ordenar por fecha en las consultas del catálogo
CREATE INDEX idx_catalog_projects_created_at
  ON public.catalog_projects (created_at DESC);

-- 5. Bucket de Storage para imágenes del catálogo
-- NOTA: Ejecutar en el Dashboard de Supabase (Storage > New bucket):
-- Bucket ID: catalog-images | Public: true | Max file size: 15MB
-- File type restrictions: image/jpeg, image/png, image/webp, image/avif
