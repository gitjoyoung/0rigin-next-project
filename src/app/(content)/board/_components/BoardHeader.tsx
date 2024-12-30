import { ROUTES } from '@/constants/route'
import BoardMainButton from './Content/BoardMainButton'
import Link from 'next/link'

export default function BoardHeader({ title }) {
   return (
      <article
         className="my-2 flex justify-between 
items-center  px-1 border-b py-2 border-black"
      >
         <div className="flex-col flex gap-1">
            <Link href={ROUTES.BOARD} className="text-3xl font-bold">
               {title}
            </Link>
            <p className="text-sm">{'재미있는 게시글을 작성해 보세요'}</p>
         </div>
         <BoardMainButton route={ROUTES.BOARD_CREATE} title="글쓰기" />
      </article>
   )
}
