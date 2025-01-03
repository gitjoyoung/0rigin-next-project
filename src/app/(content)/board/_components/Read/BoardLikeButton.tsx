'use client'

import React, { useState } from 'react'
import { updateReactionCount } from '@/service/board/likeApi'
import BasicButton from '@/components/common/buttons/BasicButton'
import { Icons } from '@/shared/ui/icons'

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
      <div className="flex justify-center gap-6 mt-5 mb-5">
         <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2 items-center">
               <Icons.heart />
               <p> {reactionCounts.dislike}</p>
            </div>
            <BasicButton
               text="싫어요"
               type="button"
               onClick={() => fetchUpdateReaction('dislike')}
            />
         </div>
         <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2 items-center">
               <Icons.heart />
               <p>{reactionCounts.like}</p>
            </div>

            <BasicButton
               text="좋아요"
               type="button"
               onClick={() => fetchUpdateReaction('like')}
            />
         </div>
      </div>
   )
}
