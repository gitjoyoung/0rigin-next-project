import BoardCreateForm from '@/components/Board/Create/BoardCreateForm'
import CustomTitle from '@/components/common/links/CustomTitleLink'
import { ROUTES } from '@/constants/route'

export default async function Create() {
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
