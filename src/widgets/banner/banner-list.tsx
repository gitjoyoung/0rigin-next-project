import { Badge } from '@/shared/shadcn/ui/badge'
import type { Tables } from '@/shared/types'
import { cn } from '@/shared/utils/cn'
import { formatNumberToString } from '@/shared/utils/format-number'
import Link from 'next/link'
import React from 'react'

interface Props {
   postData: Tables<'posts'>[]
   selectedPost: number
}

function BannerList({ postData, selectedPost }: Props) {
   return (
      <div className=" w-full h-full flex flex-col  ">
         {postData.map(({ title, id, category, view_count }, index) => (
            <Link
               key={`post-${id}`}
               className={cn(
                  'flex justify-between p-1.5 text-xs sm:text-sm hover:bg-muted transition-colors border-b last:border-b-0',
                  selectedPost === index && 'bg-muted dark:bg-muted ',
               )}
               href={`/board/${category}/${id}`}
            >
               <div className="flex justify-between items-center gap-1 w-full">
                  <h2 className="line-clamp-1 flex-1 max-w-prose font-medium ">
                     {title}
                  </h2>
                  <Badge variant="outline" className="text-xs font-thin">
                     {formatNumberToString(view_count)}
                  </Badge>
               </div>
            </Link>
         ))}
      </div>
   )
}
export default React.memo(BannerList)
