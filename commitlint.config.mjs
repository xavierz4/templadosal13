export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Tipos permitidos (feat, fix, refactor, docs, test, chore, perf, ci, build)
    'type-enum': [
      2, 'always',
      ['feat', 'fix', 'refactor', 'docs', 'test', 'chore', 'perf', 'ci', 'build', 'revert']
    ],
    // Scope es obligatorio para este proyecto
    'scope-empty': [1, 'never'], // warn si falta scope
    // Descripción no puede estar vacía
    'subject-empty': [2, 'never'],
    // Descripción en minúsculas
    'subject-case': [2, 'always', 'lower-case'],
    // Sin punto al final del commit message
    'subject-full-stop': [2, 'never', '.'],
    // Header máximo 100 caracteres
    'header-max-length': [2, 'always', 100],
  },
};
