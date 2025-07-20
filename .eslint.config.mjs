// eslint.config.mjs 수정
import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
   baseDirectory: __dirname,
})

const eslintConfig = [
   {
      ignores: ['public/*.js', 'scripts/**/*.ts'],
   },
   ...compat.extends('next/core-web-vitals', 'next/typescript'),
   {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
         parser: '@typescript-eslint/parser',
         parserOptions: {
            project: './tsconfig.json',
            tsconfigRootDir: __dirname,
            ecmaVersion: 'latest',
            sourceType: 'module',
         },
      },
      plugins: ['@typescript-eslint'],
      rules: {
         '@typescript-eslint/no-empty-object-type': 'off',
         '@typescript-eslint/no-explicit-any': 'off',
         '@typescript-eslint/no-unused-vars': 'off',
         // TypeScript 타입 체크 규칙 추가
         '@typescript-eslint/no-floating-promises': 'error',
         '@typescript-eslint/no-misused-promises': 'error',
         '@typescript-eslint/await-thenable': 'error',
         '@typescript-eslint/no-unsafe-assignment': 'error',
         '@typescript-eslint/no-unsafe-call': 'error',
         '@typescript-eslint/no-unsafe-member-access': 'error',
         '@typescript-eslint/no-unsafe-return': 'error',
         '@typescript-eslint/restrict-template-expressions': 'error',
      },
   },
]

export default eslintConfig
