import Banner from '@/components/Banner/Banner'
import BoardContent from '@/components/Board/BoardContent'
import { Metadata } from 'next'
import { updateIncrementCount } from './api/board/tickerApi'
import { fetchTopPosts } from './api/board/post/fetchPostApi'

export const metadata: Metadata = {
   title: '0rigin 홈',
}
export const revalidate = 10

async function Home() {
   const topData = await fetchTopPosts()
   await updateIncrementCount('visit')
   return (
      <section>
         <div className="flex flex-wrap justify-between border border-black p-1 ">
            <Banner topData={topData} />
            <BoardContent />
         </div>
      </section>
   )
}

export default Home
