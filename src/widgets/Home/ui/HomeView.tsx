'use client'

import Banner from '@/components/Banner/Banner'
import BoardList from '@/app/board/_components/Content/BoardList'
import { Post, TopPost } from '@/types/boardTypes'

interface HomeViewProps {
   topData: TopPost[]
   fetchedPosts: Post[]
}

export default function HomeView({ topData, fetchedPosts }: HomeViewProps) {
   return (
      <section className="flex flex-wrap border border-black p-1">
         <Banner topData={topData} />
         <BoardList postData={fetchedPosts} />
      </section>
   )
}
