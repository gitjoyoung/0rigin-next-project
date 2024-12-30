import {
   fetchLatestPostId,
   fetchPosts,
   fetchTopPosts,
} from '@/service/board/post/fetchPostApi'

import { updateIncrementCount } from '@/service/board/tickerApi'

export async function GET() {
   await updateIncrementCount('visit')
   const lastPostId = await fetchLatestPostId()
   const topData = await fetchTopPosts()
   const fetchedPosts = await fetchPosts('1', lastPostId, 20)
   return new Response(JSON.stringify({ topData, fetchedPosts }), {
      headers: { 'Content-Type': 'application/json' },
   })
}
