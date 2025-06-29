import type { Post } from '@/entities/post/types'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { formatNumberToString } from '@/shared/utils/format-number'
import Link from 'next/link'
import React from 'react'

interface Props {
   postData: Post[]
   selectedPost: number
}

function BannerList({ postData, selectedPost }: Props) {
   return (
      <Card className="w-full h-full flex flex-col justify-center p-0 rounded-none">
         <CardHeader className="p-2">
            <CardTitle>👍 베스트 게시글</CardTitle>
         </CardHeader>
         <CardContent className="p-2 ">
            <div className="flex flex-col gap-1 border">
               {postData.map(({ title, id, category, view_count }, index) => (
                  <Link
                     key={`post-${id}`}
                     className={`flex justify-between p-1.5 text-sm hover:bg-muted transition-colors border-b last:border-b-0
                     ${
                        selectedPost === index
                           ? 'bg-muted dark:bg-muted font-medium'
                           : ''
                     }`}
                     href={`/board/${category}/${id}`}
                  >
                     <div className="flex justify-between items-center gap-1 w-full">
                        <h2 className="line-clamp-1 flex-1 max-w-prose">
                           {title}
                        </h2>
                        <div className="flex items-center gap-1">
                           <p className="text-xs text-muted-foreground whitespace-nowrap">
                              조회 {formatNumberToString(view_count)}
                           </p>
                        </div>
                     </div>
                  </Link>
               ))}
            </div>
         </CardContent>
      </Card>
   )
}
export default React.memo(BannerList)
