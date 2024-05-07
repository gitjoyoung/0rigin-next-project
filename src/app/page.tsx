import Banner from '@/components/Banner/Banner'
import BoardContent from '@/components/Board/BoardContent'
import { Metadata } from 'next'
import { updateIncrementCount } from './api/board/tickerApi'
import { fetchTopPosts } from './api/board/post/fetchPostApi'
import BoardSuspense from '@/components/Board/BoardSuspense'

export const metadata: Metadata = {
   title: '0rigin 홈',
}
export const revalidate = 10

async function Home() {
   const topData = await fetchTopPosts()
   await updateIncrementCount('visit')
   return (
      <section className="flex flex-wrap justify-between border border-black p-1 ">
         <Banner topData={topData} />
         <BoardSuspense>
            <BoardContent />
         </BoardSuspense>
      </section>
   )
}

export default Home
