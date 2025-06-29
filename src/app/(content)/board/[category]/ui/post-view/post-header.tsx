import type { Post } from '@/entities/post'
import { Separator } from '@/shared/shadcn/ui/separator'
import formatDate from '@/shared/utils/validators/board/format-date'
import { formatNumberWithUnit } from '@/shared/utils/validators/board/formatNumberWithUnit'
import PostUpdateButtons from './post-update-buttons'

const POST_HEADER_DATA = {
   like: '추천',
   date: '작성시간',
   views: '조회',
}

interface Props {
   post: Partial<Post>
}

export default function PostHeader({ post }: Props) {
   const {
      title,
      nickname,
      likes_count = 0,
      created_at,
      view_count = 0,
      id,
      category,
   } = post
   return (
      <div className="border-b grid px-1">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl">{title}</h1>
         </div>
         <div className="flex justify-between items-center flex-wrap">
            <ul className="flex gap-2 text-xs h-5 items-center text-gray-700 dark:text-gray-400 min-w-0">
               <li className="flex items-center gap-1 min-w-0 flex-shrink">
                  <p className="flex-shrink-0">닉네임</p>
                  <p className="font-bold truncate max-w-[80px]">
                     {nickname || '익명'}
                  </p>
               </li>
               <li className="flex-shrink-0">
                  <Separator orientation="vertical" />
               </li>
               <li className="flex gap-1 min-w-0 flex-shrink">
                  <p className="flex-shrink-0">{POST_HEADER_DATA.like}</p>
                  <p className="truncate">
                     {formatNumberWithUnit(likes_count)}
                  </p>
               </li>
               <li className="flex-shrink-0">
                  <Separator orientation="vertical" />
               </li>
               <li className="flex gap-1 min-w-0 flex-shrink">
                  <p className="flex-shrink-0">{POST_HEADER_DATA.views}</p>
                  <p className="truncate">{formatNumberWithUnit(view_count)}</p>
               </li>
               <li className="flex-shrink-0">
                  <Separator orientation="vertical" />
               </li>
               <li className="flex gap-1 min-w-0 flex-shrink">
                  <p className="flex-shrink-0">{POST_HEADER_DATA.date}</p>
                  <p className="truncate">{formatDate(created_at)}</p>
               </li>
            </ul>
            <PostUpdateButtons postId={id.toString()} category={category} />
         </div>
      </div>
   )
}
