import { Post } from '@/types/boardTypes'
import Banner from '@/components/Banner/Banner'
import BoardContent from '@/components/Board/BoardContent'
import { Metadata } from 'next'

import { updateIncrementCount } from './api/board/tickerApi'
import {
   fetchLatestPostId,
   fetchPosts,
   fetchTopPosts,
} from './api/board/post/fetchPostApi'

export const metadata: Metadata = {
   title: '0rigin 홈',
}

export default async function Home() {
   const lastpostId = await fetchLatestPostId()
   const postData: Post[] = await fetchPosts(1, lastpostId, 20)
   const topData = await fetchTopPosts()
   await updateIncrementCount('visit')

   return (
      <section>
         <div className="flex flex-wrap justify-between border border-black p-1 ">
            <Banner topData={topData} />
            <BoardContent postData={postData} page={1} />
         </div>
      </section>
   )
}
