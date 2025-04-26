import { SupabaseServerClient } from '@/lib/supabase/supabase-server-client'
import AdSenseBanner from '@/widgets/adsense-banner.tsx'
import Banner from '@/widgets/banner'
import Post from './(content)/board/ui/post'

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
      .order('likes', { ascending: false })
      .limit(5)

   const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('likes', { ascending: false })
      .limit(20)

   if (postsError || bestPostsError) {
      throw new Error(postsError?.message || bestPostsError?.message)
   }

   return (
      <div className="flex flex-col gap-2">
         <AdSenseBanner />
         <Banner topData={bestPosts} />
         <Post postData={posts} />
      </div>
   )
}
