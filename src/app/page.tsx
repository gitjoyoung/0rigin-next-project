import { Post, TopPost } from '@/types/boardTypes'
import BoardList from './(content)/board/_components/Content/BoardList'
import Banner from '@/widgets/Banner/Banner'
import AdBanner from '@/widgets/AdBanner/AdBanner'

export const metadata = {
   title: {
      default: 'HOME | 0rigin project',
      template: '%s | 0rigin project',
   },
   description: '제로리진 프로젝트',
   keywords: ['origin', '0rigin'],
   icon: '/favicon.ico',
}
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
      <>
         <AdBanner />
         <Banner topData={topData} />
         <BoardList postData={fetchedPosts} />
      </>
   )
}
