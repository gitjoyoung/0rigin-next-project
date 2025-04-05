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
   const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

   if (error) {
      throw new Error(error.message)
   }

   return (
      <div className="flex flex-col gap-2">
         <AdSenseBanner />
         <Banner topData={posts} />
         <Post postData={posts} />
      </div>
   )
}
