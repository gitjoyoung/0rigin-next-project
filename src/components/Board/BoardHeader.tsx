import Link from 'next/link'
import { ROUTES } from '@/constants/route'
import BoardMainButton from './BoardMainButton'

export default function BoardHeader({ title }) {
   return (
      <div
         className="my-2 flex  justify-between relative
      items-center  px-1 border-b py-2 border-black"
      >
         <div className="flex-col flex gap-1">
            <Link href="/board" className="text-3xl font-bold">
               {title} 게시판
            </Link>
            <p className="text-sm">재미있는 게시글을 작성해 보세요</p>
         </div>
         <BoardMainButton route={ROUTES.BOARD_WRITE} title="글쓰기" />
      </div>
   )
}
