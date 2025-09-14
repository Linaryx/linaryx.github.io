// Flat ESLint config (ESLint v9)
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

// no compat needed for vue/ts: use plugins' flat configs

export default [
  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      '.vitepress/cache/**',
      '.vitepress/dist/**',
      'dist/**',
      'config/.vitepress/cache/**',
      'config/.vitepress/dist/**'
    ]
  },

  // Base JS recommended
  js.configs.recommended,

  // Vue and TypeScript recommended (flat) + Prettier compatibility
  ...vue.configs['flat/recommended'],
  ...tseslint.configs.recommended,

  // Project overrides
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { vue, '@typescript-eslint': tsPlugin },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // TS handles undefined symbols; avoid false-positives in SFC types
      'no-undef': 'off',
    },
  },
];
