const dayjs = require('dayjs')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
   siteUrl: 'https://0rigin.space',
   generateRobotsTxt: true, // robots.txt 자동 생성
   generateIndexSitemap: false, // 인덱스 사이트맵 비활성화

   // 페이지 우선순위 및 업데이트 빈도 설정
   changefreq: 'daily',
   priority: 0.7,
   sitemapSize: 5000,

   // 제외할 경로들
   exclude: [
      '/admin/*',
      '/api/*',
      '/_next/*',
      '/login',
      '/sign/*',
      '/reset/*',
      '/forget/*',
      '/search/*',
      '/callback/*',
      '/preview/*',
      '/dev/*',
      '/test/*',
      '/staging/*',
      '/404',
      '/500',
      '/error',
      '/my-page/*', // 개인정보 관련
      '/*.json$',
      '/*.xml$',
      '/*.txt$',
   ],

   // 정적 페이지 정의
   additionalPaths: async (config) => {
      const pages = [
         // 메인 페이지
         { path: '/', priority: 1.0, changefreq: 'daily' },

         // 게시판 페이지
         { path: '/board', priority: 0.9, changefreq: 'daily' },
         { path: '/board/philosophy', priority: 0.8, changefreq: 'daily' },
         { path: '/board/technology', priority: 0.8, changefreq: 'daily' },
         { path: '/board/science', priority: 0.8, changefreq: 'daily' },
         { path: '/board/mathematics', priority: 0.8, changefreq: 'daily' },

         // 퀴즈 페이지
         { path: '/quiz', priority: 0.8, changefreq: 'weekly' },
         { path: '/quiz/programming', priority: 0.7, changefreq: 'weekly' },
         { path: '/quiz/science', priority: 0.7, changefreq: 'weekly' },
         {
            path: '/quiz/computer-science',
            priority: 0.7,
            changefreq: 'weekly',
         },
         { path: '/quiz/philosophy', priority: 0.7, changefreq: 'weekly' },

         // 유틸리티 페이지
         { path: '/utils', priority: 0.6, changefreq: 'monthly' },
         {
            path: '/utils/image-converter',
            priority: 0.5,
            changefreq: 'monthly',
         },
         { path: '/utils/format-number', priority: 0.5, changefreq: 'monthly' },

         // 정보 페이지
         { path: '/introduce', priority: 0.5, changefreq: 'monthly' },
         { path: '/contact', priority: 0.4, changefreq: 'monthly' },
         { path: '/help', priority: 0.4, changefreq: 'monthly' },
         { path: '/inquiry', priority: 0.4, changefreq: 'monthly' },

         // 대시보드
         { path: '/dashboard', priority: 0.6, changefreq: 'weekly' },
      ]

      return pages.map((page) => ({
         loc: page.path,
         changefreq: page.changefreq,
         priority: page.priority,
         lastmod: dayjs().toISOString(),
      }))
   },

   // robots.txt 설정
   robotsTxtOptions: {
      policies: [
         {
            userAgent: '*',
            allow: '/',
            disallow: [
               // 관리자 및 보안 관련
               '/admin/',
               '/api/',
               '/_next/',
               '/login',
               '/sign/',
               '/reset/',
               '/forget/',
               '/callback/',
               '/my-page/',

               // 검색 및 필터링 (무한 페이지 방지)
               '/search/',
               '*?search=*',
               '*?q=*',
               '*?query=*',
               '*?category=*',
               '*?page=*',
               '*?sort=*',
               '*?filter=*',
               '*?tag=*',
               '*?author=*',

               // 세션 및 인증
               '*?session=*',
               '*?token=*',
               '*?auth=*',
               '*?code=*',

               // 미리보기 및 임시
               '*?preview=*',
               '*?draft=*',
               '/preview/',
               '/dev/',
               '/test/',
               '/staging/',

               // 에러 페이지
               '/404',
               '/500',
               '/error',

               // 파일 확장자
               '/*.json$',
               '/*.xml$',
               '/*.txt$',
               '/*.pdf$',
               '/*.doc$',
               '/*.docx$',
            ],
         },
         // 특정 봇에 대한 추가 정책
         {
            userAgent: 'Googlebot',
            allow: '/',
            disallow: [
               '/admin/',
               '/api/',
               '/_next/',
               '/login',
               '/sign/',
               '/my-page/',
            ],
         },
         {
            userAgent: 'Bingbot',
            allow: '/',
            disallow: [
               '/admin/',
               '/api/',
               '/_next/',
               '/login',
               '/sign/',
               '/my-page/',
            ],
         },
      ],
      additionalSitemaps: ['https://0rigin.space/sitemap.xml'],
      // 크롤링 지연 설정 (선택사항)
      host: 'https://0rigin.space',
   },

   // 변환 함수 (추가 커스터마이징)
   transform: async (config, path) => {
      // 동적 라우트 처리 (예: 게시글 상세 페이지)
      if (path.match(/\/board\/[^\/]+\/\d+$/)) {
         return {
            loc: path,
            changefreq: 'weekly',
            priority: 0.6,
            lastmod: dayjs().toISOString(),
         }
      }

      // 기본 설정 반환
      return {
         loc: path,
         changefreq: config.changefreq,
         priority: config.priority,
         lastmod: config.autoLastmod ? dayjs().toISOString() : undefined,
      }
   },

   // 사이트맵 생성 후 처리
   async additionalSitemaps(config) {
      return ['https://0rigin.space/sitemap.xml']
   },
}
