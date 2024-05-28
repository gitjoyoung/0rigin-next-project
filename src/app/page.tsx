import Banner from '@/components/Banner/Banner'
import BoardContent from '@/components/Board/BoardContent'
import { Metadata } from 'next'
import BoardSuspense from '@/components/Board/BoardSuspense'
import { updateIncrementCount } from './api/board/tickerApi'
import {
   fetchLatestPostId,
   fetchPosts,
   fetchTopPosts,
} from './api/board/post/fetchPostApi'

export const metadata: Metadata = {
   title: '0rigin 홈',
}
export const revalidate = 10

async function Home() {
   const topData = await fetchTopPosts()
   await updateIncrementCount('visit')

   const lastPostId = await fetchLatestPostId()
   const fetchedPosts = await fetchPosts(1, lastPostId, 20)

   return (
      <section className="flex flex-wrap justify-between border border-black p-1 ">
         <Banner topData={topData} />
         <BoardContent postData={fetchedPosts} />
      </section>
   )
}

export default Home
