import { describe, it, expect, vi, beforeEach } from 'vitest';

// ============================================================================
// MOCKS
// ============================================================================

const mockSaveLog = vi.fn().mockResolvedValue(true);

vi.mock('@core/infrastructure/repositories/SupabaseClientLogRepository', () => {
  return {
    SupabaseClientLogRepository: vi.fn().mockImplementation(() => {
      return {
        saveLog: mockSaveLog,
      };
    }),
  };
});

// Import THE HANDLER
// eslint-disable-next-line no-restricted-syntax
import { POST } from '../../../src/pages/api/logs';

// ============================================================================
// HELPER FUNC
// ============================================================================
function createMockContext(body: unknown, userAgent: string = 'TestAgent/1.0') {
  const request = new Request('http://localhost:4321/api/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-agent': userAgent,
    },
    // Si body es string asume malformed JSON, de lo contrario valid JSON
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

  const cookies = {};
  return { request, cookies } as unknown as Parameters<typeof POST>[0];
}

// ============================================================================
// TEST SUITE
// ============================================================================
describe('Client Logs API Endpoint POST /api/logs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 204 and NOT call saveLog for invalid payload schema', async () => {
    const context = createMockContext({
      level: 'critical', // Invalido, debe ser error, warn, info
      // missing message
    });

    const response = await POST(context);

    // Regla AL13: Fire-and-Forget, nunca lanza 500/400 para evitar loops en cliente
    expect(response.status).toBe(204);

    // El repositorio no debio ser llamado porque fallo Zod
    expect(mockSaveLog).not.toHaveBeenCalled();
  });

  it('should return 204 and NOT call saveLog for malformed JSON', async () => {
    const context = createMockContext('{ this is not valid JSON }');

    const response = await POST(context);
    expect(response.status).toBe(204);
    expect(mockSaveLog).not.toHaveBeenCalled();
  });

  it('should return 204 and call saveLog for a valid payload', async () => {
    const validPayload = {
      level: 'error',
      message: 'Uncaught TypeError: cannot read properties of undefined',
      source: 'app.js',
      lineno: 42,
      colno: 12,
      url: 'http://localhost:4321/cotizador',
    };

    const context = createMockContext(validPayload, 'Mozilla/5.0 TestBrowser');

    const response = await POST(context);
    expect(response.status).toBe(204);

    // El repositorio debio ser llamado con los sanitizados y el userAgent ruteado
    expect(mockSaveLog).toHaveBeenCalledTimes(1);
    expect(mockSaveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'error',
        message: 'Uncaught TypeError: cannot read properties of undefined',
        lineno: 42,
      }),
      'Mozilla/5.0 TestBrowser'
    );
  });
});
