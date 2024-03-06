import { fetchPosts } from '@/app/api/board/fetchPostApi'
import BoardContent from '@/components/Board/BoardContent'
import BoardHeader from '@/components/Board/BoardHeader'
import { Fragment, Suspense } from 'react'

export default async function Page({ params }: { params: { slug: string } }) {
   const slug = params?.slug?.[0] ?? '1'
   const page = /^\d+$/.test(slug) ? parseInt(slug, 10) : 1
   console.log('board page', page)
   const postData = await fetchPosts()

   return (
      <>
         <BoardHeader title="왁자지껄" />
         <Suspense fallback={<div>게시물 로딩중</div>}>
            <BoardContent postData={postData} tap="normal" page={page} />
         </Suspense>
      </>
   )
}
