import { fetchPostById } from '@/app/api/board/post/fetchPostApi'
import BoardContent from '@/components/Board/BoardContent'
import BoardFooter from '@/components/Board/BoardFooter'
import BoardHeader from '@/components/Board/BoardHeader'
import Pagination from '@/components/Board/Pagination'
import BoardRead from '@/components/Board/Read/BoardRead'
import { validateSlug } from '@/utils/slugValidators/slug'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 게시판',
   description: '게시판 읽기.',
}

interface Params {
   params: {
      id: string
   }
}

export default async function Page({ params }: Params) {
   const { id } = params
   const postId = validateSlug(id) ? id : null
   if (!postId) return null

   const readData = await fetchPostById(postId)
   // return <div> 게시글을 불러오는 중입니다... </div>
   return (
      <>
         <BoardHeader title="왁자지껄 게시판" />
         <BoardRead postId={postId} readData={readData} />

         <BoardContent />
         <Pagination />
         <BoardFooter />
      </>
   )
}
