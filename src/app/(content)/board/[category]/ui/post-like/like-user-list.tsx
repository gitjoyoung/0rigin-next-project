'use client'
import { Button } from '@/shared/shadcn/ui/button'
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/shared/shadcn/ui/tooltip'
import { Users } from 'lucide-react'
import { usePostLikes } from './hooks/use-post-likes'

interface Props {
   postId: string
}

export default function LikeUserList({ postId }: Props) {
   const { likesCount } = usePostLikes(postId)

   if (likesCount === 0) return null

   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground"
                  disabled
               >
                  <Users className="h-4 w-4 mr-1" />
                  {likesCount}명이 좋아요를 눌렀습니다
               </Button>
            </TooltipTrigger>
            <TooltipContent>
               <p>좋아요 {likesCount}개</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   )
}
