import { ROUTE_BOARD } from '@/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'

const FOOTER_DATA = {
   list: '목록',
   create: '글쓰기',
}

interface Props {
   category: string
}

export default function BoardFooter({ category }: Props) {
   const listHref = `${ROUTE_BOARD}/${category}`
   const createHref = `${ROUTE_BOARD}/${category}/create`

   return (
      <div className="flex justify-between items-center">
         <Link href={listHref}>
            <Button variant="secondary" className="p-4" size="default">
               {FOOTER_DATA.list}
            </Button>
         </Link>
         <Link href={createHref}>
            <Button variant="default" className="p-4" size="default">
               {FOOTER_DATA.create}
            </Button>
         </Link>
      </div>
   )
}
