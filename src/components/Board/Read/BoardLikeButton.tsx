'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { increaseDislike, increaseLike } from '@/app/api/board/likeApi'

export default function BoardLikeButton({ like, dislike, postId }) {
   const [likeCount, setLikeCount] = useState<number>(like)
   const [disLikeCount, setDisLikeCount] = useState<number>(dislike)

   const fetchUpdateLike = async () => {
      const count = await increaseLike(postId)
      setLikeCount(count)
   }
   const fetchUpdateDisLike = async () => {
      const count = await increaseDislike(postId)
      setDisLikeCount(count)
   }
   return (
      <div className="flex justify-center gap-6 mt-5 mb-5">
         <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2 items-center">
               <FontAwesomeIcon icon={faThumbsUp} rotation={180} />
               <p> -{disLikeCount || 0}</p>
            </div>
            <button type="button" onClick={fetchUpdateDisLike}>
               싫어요
            </button>
         </div>
         <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2 items-center">
               <FontAwesomeIcon icon={faThumbsUp} />
               <p>{likeCount || 0}</p>
            </div>

            <button type="button" onClick={fetchUpdateLike}>
               좋아요
            </button>
         </div>
      </div>
   )
}
