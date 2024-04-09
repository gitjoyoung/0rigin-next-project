import { fetchPostById } from '@/app/api/board/post/fetchPostApi'
import BoardEditForm from '@/components/Board/Create/BoardEditForm'
import CustomTitle from '@/components/common/CustomTitle'
import { ROUTES } from '@/constants/route'
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
         <CustomTitle
            title="수정하기"
            subTitle="글을 수정하기"
            link={ROUTES.BOARD_UPDATE}
         />
         <BoardEditForm editData={editData} postId={postId} />
      </>
   )
}
