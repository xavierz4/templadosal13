import { describe, it, expect, vi } from 'vitest';

// Mock the Supabase client entirely BEFORE importing the route
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: { id: 'mocked-id' }, error: null })
        })
      })
    })
  }
}));

import { POST } from './leads';

// Vitest Polyfill para Request nativo
// Normalmente Astro lo provee, pero para unit tests directos armamos Mocks
describe('B2B Leads API Endpoint POST', () => {
  it('Should reject incomplete payloads with Zod 400 Error', async () => {
    // Faltan campos imperativos como productType y dimensiones
    const mockRequest = new Request('http://localhost:4321/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        contactName: 'Incompleto'
      })
    });

    const response = await POST({ request: mockRequest } as any);
    expect(response.status).toBe(400);
    
    const result = await response.json();
    expect(result.error).toContain("Campos de entrada");
  });

  it('Should reject structurally unviable projects (Jumbo) with Physics 422 Error', async () => {
    const mockRequest = new Request('http://localhost:4321/api/leads', {
        method: 'POST',
        body: JSON.stringify({
          contactName: 'El Arquitecto',
          phone: '300000000',
          productType: 'fachada_monumental',
          width: 5000, // Imposible
          height: 5000,
          glassColor: 'Incoloro'
        })
      });
  
      const response = await POST({ request: mockRequest } as any);
      expect(response.status).toBe(422);
      
      const result = await response.json();
      expect(result.error).toContain("Medidas imposibles");
  });
});
