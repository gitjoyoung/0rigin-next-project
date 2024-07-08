import Banner from '@/components/Banner/Banner'
import { Post, TopPost } from '@/types/boardTypes'
import BoardList from './board/_components/Content/BoardList'
interface Response {
   topData: TopPost[]
   fetchedPosts: Post[]
}

export default async function Home() {
   const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      cache: 'no-store',
   })
   const { topData, fetchedPosts }: Response = await data.json()

   return (
      <section className="flex flex-wrap border border-black p-1 ">
         <Banner topData={topData} />
         <BoardList postData={fetchedPosts} />
      </section>
   )
}
