import { ROUTES } from '@/constants/route'
import CustomLink from '@/components/common/links/CustomLink'

export default function BoardFooter() {
   return (
      <div className="my-5 mb-10 flex justify-between items-center">
         <CustomLink href={ROUTES.BOARD}>목록 </CustomLink>
         <CustomLink href={ROUTES.BOARD_CREATE}>글쓰기 </CustomLink>
      </div>
   )
}
