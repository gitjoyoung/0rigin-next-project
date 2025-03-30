import { Metadata } from 'next'
import BoardFooter from './ui/BoardFooter'
import PostList from './ui/Content'
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
   const { page } = await searchParams
   if (page) return { title: `게시판 ${page} Page` }
   return { title: '게시판' }
}

export default async function Page({ searchParams }: Params) {
   const { page } = await searchParams
   const currentPage: number = Number(page) || 1

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
      <section className="flex flex-col gap-4">
         <PostList postData={postData} />
         ㄴ <BoardFooter />
         <Pagination totalPages={lastPostId} currentPage={currentPage} />
      </section>
   )
}
