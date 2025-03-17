'use client'

import React, { useState } from 'react'
import { updateReactionCount } from '@/service/board/likeApi'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/shared/shadcn/ui/button'

interface Props {
   like: number
   dislike: number
   postId: string
}

interface ReactionCounts {
   like: number
   dislike: number
}

export default function BoardLikeButton({ like, dislike, postId }: Props) {
   const [reactionCounts, setReactionCounts] = useState<ReactionCounts>({
      like: like || 0,
      dislike: dislike || 0,
   })

   const fetchUpdateReaction = async (reactionType: 'like' | 'dislike') => {
      const updatedCount = await updateReactionCount(postId, reactionType)
      setReactionCounts((prevCounts) => ({
         ...prevCounts,
         ...updatedCount,
      }))
   }

   return (
      <div className="flex justify-center gap-6 my-5">
         <Button
            variant="outline"
            size="lg"
            onClick={() => fetchUpdateReaction('dislike')}
            className="flex flex-col gap-2 h-auto py-2"
         >
            <span>{reactionCounts.dislike}</span>
            <ThumbsDown className="h-5 w-5" />
         </Button>

         <Button
            variant="outline"
            size="lg"
            onClick={() => fetchUpdateReaction('like')}
            className="flex flex-col gap-2 h-auto py-2 "
         >
            <span>{reactionCounts.like}</span>
            <ThumbsUp className="h-5 w-5" />
         </Button>
      </div>
   )
}
