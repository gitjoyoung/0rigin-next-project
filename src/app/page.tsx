import { getBestPosts, getPosts } from '@/entities/post'
import AdSenseBanner from '@/widgets/adsense-banner'
import Banner from '@/widgets/banner'
import type { Metadata } from 'next'
import Link from 'next/link'
import Post from './(content)/board/[category]/ui/post'

// app/layout.tsx
export const metadata = {
   /* ───────── 제목 ───────── */
   title: {
      default: '0RIGIN(제로리진) - 무, 공, 허무 그리고 아포리아',
      template: '%s | 0RIGIN(제로리진)',
   },

   /* ───────── 설명 ───────── */
   description:
      '0RIGIN(제로리진)은 철학, 기술, 과학, 수학에 대한 깊이 있는 토론·지식 공유·협업이 한곳에서 이루어지는 차세대 커뮤니티 플랫폼입니다. 다양한 의견을 자유롭게 나누어 보세요.',

   /* ───────── 키워드 ───────── */
   keywords: [
      '제로리진',
      '0RIGIN',
      '0rigin',
      'origin community',
      '커뮤니티 플랫폼',
      '온라인 포럼',
      '지식 공유',
      '토론',
      '프로젝트 협업',
      '철학',
      '기술',
      '과학',
      '수학',
   ],

   /* ───────── 파비콘 ───────── */
   icons: { icon: '/favicon.ico' },

   /* ───────── 저작자 ───────── */
   authors: [{ name: '0RIGIN(제로리진) 팀', url: 'https://0rigin.space' }],

   /* ───────── 뷰포트 ───────── */
   viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },

   /* ───────── Open Graph ───────── */
   openGraph: {
      type: 'website',
      url: 'https://0rigin.space',
      siteName: '0RIGIN(제로리진)',
      title: '0RIGIN(제로리진) - 무, 공, 허무 그리고 아포리아',
      description:
         '철학, 기술, 과학, 수학에 대한 깊이 있는 토론·지식 공유·프로젝트 협업까지 한 번에! 지금 0RIGIN(제로리진)에서 새로운 인사이트를 얻어 보세요.',
      images: [
         {
            url: '/images/introduce/logo.png',
            width: 1200,
            height: 630,
            alt: '0RIGIN(제로리진) 커뮤니티 미리보기',
         },
      ],
      locale: 'ko_KR',
   },

   /* ───────── Twitter Card ───────── */
   twitter: {
      card: 'summary_large_image',
      title: '0RIGIN(제로리진) - 무, 공, 허무 그리고 아포리아',
      description:
         '철학, 기술, 과학, 수학에 대한 깊이 있는 토론과 지식 공유가 가능한 0RIGIN(제로리진)에 참여해 보세요!',
      images: ['/images/introduce/logo.png'],
   },

   /* ───────── Canonical ───────── */
   alternates: { canonical: 'https://0rigin.space' },
} satisfies Metadata

export default async function Home() {
   const POST_PER_PAGE = 20
   const BEST_POSTS_LIMIT = 5

   const bestPosts = await getBestPosts({
      limit: BEST_POSTS_LIMIT,
   })

   const posts = await getPosts({
      page: 1,
      limit: POST_PER_PAGE,
   })

   return (
      <div className="flex flex-col gap-1 min-h-screen">
         <AdSenseBanner />
         <Banner data={bestPosts} />
         <div className="flex flex-col gap-1 px-2 flex-grow">
            <div className="flex justify-between py-1 ">
               <h1 className="text-xl font-bold ">최신 게시물</h1>
               <Link
                  href="/board/latest"
                  className="text-xs text-end self-end text-gray-500"
               >
                  더보기
               </Link>
            </div>
            <Post postData={posts.items} />
         </div>
      </div>
   )
}
