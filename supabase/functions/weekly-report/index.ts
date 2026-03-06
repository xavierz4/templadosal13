/**
 * weekly-report — Supabase Edge Function (Deno)
 *
 * Responsabilidad ÚNICA: Consultar los leads de la semana, generar un PDF
 * ejecutivo y enviarlo al CEO vía Resend API.
 *
 * CRON: Configurado en la migración 20260304000000_weekly_report_cron.sql
 *       Se ejecuta Lunes 08:00 UTC cada semana.
 *
 * Secrets requeridos en Supabase (configurar con `npx supabase secrets set`):
 *   - RESEND_API_KEY
 *   - REPORT_RECIPIENT_EMAIL  (ej: ceotemplados@gmail.com)
 *
 * Secrets inyectados automáticamente por Supabase:
 *   - SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';
import jsPDF from 'npm:jspdf@2';
import autoTable from 'npm:jspdf-autotable@3';

// ────────────────────────────────────────────────────
// Tipos de Dominio (locales a la Edge Function)
// No pueden importar @core/* — Deno env aislado
// ────────────────────────────────────────────────────
interface WeeklyLead {
  id: string;
  customer_name: string;
  customer_phone: string;
  product_type: string;
  status: string;
  total_value: number | null;
  created_at: string;
}

interface WeeklyStats {
  totalLeads: number;
  byStatus: Record<string, number>;
  pipelineValue: number;
  leads: WeeklyLead[];
}

// ────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────

/**
 * Agrega los leads por status y calcula el valor total del pipeline.
 */
function aggregateLeads(leads: WeeklyLead[]): WeeklyStats {
  const byStatus: Record<string, number> = {};
  let pipelineValue = 0;

  for (const lead of leads) {
    byStatus[lead.status] = (byStatus[lead.status] ?? 0) + 1;
    if (lead.total_value) pipelineValue += lead.total_value;
  }

  return { totalLeads: leads.length, byStatus, pipelineValue, leads };
}

/**
 * Genera el PDF ejecutivo con jsPDF + autoTable.
 * Retorna el PDF como Uint8Array para adjuntarlo al correo.
 */
function generatePdf(stats: WeeklyStats, weekLabel: string): Uint8Array {
  // jsPDF usa orientación 'portrait' por defecto
  const doc = new jsPDF();

  // ── Encabezado AL13 ──
  doc.setFillColor(10, 20, 40); // Azul marino oscuro
  doc.rect(0, 0, 210, 38, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('TEMPLADOS AL13', 14, 16);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Reporte Ejecutivo Semanal de Leads B2B', 14, 26);

  doc.setFontSize(9);
  doc.setTextColor(180, 200, 230);
  doc.text(`Semana: ${weekLabel}`, 14, 34);

  // ── KPIs de resumen ──
  doc.setTextColor(20, 20, 40);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('📊 Resumen de la Semana', 14, 52);

  const kpiData = [
    ['Total de Leads', String(stats.totalLeads)],
    ['Valor de Pipeline (COP)', `$${Intl.NumberFormat('es-CO').format(stats.pipelineValue)}`],
    ...Object.entries(stats.byStatus).map(([status, count]) => [
      `Leads en "${status}"`, String(count)
    ]),
  ];

  autoTable(doc, {
    startY: 57,
    head: [['Métrica', 'Valor']],
    body: kpiData,
    theme: 'striped',
    headStyles: { fillColor: [10, 20, 40], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 10 },
    columnStyles: { 0: { cellWidth: 100 }, 1: { fontStyle: 'bold' } },
  });

  // ── Tabla detalle de leads ──
  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable?.finalY ?? 100;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 40);
  doc.text('📋 Detalle de Leads', 14, finalY + 14);

  autoTable(doc, {
    startY: finalY + 18,
    head: [['Nombre', 'Teléfono', 'Producto', 'Estado', 'Valor (COP)', 'Fecha']],
    body: stats.leads.map((l) => [
      l.customer_name,
      l.customer_phone,
      l.product_type.replace(/_/g, ' '),
      l.status,
      l.total_value ? `$${Intl.NumberFormat('es-CO').format(l.total_value)}` : '—',
      new Date(l.created_at).toLocaleDateString('es-CO'),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [30, 60, 100], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 8, overflow: 'linebreak' },
  });

  // ── Pie de página ──
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 160);
    doc.text(
      `Templados AL13 — Reporte Confidencial — Generado ${new Date().toLocaleString('es-CO')} — Pág ${i}/${pageCount}`,
      14,
      doc.internal.pageSize.height - 8,
    );
  }

  return doc.output('arraybuffer') as Uint8Array;
}

/**
 * Envía el PDF al CEO vía Resend API con el adjunto base64.
 */
async function sendEmailWithPdf(
  pdfBytes: Uint8Array,
  stats: WeeklyStats,
  weekLabel: string,
  resendApiKey: string,
  recipientEmail: string,
): Promise<void> {
  // Convertir a base64 para el attachment
  const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));

  const emailPayload = {
    from: 'Sistema AL13 <leads@templadosal13.com>',
    to: [recipientEmail],
    subject: `📈 Reporte Semanal AL13 — ${stats.totalLeads} leads | ${weekLabel}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; color: #111; max-width: 600px;">
        <div style="background: #0a1428; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 22px;">Templados AL13</h1>
          <p style="color: #b4c8e6; margin: 8px 0 0;">Reporte Ejecutivo Semanal — ${weekLabel}</p>
        </div>
        <div style="padding: 24px; background: #f7f7f8; border-radius: 0 0 8px 8px;">
          <p>Adjunto encontrará el resumen PDF de la actividad comercial de esta semana.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="background: #0a1428; color: #fff;">
              <th style="padding: 10px 14px; text-align: left;">Métrica</th>
              <th style="padding: 10px 14px; text-align: right;">Valor</th>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 10px 14px;">Total de Leads</td>
              <td style="padding: 10px 14px; text-align: right; font-weight: bold;">${stats.totalLeads}</td>
            </tr>
            <tr style="background: #f0f4ff;">
              <td style="padding: 10px 14px;">Valor de Pipeline</td>
              <td style="padding: 10px 14px; text-align: right; font-weight: bold;">
                $${Intl.NumberFormat('es-CO').format(stats.pipelineValue)} COP
              </td>
            </tr>
            ${Object.entries(stats.byStatus).map(([status, count]) => `
            <tr style="background: #fff;">
              <td style="padding: 10px 14px;">Leads "${status}"</td>
              <td style="padding: 10px 14px; text-align: right;">${count}</td>
            </tr>`).join('')}
          </table>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">
            Templados AL13 · Sistema de Reporte Automático · Informe Confidencial
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `AL13_Reporte_Semanal_${weekLabel.replace(/\//g, '-')}.pdf`,
        content: pdfBase64,
      },
    ],
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`[weekly-report] Resend API error: ${response.status} — ${errorBody}`);
  }

  const result = await response.json();
  console.log('[weekly-report] Email enviado correctamente:', { id: result.id, recipient: recipientEmail });
}

// ────────────────────────────────────────────────────
// Handler Principal
// ────────────────────────────────────────────────────
Deno.serve(async (_req) => {
  try {
    // 1. Validar secrets requeridos
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const recipientEmail = Deno.env.get('REPORT_RECIPIENT_EMAIL') ?? 'ceotemplados@gmail.com';

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('[weekly-report] SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configurados.');
    }

    if (!resendApiKey) {
      throw new Error('[weekly-report] RESEND_API_KEY no configurado en secrets de Supabase.');
    }

    // 2. Inicializar cliente Supabase con service_role para saltarse RLS
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // 3. Calcular ventana de 7 días
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekLabel = `${sevenDaysAgo.toLocaleDateString('es-CO')} – ${now.toLocaleDateString('es-CO')}`;

    console.log('[weekly-report] Consultando leads desde:', sevenDaysAgo.toISOString());

    // 4. Fetch de leads de la semana
    const { data: leads, error: dbError } = await supabase
      .from('leads')
      .select('id, customer_name, customer_phone, product_type, status, total_value, created_at')
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    if (dbError) {
      throw new Error(`[weekly-report] Error al consultar leads: ${dbError.message}`);
    }

    const weeklyLeads = (leads ?? []) as WeeklyLead[];
    console.log('[weekly-report] Leads encontrados:', weeklyLeads.length);

    // 5. Agregar estadísticas
    const stats = aggregateLeads(weeklyLeads);

    // 6. Generar PDF
    const pdfBytes = generatePdf(stats, weekLabel);
    console.log('[weekly-report] PDF generado, tamaño:', pdfBytes.byteLength, 'bytes');

    // 7. Enviar email con adjunto PDF
    await sendEmailWithPdf(pdfBytes, stats, weekLabel, resendApiKey, recipientEmail);

    return new Response(
      JSON.stringify({
        success: true,
        week: weekLabel,
        leadsProcessed: stats.totalLeads,
        pipelineValueCOP: stats.pipelineValue,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido en weekly-report';
    console.error('[weekly-report] Error crítico:', message);

    return new Response(
      JSON.stringify({ success: false, error: message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});
