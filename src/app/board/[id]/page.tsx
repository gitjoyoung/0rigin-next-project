import BoardContent from '@/components/Board/BoardContent'
import BoardFooter from '@/components/Board/BoardFooter'
import BoardHeader from '@/components/Board/BoardHeader'
import CommentList from '@/components/Board/Comment/CommentList'
import Pagination from '@/components/Board/Pagination'
import BoardRead from '@/components/Board/Read/BoardRead'
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
   if (id === undefined) redirect('/board')

   const page = searchParams.page || '1'
   console.log(id, page)

   const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/board/read?id=${id}&page=${page}`,
   )
   const { fetchedPosts, readData, commentsData, lastPostId }: Response =
      await data.json()

   return (
      <>
         <BoardHeader title="왁자지껄 게시판" />
         <BoardRead postId={id} readData={readData} />
         <CommentList postId={id} commentsData={commentsData} />
         <BoardContent postData={fetchedPosts} />
         <Pagination lastPostId={lastPostId} pageNum={id} />
         <BoardFooter />
      </>
   )
}
