import { Post } from '@/types/boardTypes'
import { CommentData } from '@/types/commentTypes'
import { IParams } from '@/types/common/IParams'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import BoardHeader from '../_components/BoardHeader'
import BoardRead from '../_components/Read/BoardRead'
import CommentList from '../_components/Comment/CommentList'
import BoardContent from '../_components/Content/BoardContent'
import Pagination from '../_components/Pagination/Pagination'
import BoardFooter from '../_components/BoardFooter'

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
   const { fetchedPosts, readData, lastPostId }: Response = await data.json()

   return (
      <>
         <BoardHeader title="왁자지껄 게시판" />
         <BoardRead postId={id} readData={readData} />
         <CommentList postId={id} />
         <BoardContent postData={fetchedPosts} />
         <Pagination lastPostId={lastPostId} pageNum={id} />
         <BoardFooter />
      </>
   )
}
