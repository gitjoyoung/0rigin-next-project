import BoardContent from '@/components/Board/BoardContent'
import Pagination from '@/components/Board/Pagination/Pagination'
import { IParams } from '@/types/common/IParams'
import { Metadata } from 'next'

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

export default async function Page({ searchParams }: IParams) {
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
   const { lastPostId, postData, topData } = await data.json()
   return (
      <>
         <BoardContent postData={postData} topData={topData} />
         <Pagination lastPostId={lastPostId} pageNum={page} />
      </>
   )
}
