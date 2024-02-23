/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')()
const nextConfig = {
   // sw 국제화 설정 html lang = "ko"
   i18n: {
      locales: ['ko'],
      defaultLocale: 'ko',
   },
}

module.exports = removeImports({
   ...nextConfig,
})
