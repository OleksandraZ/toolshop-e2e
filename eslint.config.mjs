import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  {
    ignores: [
      'playwright-report/**',
      'test-results/**',
      'blob-report/**',
      'node_modules/**',
      'eslint.config.mjs',
    ],
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  { ...playwright.configs['flat/recommended'], files: ['tests/**/*.ts'] },
  // Upgraded from 'warn': warnings don't fail `npm run lint`, so hard waits
  // and tests without assertions would otherwise pass CI.

  {
    files: ['tests/**/*.ts'],
    rules: {
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-force-option': 'error',
      'playwright/no-networkidle': 'error',
      'playwright/expect-expect': 'error',
    },
  },
);
