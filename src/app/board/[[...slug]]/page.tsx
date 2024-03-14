import { fetchLatestPostId, fetchPosts } from '@/app/api/board/fetchPostApi'
import BoardContent from '@/components/Board/BoardContent'
import BoardHeader from '@/components/Board/BoardHeader'
import Pagination from '@/components/Board/Pagination'
import BoardRead from '@/components/Board/Read/BoardRead'

interface Params {
   params: {
      slug: string[]
   } // Assuming PostType is your post object type
}

function validateSlug(value: string): boolean {
   return /^\d+$/.test(value)
}
export default async function Page({ params }: Params) {
   // 슬러그 처리
   const [pageSlug, postSlug] = params.slug ?? ['1']
   const page: number = validateSlug(pageSlug) ? parseInt(pageSlug, 10) : 1
   const postId = validateSlug(postSlug) ? postSlug : null

   // 게시물 목록 가져오기 ssr 처리
   const lastpostId = await fetchLatestPostId()
   const posts = await fetchPosts(page, lastpostId)

   return (
      <>
         <BoardHeader title="왁자지껄" />
         {postId && <BoardRead postId={postId} page={page} />}

         <BoardContent postData={posts} page={page} />
         <Pagination page={page} lastpostId={lastpostId} />
      </>
   )
}
