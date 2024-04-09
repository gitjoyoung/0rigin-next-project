import { ROUTES } from '@/constants/route'
import BoardMainButton from './Content/BoardMainButton'
import CustomTitle from '../common/CustomTitle'

export default function BoardHeader({ title }) {
   return (
      <CustomTitle
         title={title}
         subTitle="재미있는 게시글을 작성해 보세요"
         link={ROUTES.BOARD}
      >
         <BoardMainButton route={ROUTES.BOARD_CREATE} title="글쓰기" />
      </CustomTitle>
   )
}
