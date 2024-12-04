import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/docs/'],
  },
  ...compat.extends('prettier'),
  {
    plugins: {
      jsdoc,
      prettier,
    },

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },

    rules: {
      'prettier/prettier': 'error',
    },
  },
];