import {
   fetchLatestPostId,
   fetchPosts,
   fetchTopPosts,
} from '@/service/board/post/fetchPostApi'
import { updateIncrementCount } from '@/service/board/tickerApi'

export async function GET(request: Request) {
   await updateIncrementCount('visit')
   const lastPostId = await fetchLatestPostId()
   const topData = await fetchTopPosts()
   const fetchedPosts = await fetchPosts('1', lastPostId, 20)
   return Response.json({ topData, fetchedPosts })
}
