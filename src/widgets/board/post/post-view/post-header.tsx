import type { Database } from '@/shared/types'
import ClientDayHydration from '@/shared/ui/hydrated-date'
import { formatNumberCompact } from '@/shared/utils/format-number'
import PostActionButtons from '../post-action-button/post-action-buttons'

export default function PostHeader({
   title,
   nickname,
   created_at,
   view_count,
   id,
   category,
}: Partial<Database['public']['Tables']['posts']['Row']>) {
   return (
      <div className="grid gap-2 pb-2 border-b ">
         <h1 className="text-2xl">{title}</h1>
         <ul className="flex gap-1 text-xs items-center text-gray-700 dark:text-gray-400 min-w-0 justify-between">
            <li className="flex items-center gap-1 min-w-0 flex-shrink font-bold  max-w-[120px] truncate">
               {nickname || '익명'}
            </li>
            <ClientDayHydration date={created_at || ''} />
         </ul>
         <div className="flex text-xs items-center justify-between text-gray-700 dark:text-gray-400 min-w-0">
            <ul className="flex gap-2 items-center">
               <li className="flex min-w-0 flex-shrink ">
                  추천 {formatNumberCompact(0)}
               </li>
               <li className="flex min-w-0 flex-shrink ">조회 {view_count}</li>
            </ul>
            <PostActionButtons
               postId={id?.toString() || ''}
               category={category || ''}
            />
         </div>
      </div>
   )
}
