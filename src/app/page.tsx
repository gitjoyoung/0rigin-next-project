import { getBestPosts, getPosts } from '@/entities/post'
import AdSenseBanner from '@/widgets/adsense-banner'
import Banner from '@/widgets/banner'
import Link from 'next/link'
import Post from './(content)/board/[category]/ui/post-list'

export default async function Home() {
   const POST_PER_PAGE = 20
   const BEST_POSTS_LIMIT = 5

   const bestPosts = await getBestPosts({
      limit: BEST_POSTS_LIMIT,
   })

   const { items } = await getPosts({
      page: 1,
      limit: POST_PER_PAGE,
   })

   return (
      <div className="flex flex-col gap-1 min-h-screen">
         <AdSenseBanner />
         <Banner data={bestPosts} />
         <div className="flex flex-col gap-1 flex-grow">
            <div className="flex justify-between py-1 ">
               <h1 className="text-xl font-bold ">최신 게시물</h1>
               <Link
                  href="/board/latest"
                  className="text-xs text-end self-end text-gray-500"
               >
                  더보기
               </Link>
            </div>
            <Post data={items} />
         </div>
      </div>
   )
}
