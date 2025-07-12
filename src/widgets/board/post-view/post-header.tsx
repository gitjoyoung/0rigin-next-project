import type { Post } from '@/entities/post'
import { Separator } from '@/shared/shadcn/ui/separator'
import ClientDayHydration from '@/shared/ui/hydrated-date'
import { formatNumberCompact } from '@/shared/utils/format-number'
import PostActionButtons from '../post-action-button/post-action-buttons'

export default function PostHeader({
   title,
   nickname,
   likes_count,
   created_at,
   view_count,
   id,
   category,
}: Partial<Post>) {
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
                  <p className="flex-shrink-0">추천</p>
                  <p className="truncate">{formatNumberCompact(likes_count)}</p>
               </li>
               <li className="flex-shrink-0">
                  <Separator orientation="vertical" />
               </li>
               <li className="flex gap-1 min-w-0 flex-shrink">
                  <p className="flex-shrink-0">조회</p>
                  <p className="truncate">{formatNumberCompact(view_count)}</p>
               </li>
               <li className="flex-shrink-0">
                  <Separator orientation="vertical" />
               </li>
               <li className="flex gap-1 min-w-0 flex-shrink">
                  <p className="flex-shrink-0">작성시간</p>
                  <p className="truncate">
                     <ClientDayHydration date={created_at} />
                  </p>
               </li>
            </ul>
            <PostActionButtons postId={id?.toString()} category={category} />
         </div>
      </div>
   )
}
