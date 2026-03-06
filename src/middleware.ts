import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './core/infrastructure/supabaseServer';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  // Solo aplicar el Auth Guard a rutas del panel administrativo, excluyendo el login
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    const supabase = createSupabaseServerClient(context.request, cookies);
    
    // Verificar si hay una sesión JWT válida en las cookies
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.warn(`[Middleware] Unauthorized access to ${url.pathname}. Redirecting to login.`);
      return redirect('/admin/login', 302);
    }
  }

  return next();
});
