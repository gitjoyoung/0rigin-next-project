import CustomTitle from '@/components/common/links/CustomTitleLink'
import { ROUTES } from '@/constants/route'
import { Metadata } from 'next'
import BoardEditForm from '../../ui/Create/BoardEditForm'

interface IParams {
   params: {
      id: string
   }
}

export const metadata: Metadata = {
   title: '0rigin 게시물 수정',
   description: '게시물 수정하기.',
}

export default async function Update({ params }: IParams) {
   const postId: string = params.id

   return (
      <>
         <CustomTitle title="글 수정하기" link={ROUTES.BOARD} />
         <BoardEditForm postId={postId} />
      </>
   )
}
