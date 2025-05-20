import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import prettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
    plugins: {
      js,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
      'no-var': 'error',
      'prefer-const': 'warn',
      'max-len': ['warn', { code: 100, ignoreUrls: true }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prettier/prettier': 'error',
    },
  },
  {
    linterOptions: {
      configType: 'flat',
    },
    settings: {},
    rules: {
      ...prettier.rules,
    },
  },
  {
    ignores: ['node_modules', 'dist', '.env'],
  },
])
