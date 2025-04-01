import { ROUTES } from '@/constants/route'
import { Post } from '@/types/boardTypes'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import BoardFooter from '../ui/BoardFooter'
import CommentList from '../ui/Comment'
import CustomPagination from '../ui/Pagination/CustomPagination'
import PostList from '../ui/Post'
import PostRead from '../ui/Read'

interface IParams {
   params: {
      id: string
   }
   searchParams: { page: string }
}

export async function generateMetadata({
   params,
   searchParams,
}: IParams): Promise<Metadata> {
   const { id } = await params
   const { page } = await searchParams
   if (page === undefined) return { title: `${id}번 게시글` }
   return {
      title: `${id}번 게시글 ${page} 페이지 `,
      description: `게시글 ${id}번의 ${page} 페이지 입니다.`,
   }
}

interface Response {
   fetchedPosts: Post[]
   readData: Post
   lastPostId: number
}
export default async function Page({ params, searchParams }: IParams) {
   const { id } = await params
   if (id === undefined) redirect(ROUTES.BOARD)
   const { page } = await searchParams
   const currentPage = Number(page) || 1

   const postData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/board/read?id=${id}&page=${currentPage}`,
      {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
         cache: 'no-store',
      },
   )
   const { fetchedPosts, readData, lastPostId }: Response =
      await postData.json()

   return (
      <section className="flex flex-col gap-4">
         <PostRead readData={readData} />
         <CommentList postId={id} />
         <PostList postData={fetchedPosts} />
         <BoardFooter />
         <CustomPagination totalPages={lastPostId} currentPage={currentPage} />
      </section>
   )
}
