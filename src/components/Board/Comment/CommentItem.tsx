import { deleteComment } from '@/service/board/commentApi'
import { CommentData } from '@/types/commentTypes'
import React from 'react'

interface Props {
   commentData: CommentData
}

export default function CommentItem({ commentData }: Props) {
   const { id, postId, nickname, comment, createdAt } = commentData
   return (
      <div className="flex flex-col px-2 border last:border-b-0 text-sm min-h-9 hover:bg-gray-100">
         <div className="flex justify-between items-center   ">
            <p className=" whitespace-nowrap text-left truncate mr-2 font-semibold">
               {nickname}
            </p>
            <div className="flex gap-2 items-center">
               <button
                  type="button"
                  className="p-1"
                  onClick={() => deleteComment(postId, id)}
               >
                  삭제
               </button>
            </div>
         </div>
         <div className=" py-1">
            <p className="break-words break-all min-w-60 whitespace-pre-wrap">
               {comment}
            </p>
            <div className="flex justify-end">
               <p className="w-15 text-xs text-gray-400  break-words">
                  {createdAt}
               </p>
            </div>
         </div>
      </div>
   )
}
