import { Badge } from '@/shared/shadcn/ui/badge'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { ThumbsUp } from 'lucide-react'
import Link from 'next/link'

interface Props {
   postData: any[]
   selectedPost: number
}

export default function BannerList({ postData, selectedPost }: Props) {
   return (
      <Card className="w-full p-0 rounded-none">
         <CardHeader className="p-2 pb-1">
            <CardTitle className="text-base">베스트 게시글 TOP 5</CardTitle>
         </CardHeader>
         <CardContent className="p-2 pt-0">
            <div className="space-y-1">
               {postData.map(({ title, id, like }, index) => (
                  <Link
                     key={`post-${id}`}
                     className={`flex justify-between p-1.5 text-sm rounded-md hover:bg-muted transition-colors
                     ${
                        selectedPost === index
                           ? 'bg-muted dark:bg-muted font-medium'
                           : ''
                     }`}
                     href={`/board/${id}`}
                  >
                     <h2 className="line-clamp-1 flex-1 max-w-prose">
                        {title}
                     </h2>
                     <Badge
                        variant="outline"
                        className="ml-2 flex items-center space-x-1"
                     >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{like || 0}</span>
                     </Badge>
                  </Link>
               ))}
            </div>
         </CardContent>
      </Card>
   )
}
