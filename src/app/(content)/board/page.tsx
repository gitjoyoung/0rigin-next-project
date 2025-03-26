import { Metadata } from 'next'
import BoardFooter from './ui/BoardFooter'
import BoardContent from './ui/Content'
import Pagination from './ui/Pagination/Pagination'
interface Params {
   params: {
      id: string
   }
   searchParams: { page: string }
}

export async function generateMetadata({
   searchParams,
}: Params): Promise<Metadata> {
   const { page } = searchParams
   if (page) return { title: `게시판 ${page} Page` }
}

export default async function Page({ searchParams }: Params) {
   const page = searchParams.page || '1'
   const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/board?page=${page}`,
      {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
         cache: 'no-store',
      },
   )
   const { lastPostId, postData } = await data.json()
   return (
      <>
         <BoardContent postData={postData} />
         <Pagination lastPostId={lastPostId} pageNum={page} />
         <BoardFooter />
      </>
   )
}
