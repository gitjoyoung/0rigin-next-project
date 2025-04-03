'use client'

import { updateReactionCount } from '@/service/board/likeApi'
import { Button } from '@/shared/shadcn/ui/button'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useState } from 'react'

interface Props {
   like: number
   dislike: number
   postId: string
}

interface ReactionCounts {
   like: number
   dislike: number
}

type ReactionType = 'like' | 'dislike' | null

export default function BoardLikeButton({ like, dislike, postId }: Props) {
   const [reactionCounts, setReactionCounts] = useState<ReactionCounts>({
      like: like || 0,
      dislike: dislike || 0,
   })
   const [currentReaction, setCurrentReaction] = useState<ReactionType>(null)
   const [isLoading, setIsLoading] = useState(false)

   const fetchUpdateReaction = async (reactionType: 'like' | 'dislike') => {
      if (isLoading) return
      if (currentReaction === reactionType) {
         setCurrentReaction(null)
         return
      }
      setIsLoading(true)
      try {
         const updatedCount = await updateReactionCount(postId, reactionType)
         setReactionCounts((prevCounts) => ({
            ...prevCounts,
            ...updatedCount,
         }))
         setCurrentReaction(reactionType)
      } catch (error) {
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div className="flex justify-center gap-6 my-5">
         <Button
            variant="outline"
            size="lg"
            onClick={() => fetchUpdateReaction('dislike')}
            disabled={isLoading}
            className={`flex flex-col gap-2 h-auto py-2 ${
               currentReaction === 'dislike' ? 'bg-red-100' : ''
            }`}
         >
            <span>{reactionCounts.dislike}</span>
            <ThumbsDown className="h-5 w-5" />
         </Button>

         <Button
            variant="outline"
            size="lg"
            onClick={() => fetchUpdateReaction('like')}
            disabled={isLoading}
            className={`flex flex-col gap-2 h-auto py-2 ${
               currentReaction === 'like' ? 'bg-blue-100' : ''
            }`}
         >
            <span>{reactionCounts.like}</span>
            <ThumbsUp className="h-5 w-5" />
         </Button>
      </div>
   )
}
