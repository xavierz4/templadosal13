-- ==========================================
-- 20260304200000_client_logs_schema.sql
-- Dominio: Frontend Observability (Client Logs)
-- ==========================================

-- 1. Tipo Enum estricto para niveles de log
CREATE TYPE log_level AS ENUM (
  'error', 
  'warn', 
  'info'
);

-- 2. Tabla de Logs de Cliente
CREATE TABLE public.client_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level log_level DEFAULT 'error' NOT NULL,
  message TEXT NOT NULL,
  source TEXT,
  lineno INTEGER,
  colno INTEGER,
  error_stack TEXT,
  url TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Habilitar Seguridad a Nivel de Filas (RLS)
ALTER TABLE public.client_logs ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Seguridad RLS
-- Anon/Public puede INSERTAR (script rastreador silencioso en el <head>)
CREATE POLICY "Public puede insertar client logs" ON public.client_logs
  FOR INSERT WITH CHECK (true);

-- Solo Admins o CEOs pueden LEER los logs para hunting proactivo de bugs
CREATE POLICY "Admins pueden leer client logs" ON public.client_logs
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'ceo')
  );
