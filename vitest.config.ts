import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte({ hot: false })
  ],
  resolve: {
    conditions: ['mode', 'browser'], // Soporte Svelte 5 SSR Bug
    alias: {
      '@core': '/src/core',
      '@shared': '/src/shared',
      '@modules': '/src/modules',
      '@pages': '/src/pages',
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
