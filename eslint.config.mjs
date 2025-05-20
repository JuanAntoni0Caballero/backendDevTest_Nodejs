import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import parser from '@typescript-eslint/parser'
import eslintPluginTs from '@typescript-eslint/eslint-plugin'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  {
    files: ['**/*.ts'],
    ignores: ['dist', 'node_modules', 'jest.config.js', 'shared/k6/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...eslintPluginTs.configs.recommended.rules,
      'no-console': 'warn',
      'prettier/prettier': 'error',
    },
  },
  {
    rules: {
      ...prettier.rules,
    },
  },
])
