import { fetchPostById } from '@/app/api/board/post/fetchPostApi'
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
   return <BoardRead postId={postId} readData={readData} />
}
