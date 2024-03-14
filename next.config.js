/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')()
const nextConfig = {
   // sw 국제화 설정 html lang = "ko"
   i18n: {
      locales: ['ko'],
      defaultLocale: 'ko',
   },
}
if (process.env.NEXT_PUBLIC_NODE_ENV === 'prod') {
   nextConfig.compiler = {
      removeConsole: {
         exclude: ['error', 'warn'],
      },
   }
}

module.exports = removeImports({
   typescript: {
      ignoreBuildErrors: true,
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
   ...nextConfig,
   webpack(config, options) {
      return config
   },
})
