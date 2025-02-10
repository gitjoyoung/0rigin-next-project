import { ROUTE_BOARD, ROUTE_BOARD_CREATE } from '@/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'

export default function BoardHeader({ title }) {
   return (
      <article className="my-4 flex justify-between items-center border-b border-slate-200 pb-4">
         <div className="space-y-1">
            <Link href={ROUTE_BOARD}>
               <h1 className="text-2xl font-bold tracking-tight hover:text-slate-700 transition-colors">
                  {title}
               </h1>
            </Link>
            <p className="text-sm text-muted-foreground">
               재미있는 게시글을 작성해 보세요
            </p>
         </div>
         <Link href={ROUTE_BOARD_CREATE}>
            <Button variant="secondary" className="p-4" size="default">
               글쓰기
            </Button>
         </Link>
      </article>
   )
}
