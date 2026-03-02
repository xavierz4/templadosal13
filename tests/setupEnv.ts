import '@testing-library/jest-dom'; // Just ensuring type safety

// Provide dummy API keys so the Zod env.ts validator doesn't crash the Node process during tests
process.env.PUBLIC_SUPABASE_URL = 'http://mock-supabase.localhost';
process.env.PUBLIC_SUPABASE_ANON_KEY = 'mock_anon_key_for_testing';
process.env.RESEND_API_KEY = 're_test_mock1234';
