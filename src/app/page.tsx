import { getBestPosts, getPosts } from '@/entities/post'
import AnimatedBanner from '@/widgets/animated-banner'
import Banner from '@/widgets/banner'
import PostList from '@/widgets/board/post-list'
import Link from 'next/link'

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
      <div className="flex flex-col gap-1 h-full">
         <AnimatedBanner />
         <div className="flex flex-col gap-1">
            <div className="flex justify-between py-1  mb-1 ">
               <h1 className="sm:text-base text-sm font-bold ">BEST POSTS</h1>
               <Link
                  href="/board/latest"
                  className="text-xs text-end self-end text-gray-500"
               >
                  더보기
               </Link>
            </div>
            <Banner data={bestPosts} />
         </div>
         <div className="flex flex-col gap-1 flex-grow ">
            <div className="flex justify-between py-1 mb-1">
               <h1 className="sm:text-base text-sm font-bold ">LATEST POSTS</h1>
               <Link
                  href="/board/latest"
                  className="text-xs text-end self-end text-gray-500"
               >
                  더보기
               </Link>
            </div>
            <PostList data={items} />
         </div>
      </div>
   )
}
