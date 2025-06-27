import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import AdSenseBanner from '@/widgets/adsense-banner'
import Banner from '@/widgets/banner'
import type { Metadata } from 'next'
import Link from 'next/link'
import Post from './(content)/board/[category]/ui/post'

// app/layout.tsx
export const metadata = {
   /* ───────── 제목 ───────── */
   title: {
      default: '제로리진 커뮤니티 플랫폼',
      template: '%s | 제로리진 커뮤니티',
   },

   /* ───────── 설명 ───────── */
   description:
      '제로리진(0rigin)은 관심사 기반 토론·지식 공유·협업이 한곳에서 이루어지는 차세대 커뮤니티 플랫폼입니다. 다양한 의견을 자유롭게 나누어 보세요.',

   /* ───────── 키워드 ───────── */
   keywords: [
      '제로리진',
      '0rigin',
      'origin community',
      '커뮤니티 플랫폼',
      '온라인 포럼',
      '지식 공유',
      '토론',
      '프로젝트 협업',
   ],

   /* ───────── 파비콘 ───────── */
   icons: { icon: '/favicon.ico' },

   /* ───────── 저작자 ───────── */
   authors: [{ name: '제로리진 팀', url: 'https://0rigin.space' }],

   /* ───────── 뷰포트 ───────── */
   viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },

   /* ───────── Open Graph ───────── */
   openGraph: {
      type: 'website',
      url: 'https://0rigin.space',
      siteName: '제로리진',
      title: '제로리진 커뮤니티 플랫폼',
      description:
         '토론·지식 공유·프로젝트 협업까지 한 번에! 지금 제로리진에서 새로운 인사이트를 얻어 보세요.',
      images: [
         {
            url: 'https://0rigin.space/og-cover.png',
            width: 1200,
            height: 630,
            alt: '제로리진 커뮤니티 미리보기',
         },
      ],
      locale: 'ko_KR',
   },

   /* ───────── Twitter Card ───────── */
   twitter: {
      card: 'summary_large_image',
      title: '제로리진 커뮤니티 플랫폼',
      description:
         '관심사 기반 토론과 지식 공유가 가능한 제로리진(0rigin)에 참여해 보세요!',
      images: ['https://0rigin.space/og-cover.png'],
   },

   /* ───────── Canonical ───────── */
   alternates: { canonical: 'https://0rigin.space' },
} satisfies Metadata

export default async function Home() {
   const supabase = await SupabaseServerClient()
   const { data: bestPosts, error: bestPostsError } = await supabase
      .from('posts')
      .select('*')
      .order('view_count', { ascending: false })
      .limit(5)

   const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

   if (postsError || bestPostsError) {
      throw new Error(postsError?.message || bestPostsError?.message)
   }

   return (
      <div className="flex flex-col gap-1 min-h-screen">
         <AdSenseBanner />
         <Banner data={bestPosts} />
         <div className="flex flex-col gap-2 px-2 flex-grow">
            <div className="flex justify-between py-2 border-b-2 border-gray-200">
               <h1 className="text-xl font-bold ">최신 게시물</h1>
               <Link
                  href="/board"
                  className="text-xs text-end self-end text-gray-500"
               >
                  더보기
               </Link>
            </div>
            <Post postData={posts} />
         </div>
      </div>
   )
}
