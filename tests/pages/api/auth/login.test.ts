import { describe, it, expect, vi } from 'vitest';

// Mock del adaptador de infraestructura (REGLA 13 — mockear adaptadores, no SDKs)
vi.mock('@core/infrastructure/services/SupabaseAuthService', () => {
  return {
    SupabaseAuthService: class {
      signIn = vi.fn().mockResolvedValue({ success: true });
      signOut = vi.fn().mockResolvedValue(undefined);
    },
  };
});

// Mock del factory de Supabase Server Client
vi.mock('@core/infrastructure/supabaseServer', () => {
  return {
    createSupabaseServerClient: vi.fn().mockReturnValue({}),
  };
});

// eslint-disable-next-line no-restricted-syntax
import { POST } from '../../../../src/pages/api/auth/login';

// Helper para crear mock de Request + cookies
function createMockContext(body: Record<string, unknown>) {
  const request = new Request('http://localhost:4321/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const cookies = {
    get: vi.fn().mockReturnValue(undefined),
    set: vi.fn(),
    delete: vi.fn(),
    has: vi.fn().mockReturnValue(false),
    headers: vi.fn().mockReturnValue([]),
  };

  return { request, cookies } as unknown as Parameters<typeof POST>[0];
}

describe('Auth Login API Endpoint POST /api/auth/login', () => {
  it('should reject incomplete payload with Zod 400 Error', async () => {
    const context = createMockContext({ email: 'not-enough' });

    const response = await POST(context);
    expect(response.status).toBe(400);

    const result = await response.json();
    expect(result.error).toContain('Datos de login inválidos');
  });

  it('should reject invalid email format with 400 Error', async () => {
    const context = createMockContext({
      email: 'invalid-email',
      password: 'segura12345',
    });

    const response = await POST(context);
    expect(response.status).toBe(400);
  });

  it('should reject short password with 400 Error', async () => {
    const context = createMockContext({
      email: 'admin@templados.co',
      password: '1234567', // 7 chars, minimum is 8
    });

    const response = await POST(context);
    expect(response.status).toBe(400);
  });

  it('should return 200 when valid credentials are submitted', async () => {
    const context = createMockContext({
      email: 'admin@templados.co',
      password: 'segura12345',
    });

    const response = await POST(context);
    expect(response.status).toBe(200);

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.message).toContain('Autenticación exitosa');
  });
});
