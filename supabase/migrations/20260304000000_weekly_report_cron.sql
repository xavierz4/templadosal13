-- ==========================================
-- 20260304000000_weekly_report_cron.sql
-- Tarea: 6.2.3 — CRON para Edge Function weekly-report
-- Scope: Activa pg_cron + pg_net y programa la invocación
--        semanal los Lunes a las 08:00 UTC
-- ==========================================

-- 1. Habilitar extensiones necesarias
--    pg_cron:  scheduler de tareas en PostgreSQL (Supabase lo incluye)
--    pg_net:   permite hacer HTTP requests desde SQL (Supabase lo incluye)
CREATE EXTENSION IF NOT EXISTS pg_cron  WITH SCHEMA cron;
CREATE EXTENSION IF NOT EXISTS pg_net   WITH SCHEMA extensions;

-- 2. Programar el CRON job
--    Expresión: '0 8 * * 1'  →  Lunes a las 08:00 UTC
--
--    IMPORTANTE: Reemplaza <YOUR_SUPABASE_PROJECT_REF> con el project ref real
--    del proyecto Supabase (ej: abcdefghijklmnop). Se obtiene desde:
--    Dashboard → Project Settings → General → Reference ID
--
--    IMPORTANTE: Reemplaza <YOUR_SUPABASE_ANON_KEY> con el anon key del proyecto.
--    (El edge function valida mediante SUPABASE_SERVICE_ROLE_KEY internamente,
--    el anon key aquí solo autoriza el invocado HTTP inicial del cron.)
--
-- TODO: [TECH-001] Parametrizar URL y ANON_KEY mediante pg_net secrets
--       cuando Supabase libere soporte nativo de variables en pg_cron.
--       Causa: Limitaciones actuales de pg_cron (no soporta variables).
--       Resolver: Q2 2026 o cuando esté disponible.

SELECT cron.schedule(
  'al13-weekly-report-monday',                -- Job name único
  '0 8 * * 1',                               -- Cron expression: Lunes 08:00 UTC
  $$
    SELECT net.http_post(
      url     := 'https://<YOUR_SUPABASE_PROJECT_REF>.supabase.co/functions/v1/weekly-report',
      headers := jsonb_build_object(
        'Content-Type',  'application/json',
        'Authorization', 'Bearer <YOUR_SUPABASE_ANON_KEY>'
      ),
      body    := '{}'::jsonb
    );
  $$
);
