import { Post, TopPost } from '@/types/boardTypes'
import AdBanner from '@/widgets/AdBanner/AdBanner'
import Banner from '@/widgets/Banner/Banner'
import BoardList from './(content)/board/ui/Content/BoardList'

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
      <div className="flex flex-col gap-2">
         <AdBanner />
         <Banner topData={topData} />
         <BoardList postData={fetchedPosts} />
      </div>
   )
}
