// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import AstroPWA from '@vite-pwa/astro';

// ── Environment-Aware Config ──────────────────────────────────────────────────
// In DEVELOPMENT: Skip Cloudflare adapter runtime emulation AND PWA plugin.
// Both add per-request middleware overhead (Wrangler KV emulation ~2-5s,
// service worker manifest injection ~1-3s) that is NOT needed for coding.
//
// The Cloudflare adapter only matters at BUILD time.
// The PWA plugin only matters for the deployed service worker.
//
// In PRODUCTION (astro build): Full config is still used (adapter + PWA).
// To stop using dev-mode toggle: set DEV_FAST=false in your environment.
// ─────────────────────────────────────────────────────────────────────────────
const isDevMode = process.env.NODE_ENV !== 'production';

export default defineConfig({
  site: 'https://templados-al13.com',
  output: 'static',

  // Precarga las páginas enlazadas antes del clic. Sin esto, los atributos
  // data-astro-prefetch del Navbar no tienen efecto (el script nunca se inyecta).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // Only attach the Cloudflare adapter during production builds.
  // In dev mode, Astro uses its built-in Vite dev server.
  ...(isDevMode ? {} : { adapter: cloudflare() }),

  integrations: [
    svelte(),
    sitemap(),

    // Only inject PWA plugin in production builds.
    // In dev mode, this plugin adds service worker registration to every
    // HTML response, which triggers extra Vite transforms per-request.
    ...(!isDevMode ? [
      AstroPWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Templados AL13',
          short_name: 'AL13 B2B',
          description: 'Portal B2B de Cristal Templado y Aluminio Arquitectónico',
          theme_color: '#0A0A0A',
          background_color: '#0A0A0A',
          display: 'standalone',
          icons: [
            { src: '/favicon.svg', sizes: '192x192', type: 'image/svg+xml' },
            { src: '/favicon.svg', sizes: '512x512', type: 'image/svg+xml' },
          ],
        },
        workbox: {
          navigateFallback: '/',
          // Solo assets ligeros: precachear los chunks JS pesados (Three.js ~807KB,
          // admin ~237KB) compite con el video del hero en la primera visita.
          globPatterns: ['**/*.{css,html,svg,ico,txt}'],
          globIgnores: ['**/CatalogInteractiveViewer.*.js', '**/admin.*.js'],
        },
      }),
    ] : []),
  ],

  devToolbar: { enabled: false },

  vite: {
    plugins: [tailwindcss()],

    // Pre-bundle heavy SSR dependencies once at startup instead of per-request.
    // Eliminates on-demand compilation of Three.js (500+ files) and lucide-svelte
    // (1400+ icons) on each incoming page request.
    ssr: {
      noExternal: ['three', '@threlte/core', '@threlte/extras', 'lucide-svelte'],
    },

    optimizeDeps: {
      include: [
        'three',
        'lucide-svelte',
        '@threlte/core',
        '@threlte/extras',
        'chart.js',
      ],
    },
  },
});