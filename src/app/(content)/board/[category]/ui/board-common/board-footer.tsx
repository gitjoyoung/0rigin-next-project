import { ROUTE_BOARD } from '@/constants/pathname'
import type { Category } from '@/entities/category'
import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'

const FOOTER_DATA = {
   list: '목록',
   create: '글쓰기',
}

interface Props {
   category: Partial<Category> | null
}

export default function BoardFooter({ category }: Props) {
   if (!category) {
      return null
   }
   const { slug } = category
   const listHref = `${ROUTE_BOARD}/${slug}`
   const createHref = `${ROUTE_BOARD}/${slug}/create`

   return (
      <div className="flex justify-between items-center font-mono">
         <Link href={listHref}>
            <Button
               variant="secondary"
               className="p-4 flex items-center"
               size="default"
            >
               <p>{FOOTER_DATA.list}</p>
            </Button>
         </Link>
         {category.can_write && (
            <Link href={createHref}>
               <Button
                  variant="default"
                  className="p-4 flex items-center"
                  size="default"
               >
                  <p>{FOOTER_DATA.create}</p>
               </Button>
            </Link>
         )}
      </div>
   )
}
