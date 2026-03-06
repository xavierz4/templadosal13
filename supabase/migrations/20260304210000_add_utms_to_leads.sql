-- ==========================================
-- 20260304210000_add_utms_to_leads.sql
-- Dominio: Cotizaciones B2B - Tracking
-- Agrega columnas para Marketing Attribution
-- ==========================================

ALTER TABLE public.leads
ADD COLUMN utm_source VARCHAR(255),
ADD COLUMN utm_campaign VARCHAR(255);
