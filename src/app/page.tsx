import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import AdSenseBanner from '@/widgets/adsense-banner'
import Banner from '@/widgets/banner'
import Link from 'next/link'
import Post from './(content)/board/[category]/ui/post'

export const metadata = {
   title: {
      default: 'HOME | 0rigin project',
      template: '%s | 0rigin project',
   },
   description: '제로리진 프로젝트',
   keywords: ['origin', '0rigin'],
   icon: '/favicon.ico',
}

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
