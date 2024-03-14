'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { updateReactionCount } from '@/app/api/board/likeApi'

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
      like,
      dislike,
   })

   const fetchUpdateReaction = async (reactionType: 'like' | 'dislike') => {
      const updatedCount = await updateReactionCount(postId, reactionType)
      console.log('updatedCount', updatedCount)
      setReactionCounts((prevCounts) => ({
         ...prevCounts,
         ...updatedCount,
      }))
   }
   return (
      <div className="flex justify-center gap-6 mt-5 mb-5">
         <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2 items-center">
               <FontAwesomeIcon icon={faThumbsUp} rotation={180} />
               <p> {reactionCounts.dislike}</p>
            </div>
            <button
               className="p-1"
               type="button"
               onClick={() => fetchUpdateReaction('dislike')}
            >
               싫어요
            </button>
         </div>
         <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2 items-center">
               <FontAwesomeIcon icon={faThumbsUp} />
               <p>{reactionCounts.like}</p>
            </div>

            <button
               className="p-1"
               type="button"
               onClick={() => fetchUpdateReaction('like')}
            >
               좋아요
            </button>
         </div>
      </div>
   )
}
