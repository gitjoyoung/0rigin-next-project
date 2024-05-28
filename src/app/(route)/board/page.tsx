import {
   fetchLatestPostId,
   fetchPosts,
} from '@/app/api/board/post/fetchPostApi'
import BoardContent from '@/components/Board/BoardContent'
import BoardFooter from '@/components/Board/BoardFooter'
import BoardHeader from '@/components/Board/BoardHeader'
import BoardSuspense from '@/components/Board/BoardSuspense'
import Pagination from '@/components/Board/Pagination'
import { validatePostQuery } from '@/utils/slugValidators/validatePostQuery'

type Props = {
   searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: Props) {
   const { page } = searchParams
   const validPage = await validatePostQuery.safeParse(Number(page))
   const pageNum = validPage.success ? Number(page) : 1

   const lastPostId = await fetchLatestPostId()
   const postData = await fetchPosts(pageNum, lastPostId, 20)
   console.log(page, pageNum, lastPostId)
   return (
      <BoardSuspense>
         <BoardHeader title="왁자지껄 게시판" />
         <BoardContent postData={postData} />
         <Pagination lastPostId={lastPostId} pageNum={pageNum} />
         <BoardFooter />
      </BoardSuspense>
   )
}
