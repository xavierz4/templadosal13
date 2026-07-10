import { describe, it, expect, vi } from 'vitest';

// ============================================================================
// MOCKS
// REGLA 13 — Mocking de los adaptadores de infraestructura, no de los SDK directos
// ============================================================================

vi.mock('@core/infrastructure/repositories/SupabaseContactRepository', () => {
  return {
    // vitest v4: la impl debe ser `function`/`class` para ser instanciable con `new`.
    SupabaseContactRepository: vi.fn().mockImplementation(function () {
      return {
        saveContact: vi.fn().mockResolvedValue({ id: 'mocked-contact-123' }),
      };
    }),
  };
});

vi.mock('@core/infrastructure/services/ResendEmailService', () => {
  return {
    ResendEmailService: vi.fn().mockImplementation(function () {
      return {
        sendContactNotification: vi.fn().mockReturnValue(undefined), // Fire and forget
      };
    }),
  };
});

// Import THE HANDLER
// eslint-disable-next-line no-restricted-syntax
import { POST } from '../../../src/pages/api/contact';

// ============================================================================
// HELPER FUNC
// ============================================================================
function createMockContext(body: Record<string, unknown>) {
  const request = new Request('http://localhost:4321/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { request } as unknown as Parameters<typeof POST>[0];
}

// ============================================================================
// TEST SUITE
// ============================================================================
describe('Contact B2B API Endpoint POST /api/contact', () => {
  it('should reject payload missing required fields with Zod 400 Error', async () => {
    // Missing 'message', 'phone'
    const context = createMockContext({
      name: 'Arquitectos Asociados',
      email: 'arquitectos@ejemplo.com',
    });

    const response = await POST(context);
    expect(response.status).toBe(400);

    const result = await response.json();
    expect(result.error).toContain('Campos de entrada inválidos');
    expect(result.details).toBeInstanceOf(Array);
  });

  it('should reject an invalid email address format', async () => {
    const context = createMockContext({
      name: 'Arquitectos Asociados',
      email: 'not-an-email',
      phone: '3001234567',
      message: 'Requerimos cotización de fachada flotante 150m2.',
    });

    const response = await POST(context);
    expect(response.status).toBe(400);
  });

  it('should reject a message that is too short (min 10 chars)', async () => {
    const context = createMockContext({
      name: 'Juan Perez',
      email: 'juan@ejemplo.com',
      phone: '3001234567',
      message: 'Hola', // 4 chars
    });

    const response = await POST(context);
    expect(response.status).toBe(400);
  });

  it('should return 201 Created and contactId for valid payload', async () => {
    const context = createMockContext({
      name: 'Constructora Bolívar B2B',
      email: 'compras@constructorabolivar.com',
      phone: '3123456789',
      message:
        'Necesitamos 50 metros de película arquitectónica cristal laminado calibre ext 2mm para el edificio Prisma norte.',
    });

    const response = await POST(context);
    expect(response.status).toBe(201); // 201 Created correctly

    const result = await response.json();
    expect(result.message).toContain('exitosamente');
    expect(result.contactId).toBe('mocked-contact-123');
  });
});
