/** @type {import('next').NextConfig} */

const nextConfig = {
   images: {
      domains: [
         'source.unsplash.com',
         'wqgbhahmhmeuzjvrszjj.supabase.co',
         'picsum.photos',
      ],
   },
   typescript: {
      ignoreBuildErrors: true,
   }, // 빌드 시 타입스크립트 오류를 무시
   eslint: {
      ignoreDuringBuilds: true,
   }, // 빌드 시 eslint 무시
   webpack(config, options) {
      return config
   }, // 웹팩 설정을 추가합니다.
   logging: {
      fetches: {
         fullUrl: true,
      },
   },
   optimizeFonts: true,
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

module.exports = nextConfig
