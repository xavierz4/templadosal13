// src/modules/quoter/api/leadClient.ts
// Cliente Dedicado API (Desacoplamiento de Red)
// Ningún componente Svelte B2B debe interactuar directamente con la red global.

export interface CreateLeadPayload {
  productType: string;
  width: number;
  height: number;
  glassColor: string;
  aluminumColor?: string;
  contactName: string;
  companyName?: string;
  phone: string;
}

export interface LeadClientResponse {
    message?: string;
    leadId?: string;
    physics?: Record<string, unknown>; // Puede ser más estricto
}

/**
 * Envia el payload recogido en la UI hacia el EndPoint BFF de Astro.
 * Encapsula la lógica de red, JSON parse y manejo genérico de error HTTP.
 */
export async function submitLeadB2B(payload: CreateLeadPayload): Promise<LeadClientResponse> {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Server error B2B');
  }

  return result;
}
