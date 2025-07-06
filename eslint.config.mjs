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
      rules: {
         '@typescript-eslint/no-empty-object-type': 'off',
         '@typescript-eslint/no-explicit-any': 'off',
         '@typescript-eslint/no-unused-vars': 'off',
      },
   },
]

export default eslintConfig
