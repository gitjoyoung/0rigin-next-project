// eslint.config.mjs 수정 (최소 설정)
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
         parserOptions: {
            project: './tsconfig.json',
         },
      },
      rules: {
         // 기본 규칙
         '@typescript-eslint/no-empty-object-type': 'off',
         '@typescript-eslint/no-explicit-any': 'warn',
         '@typescript-eslint/no-unused-vars': 'off',

         // 타입 안전성 규칙 (경고로 설정)
         '@typescript-eslint/no-floating-promises': 'warn',
         '@typescript-eslint/no-misused-promises': 'warn',
         '@typescript-eslint/no-unsafe-assignment': 'warn',
         '@typescript-eslint/no-unsafe-call': 'warn',
         '@typescript-eslint/no-unsafe-member-access': 'warn',
         '@typescript-eslint/no-unsafe-return': 'warn',
         '@typescript-eslint/no-unsafe-argument': 'warn',

         // React Hook 의존성은 에러로 유지
         'react-hooks/exhaustive-deps': 'error',

         // Next.js 최적화를 경고로 변경
         '@next/next/no-img-element': 'warn',
      },
   },
]

export default eslintConfig
