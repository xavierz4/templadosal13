import '@testing-library/jest-dom'; // Just ensuring type safety
import { vi } from 'vitest';

// Provide dummy API keys so the Zod env.ts validator doesn't crash the Node process during tests
process.env.PUBLIC_SUPABASE_URL = 'http://mock-supabase.localhost';
process.env.PUBLIC_SUPABASE_ANON_KEY = 'mock_anon_key_for_testing';
process.env.RESEND_API_KEY = 're_test_mock1234';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
