-- ==========================================
-- 002_leads_schema.sql
-- Dominio: Cotizaciones B2B, Status Kanban e Ingesta
-- ==========================================

-- 1. Tipo Enum estricto para las fases del CRM/Kanban
CREATE TYPE lead_status AS ENUM (
  'NUEVO', 
  'CONTACTADO', 
  'COTIZADO', 
  'CERRADO_GANADO', 
  'PERDIDO'
);

-- 2. Tabla Leads (Recoge los datos del Cotizador Público de AL13)
CREATE TABLE public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  product_type VARCHAR(100) NOT NULL, -- Ej: Puerta de Baño Cristal 8mm
  measurements JSONB NOT NULL, -- Ej: { "width_mm": 1200, "height_mm": 2000 }
  total_value NUMERIC(15, 2), -- Cotización en COP (o local)
  status lead_status DEFAULT 'NUEVO',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Si el lead lo generó un perfil existente
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- 3. Habilitar Seguridad a Nivel de Filas (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Seguridad RLS
-- Anon/Public puede INSERTAR (cotizador web público no autenticado)
CREATE POLICY "Public puede insertar leads web" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Solo dueños o Admins pueden leer
CREATE POLICY "Dueño puede leer sus leads" ON public.leads
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Admins pueden leer y gestionar todos los leads" ON public.leads
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'ceo')
  );
