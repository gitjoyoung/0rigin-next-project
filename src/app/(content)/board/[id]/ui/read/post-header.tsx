import { Separator } from '@/shared/shadcn/ui/separator'
import formatDate from '@/shared/utils/validators/board/format-date'
import { formatNumberWithUnit } from '@/shared/utils/validators/board/formatNumberWithUnit'
import type { IPost } from '../../../types/post-type'
import PostUpdateButtons from './post-update-buttons'

const POST_HEADER_DATA = {
   like: '추천',
   date: '작성시간',
   views: '조회',
}
export default function PostHeader(post: Partial<IPost>) {
   const { title, author, likes = 0, created_at, views = 0, id } = post
   const authorName = author?.name || '익명'
   return (
      <div className="border-b  grid gap-2 pt-2 pb-2 ">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl">{title}</h1>
         </div>
         <div className="flex justify-between items-center flex-wrap">
            <ul className="flex gap-2 text-xs h-5 items-center">
               <li className="font-bold max-w-[90px] flex items-center ">
                  <p>{authorName}</p>
               </li>
               <li>
                  <Separator orientation="vertical" />
               </li>
               <li className="flex gap-1">
                  <p>{POST_HEADER_DATA.like}</p>
                  <p>{formatNumberWithUnit(likes)}</p>
               </li>
               <li>
                  <Separator orientation="vertical" />
               </li>
               <li className="flex gap-1">
                  <p>{POST_HEADER_DATA.views}</p>
                  <p>{formatNumberWithUnit(views)}</p>
               </li>
               <li>
                  <Separator orientation="vertical" />
               </li>
               <li className="flex gap-1">
                  <p>{POST_HEADER_DATA.date}</p>
                  <p>{formatDate(created_at)}</p>
               </li>
            </ul>
            <PostUpdateButtons postId={id} />
         </div>
      </div>
   )
}
