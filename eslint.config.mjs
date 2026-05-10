import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      curly: ['error', 'all'],
      'no-duplicate-imports': 'error',
      'no-nested-ternary': 'error',
      'object-shorthand': ['error', 'always'],
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.property.name='then']",
          message: 'Avoid .then() - use async/await with try/catch instead.',
        },
        {
          selector: "CallExpression[callee.property.name='catch']",
          message: 'Avoid .catch() - use async/await with try/catch instead.',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-arrow-callback': 'error',
      'no-promise-executor-return': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'import/no-anonymous-default-export': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
  ]),
]);

export default eslintConfig;
