/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
   dest: 'public',
   register: true,
   skipWaiting: true,
   disable: process.env.NODE_ENV === 'development',
   runtimeCaching: [
      {
         urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
         handler: 'CacheFirst',
         options: {
            cacheName: 'google-fonts-cache',
            expiration: {
               maxEntries: 10,
               maxAgeSeconds: 60 * 60 * 24 * 365, // 1년
            },
         },
      },
      {
         urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
         handler: 'CacheFirst',
         options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
               maxEntries: 10,
               maxAgeSeconds: 60 * 60 * 24 * 365, // 1년
            },
         },
      },
      {
         urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
         handler: 'CacheFirst',
         options: {
            cacheName: 'images-cache',
            expiration: {
               maxEntries: 100,
               maxAgeSeconds: 60 * 60 * 24 * 30, // 30일
            },
         },
      },
   ],
})

const nextConfig = {
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

module.exports = withPWA(nextConfig)
