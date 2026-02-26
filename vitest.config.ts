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
    setupFiles: ['./tests/setupEnv.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'json-summary'],
      include: ['src/core/domain/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts', '**/repositories/I*.ts', '**/services/I*.ts', '**/strategies/*.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
  },
});
