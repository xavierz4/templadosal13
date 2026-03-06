import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';
import { config } from '@core/config/env';
import type { Database } from '@core/types/database.types';

/**
 * Factory para crear un cliente Supabase SSR con cookies HttpOnly.
 * 
 * Mandado por Security Design Document §2.1:
 * - Usa @supabase/ssr (directiva oficial del SDK SSR)
 * - Cookies: HttpOnly, Secure, SameSite=Strict
 * - NO usa localStorage (prevención XSS)
 * 
 * REGLA 6: Variables de entorno solo desde @core/config/env
 */
export function createSupabaseServerClient(request: Request, cookies: AstroCookies) {
  return createServerClient<Database>(
    config.PUBLIC_SUPABASE_URL,
    config.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '').map(c => ({
            name: c.name,
            value: c.value ?? '',
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, {
              ...options,
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              path: '/',
            });
          });
        },
      },
    }
  );
}
