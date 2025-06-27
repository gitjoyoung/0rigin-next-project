import type { Post } from '@/entities/post/types'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import Link from 'next/link'
import React from 'react'

interface Props {
   postData: Post[]
   selectedPost: number
}

function BannerList({ postData, selectedPost }: Props) {
   return (
      <Card className="w-full h-full flex flex-col p-1 rounded-none">
         <CardHeader className="p-2 ">
            <CardTitle className="text-base flex items-center gap-1">
               👍 베스트 게시글
            </CardTitle>
         </CardHeader>
         <CardContent className="p-2 ">
            <div className="space-y-1">
               {postData.map(({ title, id, category }, index) => (
                  <Link
                     key={`post-${id}`}
                     className={`flex justify-between p-1.5 text-sm rounded-md hover:bg-muted transition-colors
                     ${
                        selectedPost === index
                           ? 'bg-muted dark:bg-muted font-medium'
                           : ''
                     }`}
                     href={`/board/${category}/${id}`}
                  >
                     <h2 className="line-clamp-1 flex-1 max-w-prose">
                        {title}
                     </h2>
                  </Link>
               ))}
            </div>
         </CardContent>
      </Card>
   )
}
export default React.memo(BannerList)
