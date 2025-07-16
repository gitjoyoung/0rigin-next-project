import { ROUTE_BOARD } from '@/constants/pathname'
import { getBestPosts, getPosts } from '@/entities/post'
import AnimatedBanner from '@/widgets/animated-banner'
import Banner from '@/widgets/banner'
import PostList from '@/widgets/board/post/post-list'
import Link from 'next/link'

const Title = ({ title, href }: { title: string; href: string }) => (
   <div className="flex justify-between py-1  mb-1 ">
      <h1 className="sm:text-base text-sm font-bold ">{title}</h1>
      <Link href={href} className="text-xs text-end self-end text-gray-500">
         더보기
      </Link>
   </div>
)

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
      <div className="flex flex-col h-full">
         <AnimatedBanner />
         <div className="flex flex-col gap-1">
            <Title title="BEST POSTS" href={`${ROUTE_BOARD}/best`} />
            <Banner data={bestPosts} />
         </div>
         <div className="flex flex-col gap-1 flex-grow ">
            <Title title="LATEST POSTS" href={`${ROUTE_BOARD}/latest`} />
            <PostList data={items} />
         </div>
      </div>
   )
}
