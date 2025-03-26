import { Separator } from '@/shared/shadcn/ui/separator'
import type { Post } from '@/types/boardTypes'
import formatCustomDate from '@/utils/boardValidators/formatCustomDate'
import { formatNumberWithUnit } from '@/utils/boardValidators/formatNumberWithUnit'
import PostUpdateButtons from './PostUpdateButtons'

const POST_HEADER_DATA = {
   like: '추천',
   date: '작성시간',
   views: '조회',
}
export default function PostHeader(post: Partial<Post>) {
   const { title, nickname, like = 0, date, views = 0, postId } = post
   return (
      <div className="border-b  grid gap-2 pt-2 pb-2 ">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl">{title}</h1>
         </div>
         <div className="flex justify-between items-center flex-wrap">
            <ul className="flex gap-2 text-xs h-5 items-center">
               <li className="font-bold max-w-[90px] flex items-center ">
                  <h3>{nickname}</h3>
               </li>
               <Separator orientation="vertical" />
               <li className="flex gap-1">
                  <p>{POST_HEADER_DATA.like}</p>
                  <p>{formatNumberWithUnit(like)}</p>
               </li>
               <Separator orientation="vertical" />
               <li className="flex gap-1">
                  <p>{POST_HEADER_DATA.views}</p>
                  <p>{formatNumberWithUnit(views)}</p>
               </li>
               <Separator orientation="vertical" />
               <li className="flex gap-1">
                  <p>{POST_HEADER_DATA.date}</p>
                  <p>{formatCustomDate(date)}</p>
               </li>
            </ul>
            <PostUpdateButtons postId={postId} />
         </div>
      </div>
   )
}
