import { Metadata } from 'next'
import BoardFooter from './ui/BoardFooter'
import BoardContent from './ui/Content'
import Pagination from './ui/Pagination/CustomPagination'
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
   const currentPage: number = Number(searchParams.page) || 1

   const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/board?page=${currentPage}`,
      {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
         cache: 'no-store',
      },
   )

   // @TODO totalPages 만들어야 함
   const { lastPostId, postData } = await data.json()

   return (
      <>
         <BoardContent postData={postData} />
         <Pagination totalPages={lastPostId} currentPage={currentPage} />
         <BoardFooter />
      </>
   )
}
