import { writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const manifest = {
   name: '0RIGIN SPACE',
   short_name: '0rigin',
   description:
      'AI 시대에 인간 고유의 가치를 탐구하는 철학·인문학 커뮤니티 플랫폼. 철학적 질문, 토론, 퀴즈 기반 학습, 건전한 커뮤니티 문화를 제공합니다.',
   start_url: '/',
   display: 'standalone',
   background_color: '#ffffff',
   theme_color: '#000000',
   orientation: 'portrait-primary',
   lang: 'ko',
   scope: '/',
   categories: ['education', 'community', 'philosophy', 'humanities', 'ai'],
   icons: [
      {
         src: '/favicon.ico',
         sizes: '64x64 32x32 24x24 16x16',
         type: 'image/x-icon',
      },
      {
         src: '/images/introduce/logo.png',
         sizes: '192x192',
         type: 'image/png',
         purpose: 'any maskable',
      },
      {
         src: '/images/introduce/logo.png',
         sizes: '512x512',
         type: 'image/png',
         purpose: 'any maskable',
      },
   ],
   shortcuts: [
      {
         name: '커뮤니티 게시판',
         short_name: '게시판',
         url: '/board',
         description:
            '철학 질문, AI 윤리, 자유 토론 등 다양한 주제의 커뮤니티 게시판',
         icons: [
            {
               src: '/images/introduce/logo.png',
               sizes: '192x192',
               type: 'image/png',
            },
         ],
      },
      {
         name: '퀴즈',
         short_name: '퀴즈',
         url: '/quiz',
         description: '객관식, OX 등 다양한 철학 퀴즈로 재미있게 학습',
         icons: [
            {
               src: '/images/introduce/logo.png',
               sizes: '192x192',
               type: 'image/png',
            },
         ],
      },
   ],
   related_applications: [],
   prefer_related_applications: false,
   display_override: ['window-controls-overlay'],
   edge_side_panel: {
      preferred_width: 480,
   },
}

const outPath = resolve(__dirname, '../public/manifest.json')
writeFileSync(outPath, JSON.stringify(manifest, null, 2), 'utf-8')
