/** @type {import('next').NextConfig} */
// 커스텀 PWA 구현 - next-pwa 플러그인 제거

const nextConfig = {
   experimental: {
      scrollRestoration: false, // 스크롤 복원 비활성화
   },
   images: {
      domains: [
         'source.unsplash.com',
         'wqgbhahmhmeuzjvrszjj.supabase.co',
         'picsum.photos',
         'avatars.githubusercontent.com',
         'lh3.googleusercontent.com',
      ],
   },
   typescript: {
      ignoreBuildErrors: true,
   }, // 빌드 시 타입스크립트 오류를 무시
   eslint: {
      ignoreDuringBuilds: true,
   }, // 빌드 시 eslint 무시
   compiler: {
      removeConsole: process.env.NODE_ENV === 'production', // 프로덕션 빌드에서만 콘솔 로그 제거
   },
   logging: {
      fetches: {
         fullUrl: true,
      },
      level: 'verbose', // 로깅 레벨을 verbose로 설정
   },
}

module.exports = nextConfig
