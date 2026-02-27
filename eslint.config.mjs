import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    ignores: [
      'dist/**/*',
      '.astro/**/*',
      'node_modules/**/*',
      'supabase/**/*',
      'tools/**/*',
      // Archivo de tipos generado por Supabase CLI (binario/auto-generado)
      'src/core/types/database.types.ts',
      // Svelte 5 rune syntax no soportado aún por el parser ESLint en estos archivos
      'src/modules/landing/ui/Hero.svelte',
      'src/modules/landing/ui/ValueProposition.svelte',
      'src/modules/admin/ui/LoginForm.svelte',
      'src/modules/admin/ui/KanbanBoard.svelte',
      'src/modules/admin/ui/KanbanCard.svelte',
      'src/modules/admin/ui/ProjectUploadForm.svelte',
      'src/modules/admin/ui/CatalogGrid.svelte',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // REGLA 0 — Rutas Absolutas: prohibido ../../ entre capas distintas
      // Usar @core/*, @shared/*, @modules/* en su lugar.
      'no-restricted-syntax': [
        'error',
        {
          selector: "ImportDeclaration[source.value=/^\\.\\.\\/\\.\\./]",
          message:
            "❌ REGLA 0: Prohibido importar con rutas relativas '../../'. " +
            "Usa los aliases absolutos: @core/*, @shared/*, @modules/*.",
        },
      ],
    },
  },
];
