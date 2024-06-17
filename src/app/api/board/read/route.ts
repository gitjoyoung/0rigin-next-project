import { fetchComments } from '@/service/board/commentApi'
import {
   fetchLatestPostId,
   fetchPostById,
   fetchPosts,
} from '@/service/board/post/fetchPostApi'

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url)
   const id = searchParams.get('id')
   if (!id) {
      return new Response('Invalid request parameters', { status: 400 })
   }
   const readData = await fetchPostById(id)
   const commentsData = await fetchComments(id)
   const lastPostId = await fetchLatestPostId()

   const page = searchParams.get('page') || '1'
   const fetchedPosts = await fetchPosts(page, lastPostId, 20)

   return Response.json({ fetchedPosts, readData, commentsData, lastPostId })
}
