import { fetchComments } from '@/app/api/board/commentApi'
import {
   fetchLatestPostId,
   fetchPostById,
   fetchPosts,
} from '@/app/api/board/post/fetchPostApi'
import BoardContent from '@/components/Board/BoardContent'
import BoardFooter from '@/components/Board/BoardFooter'
import BoardHeader from '@/components/Board/BoardHeader'
import BoardComment from '@/components/Board/Comment/BoardCommentsList'
import Pagination from '@/components/Board/Pagination'
import BoardRead from '@/components/Board/Read/BoardRead'
import { validatePostQuery } from '@/utils/slugValidators/validatePostQuery'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 게시판',
   description: '게시판 읽기.',
}

interface Params {
   params: {
      id: string
   }
   searchParams: {
      page: string
   }
}

export default async function Page({ params, searchParams }: Params) {
   const { id } = params
   const { page } = searchParams

   const validPage = await validatePostQuery.safeParse(page)
   const pageNum = validPage.success ? Number(page) : 1

   const validPost = await validatePostQuery.safeParse(id)
   const postId = validPost.success ? id : '1'

   const readData = await fetchPostById(postId)
   const commentData = await fetchComments(postId)

   const lastPostId = await fetchLatestPostId()
   const fetchedPosts = await fetchPosts(pageNum, lastPostId, 20)

   return (
      <>
         <BoardHeader title="왁자지껄 게시판" />
         <BoardRead postId={postId} readData={readData} />
         <BoardComment postId={postId} commentData={commentData} />
         <BoardContent postData={fetchedPosts} />
         <Pagination lastPostId={lastPostId} pageNum={postId} />
         <BoardFooter />
      </>
   )
}
