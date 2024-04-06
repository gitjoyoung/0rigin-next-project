import { ROUTES } from '@/constants/route'
import BoardMainButton from './Content/BoardMainButton'
import CustomTitle from '../common/CustomTitle'

export default function BoardHeader({ title }) {
   return (
      <CustomTitle
         title="게시글"
         subTitle="재미있는 게시글을 작성해 보세요"
         link={ROUTES.BOARD_WRITE}
      >
         <BoardMainButton route={ROUTES.BOARD_WRITE} title={title} />
      </CustomTitle>
   )
}
