import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
    plugins: {
      js,
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": "warn",
      "no-var": "error",
      "prefer-const": "warn",
      "max-len": ["warn", { code: 100, ignoreUrls: true }],
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      ".env",
    ],
  },

]);
