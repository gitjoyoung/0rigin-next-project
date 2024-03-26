import BoardHeader from '@/components/Board/BoardHeader'
import BoardRead from '@/components/Board/Read/BoardRead'
import { validateSlug } from '@/utils/slugValidators/slug'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 게시판',
}

interface Params {
   params: {
      slug: string[]
   } // Assuming PostType is your post object type
}

export default async function Page({ params }: Params) {
   // 슬러그 처리
   const postSlug = params.slug?.[1]
   const postId = validateSlug(postSlug) ? postSlug : null
   // 게시물 목록 가져오기
   if (postId) {
      return <BoardRead postId={postId} />
   }
   return null
}
