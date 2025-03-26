import { ROUTE_BOARD, ROUTE_BOARD_CREATE } from '@/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'

const FOOTER_DATA = {
   list: '목록',
   create: '글쓰기',
}

export default function BoardFooter() {
   return (
      <div className="my-5 mb-10 flex justify-between items-center">
         <Link href={ROUTE_BOARD}>
            <Button variant="secondary" className="p-4" size="default">
               {FOOTER_DATA.list}
            </Button>
         </Link>
         <Link href={ROUTE_BOARD_CREATE}>
            <Button variant="secondary" className="p-4" size="default">
               {FOOTER_DATA.create}
            </Button>
         </Link>
      </div>
   )
}
