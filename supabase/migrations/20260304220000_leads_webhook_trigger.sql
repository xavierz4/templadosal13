-- ==========================================
-- 20260304220000_leads_webhook_trigger.sql
-- Dominio: Cotizaciones B2B - Webhooks
-- Dispara HTTP POST usando pg_net al crear Lead
-- ==========================================

-- 1. Habilitar la extensión pg_net (Cuidado: esto asume permisos de superusuario, en Supabase Cloud funciona por defecto)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Crear la función del Webhook B2B
CREATE OR REPLACE FUNCTION public.notify_new_lead_webhook()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  payload json;
  webhook_url text := 'https://hook.us1.make.com/xxxxxxxxxxxxxxxxxxx'; -- REEMPLAZAR CON TU URL REAL DE ZAPIER/MAKE
  req_id bigint;
BEGIN
  -- Construir el Payload JSON con el nuevo Lead (incluyendo UTMs de Task 6.2.5)
  payload := json_build_object(
    'event', 'new_b2b_lead',
    'timestamp', now(),
    'data', row_to_json(NEW)
  );

  -- Realizar la mutación asíncrona hacia Make/Zapier
  SELECT net.http_post(
      url := webhook_url,
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := payload::jsonb
  ) INTO req_id;

  -- Puedes registrar req_id en un logger table si deseas observabilidad, 
  -- pero para B2B Realtime mantengamos fire-and-forget
  RETURN NEW;
END;
$$;

-- 3. Crear el Trigger atado a public.leads
DROP TRIGGER IF EXISTS trigger_new_lead_webhook ON public.leads;
CREATE TRIGGER trigger_new_lead_webhook
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.notify_new_lead_webhook();
