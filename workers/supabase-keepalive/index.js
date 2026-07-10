/**
 * Supabase Keep-Alive Worker
 *
 * El plan gratuito de Supabase pausa el proyecto tras 7 días sin actividad
 * externa (API/dashboard). Este Worker hace una consulta REST mínima una vez
 * al día para que el proyecto nunca llegue a ese umbral.
 *
 * Deploy: npx wrangler deploy  (desde workers/supabase-keepalive/)
 * Prueba manual: npx wrangler dev --test-scheduled y visitar /__scheduled
 */

const SUPABASE_URL = 'https://cfxmfiiidljtaxjahwsa.supabase.co';
// Anon key: es pública por diseño (viaja en el bundle del cliente); solo
// permite lo que las políticas RLS autorizan (lectura de filas publicadas).
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmeG1maWlpZGxqdGF4amFod3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NjQ5MDMsImV4cCI6MjA5OTI0MDkwM30.AOceQWhnw-E4HklqezgFlI9AOjC6cpj2n55hfPONofI';

async function ping() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/catalog_projects?select=id&limit=1`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  console.log(`[keepalive] Supabase respondió ${res.status}`);
  return res.status;
}

export default {
  async scheduled(_event, _env, ctx) {
    ctx.waitUntil(ping());
  },
};
