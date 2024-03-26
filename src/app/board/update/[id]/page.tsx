import { fetchPostById } from '@/app/api/board/post/fetchPostApi'
import BoardCreateTitle from '@/components/Board/Create/BoardCreateTitle'
import BoardEditForm from '@/components/Board/Create/BoardEditForm'
import { CreatePostData } from '@/types/boardTypes'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 게시물 수정',
}

export default async function Update({ params }: { params: { id: string } }) {
   const postId: string = params.id
   const editData: CreatePostData = await fetchPostById(postId)

   return (
      <>
         <BoardCreateTitle title="수정하기" />
         <BoardEditForm editData={editData} postId={postId} />
      </>
   )
}
