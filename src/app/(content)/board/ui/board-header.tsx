import { ROUTE_BOARD, ROUTE_BOARD_CREATE } from '@/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'

const HEADER_DATA = {
   title: '철학 게시판',
   description: '자유로운 생각을 나누어 보세요!',
   create: '글쓰기',
}

export default function BoardHeader() {
   return (
      <article className="my-4 flex justify-between items-center border-b border-slate-200 pb-4">
         <div className="space-y-1">
            <Link href={ROUTE_BOARD}>
               <h1 className="text-2xl font-bold tracking-tight hover:text-slate-700 transition-colors">
                  {HEADER_DATA.title}
               </h1>
            </Link>
            <p className="text-sm text-muted-foreground">
               {HEADER_DATA.description}
            </p>
         </div>
         <Link href={ROUTE_BOARD_CREATE}>
            <Button variant="default" className="p-4" size="default">
               {HEADER_DATA.create}
            </Button>
         </Link>
      </article>
   )
}
