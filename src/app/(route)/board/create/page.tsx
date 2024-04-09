import BoardCreateForm from '@/components/Board/Create/BoardCreateForm'
import CustomTitle from '@/components/common/CustomTitle'
import { ROUTES } from '@/constants/route'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 글쓰기',
}
function Create() {
   return (
      <>
         <CustomTitle
            title="글쓰기"
            subTitle="다양한 주제로 글을 작성해보세요"
            link={ROUTES.BOARD_CREATE}
         />
         <BoardCreateForm />
      </>
   )
}

export default Create
