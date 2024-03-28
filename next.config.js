/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')()

const nextConfig = {
   i18n: {
      locales: ['ko'],
      defaultLocale: 'ko',
   },
   images: {
      domains: ['firebasestorage.googleapis.com'],
   },
   typescript: {
      ignoreBuildErrors: true,
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
   webpack(config, options) {
      return config
   },
}

// 프로덕션 환경에서 콘솔 로그 제거 설정을 조건부로 추가합니다.
if (process.env.NEXT_PUBLIC_NODE_ENV === 'prod') {
   nextConfig.compiler = {
      ...nextConfig.compiler, // 기존 컴파일러 설정을 유지하면서 추가합니다.
      removeConsole: {
         exclude: ['error', 'warn'], // 'error'와 'warn' 로그를 제외하고 모두 제거
      },
   }
}

module.exports = removeImports(nextConfig)
