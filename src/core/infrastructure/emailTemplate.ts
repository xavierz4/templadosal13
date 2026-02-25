import type { LeadPayload } from '@core/domain/leadSchema';
import type { PhysicsResult } from '@core/domain/physicsEngine';

export function generateB2BEmailHtml(data: LeadPayload, physics: PhysicsResult, leadId: string): string {
    const isApproved = physics.isValid;
    const date = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Lead B2B - AL13</title>
        <style>
            body { margin: 0; padding: 0; background-color: #0A0A0A; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { border-bottom: 1px solid #333; padding-bottom: 20px; text-align: center; }
            .logo { font-size: 24px; font-weight: 900; color: #D4AF37; letter-spacing: 2px; }
            .subtitle { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; }
            
            .content { padding: 30px 0; }
            .title { font-size: 20px; font-weight: bold; margin-bottom: 20px; color: #FFF; }
            
            .card { background-color: #111; border: 1px solid #222; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
            .card-title { font-size: 14px; color: #D4AF37; text-transform: uppercase; font-weight: 700; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 15px; margin-top: 0;}
            
            .data-row { margin-bottom: 10px; }
            .data-label { color: #888; font-size: 13px; display: inline-block; width: 120px; }
            .data-val { color: #FFF; font-size: 15px; font-weight: 500;}
            
            .status-badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; }
            .status-ok { background-color: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.5); }
            .status-fail { background-color: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.5); }
            
            .warnings { background-color: rgba(234, 179, 8, 0.1); border-left: 3px solid #eab308; padding: 15px; margin-top: 15px; font-size: 13px; color: #cbd5e1; }
            
            .footer { border-top: 1px solid #333; padding-top: 20px; text-align: center; color: #666; font-size: 11px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">TEMPLADOS<span style="color: #FFF;">AL13</span></div>
                <div class="subtitle">Notificación Comercial B2B</div>
            </div>
            
            <div class="content">
                <div class="title">
                    🚨 Nuevo Pipeline Entrante 
                    <span style="float: right; font-size: 14px; font-weight: normal; color: #888;">${date}</span>
                </div>
                
                <div class="card">
                    <h3 class="card-title">Datos del Cliente</h3>
                    <div class="data-row"><span class="data-label">Nombre:</span> <span class="data-val">${data.contactName}</span></div>
                    <div class="data-row"><span class="data-label">Teléfono:</span> <span class="data-val">${data.phone}</span></div>
                    ${data.companyName ? `<div class="data-row"><span class="data-label">Empresa/Firma:</span> <span class="data-val">${data.companyName}</span></div>` : ''}
                    <div class="data-row"><span class="data-label">ID Sistema:</span> <span class="data-val" style="font-family: monospace; font-size: 12px;">${leadId}</span></div>
                </div>

                <div class="card">
                    <h3 class="card-title">Diagnóstico de Ingeniería (Motor Automático)</h3>
                    
                    <div class="data-row">
                        <span class="data-label">Estado Físico:</span> 
                        ${isApproved 
                            ? '<span class="status-badge status-ok">✓ ESTUCTURALMENTE VIABLE</span>' 
                            : '<span class="status-badge status-fail">⚠️ RECHAZADO (PROYECTO JUMBO)</span>'}
                    </div>
                    
                    <div class="data-row" style="margin-top: 15px;"><span class="data-label">Sistema:</span> <span class="data-val" style="text-transform: capitalize;">${data.productType.replace('_', ' ')}</span></div>
                    <div class="data-row"><span class="data-label">Vano Libre:</span> <span class="data-val">${data.width}mm x ${data.height}mm</span></div>
                    <div class="data-row"><span class="data-label">Cristal Elegido:</span> <span class="data-val">${data.glassColor}</span></div>
                    <div class="data-row"><span class="data-label">Espesor Exigido:</span> <span class="data-val" style="color: #D4AF37; font-size: 18px; font-weight: bold;">${physics.recommendedThickness} mm</span></div>
                    
                    ${physics.warnings.length > 0 ? `
                    <div class="warnings">
                        <strong style="color: #eab308; display: block; margin-bottom: 5px;">Cargas Estructurales Detectadas:</strong>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${physics.warnings.map((w: string) => `<li>${w}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://templadosal13.com/admin/leads/${leadId}" style="background-color: #D4AF37; color: #000; text-decoration: none; padding: 12px 25px; border-radius: 4px; font-weight: bold; font-size: 14px; display: inline-block;">Ver en CRM Panel</a>
                </div>
            </div>
            
            <div class="footer">
                Generado automáticamente por el Motor Físico B2B de Templados AL13.<br>
                Este es un mensaje transaccional del sistema.
            </div>
        </div>
    </body>
    </html>
    `;
}
