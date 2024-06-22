import BoardContent from '@/components/Board/BoardContent'
import CommentList from '@/components/Board/Comment/CommentList'
import Pagination from '@/components/Board/Pagination/Pagination'
import BoardRead from '@/components/Board/Read/BoardRead'
import { ROUTES } from '@/constants/route'
import { Post } from '@/types/boardTypes'
import { CommentData } from '@/types/commentTypes'
import { IParams } from '@/types/common/IParams'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export async function generateMetadata({
   params,
   searchParams,
}: IParams): Promise<Metadata> {
   const { id } = params
   const { page } = searchParams
   if (page === undefined) return { title: `${id}번 게시글` }
   return {
      title: `${id}번 게시글 ${page} 페이지 `,
      description: `게시글 ${id}번의 ${page} 페이지 입니다.`,
   }
}

interface Response {
   fetchedPosts: Post[]
   readData: Post
   commentsData: CommentData[]
   lastPostId: number
}
export default async function Page({ params, searchParams }: IParams) {
   const { id } = params
   if (id === undefined) redirect(ROUTES.BOARD)
   const page = searchParams.page || '1'

   const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/board/read?id=${id}&page=${page}`,
      {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
         cache: 'no-store',
      },
   )
   const { fetchedPosts, readData, lastPostId }: Response = await data.json()

   return (
      <>
         <BoardRead postId={id} readData={readData} />
         <CommentList postId={id} />
         <BoardContent postData={fetchedPosts} />
         <Pagination lastPostId={lastPostId} pageNum={id} />
      </>
   )
}
