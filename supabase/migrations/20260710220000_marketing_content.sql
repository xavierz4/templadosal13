-- ==========================================
-- 20260710220000_marketing_content.sql
-- Módulo de marketing con IA: almacena el contenido de redes generado por el
-- agente (borradores → aprobado → publicado). Alimenta el embudo: cada pieza
-- lleva un target_url con UTMs hacia una landing SEO/catálogo.
-- ==========================================

CREATE TYPE marketing_channel AS ENUM ('instagram', 'facebook', 'linkedin');
CREATE TYPE marketing_status AS ENUM ('draft', 'approved', 'published', 'discarded');

CREATE TABLE public.marketing_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel marketing_channel NOT NULL,
  system_slug TEXT,               -- referencia a seo_systems.slug (denormalizado a propósito)
  location_slug TEXT,             -- referencia a seo_locations.slug
  angle TEXT,                     -- ángulo del contenido (temporada, dolor, caso, norma…)
  hook TEXT NOT NULL,             -- primera línea / gancho
  body TEXT NOT NULL,             -- cuerpo del post
  hashtags TEXT[] DEFAULT '{}',   -- hashtags sugeridos
  cta TEXT,                       -- llamado a la acción
  target_url TEXT,                -- link con UTMs a la landing
  status marketing_status DEFAULT 'draft' NOT NULL,
  scheduled_for TIMESTAMPTZ,      -- fecha sugerida de publicación (calendario)
  created_by TEXT DEFAULT 'ai' NOT NULL,  -- 'ai' | 'human'
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_marketing_content_status ON public.marketing_content (status, created_at DESC);

-- RLS: solo admins gestionan el contenido de marketing (mismo patrón is_admin()).
ALTER TABLE public.marketing_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins gestionan el contenido de marketing"
  ON public.marketing_content
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
