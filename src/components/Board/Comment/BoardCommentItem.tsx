import { DeleteComment } from '@/app/api/board/commentApi'
import { CommentData } from '@/types/commentTypes'
import React from 'react'

export default function BoardCommentItem({
   comment,
   nickname,
   createdAt,
   id,
   postId,
}: CommentData) {
   return (
      <div
         key={`comment-${createdAt}`}
         className="flex  flex-wrap  border-b last:border-b-0 text-sm min-h-9 hover:bg-gray-100"
      >
         <div className="p-1 border-r w-16">
            <p className=" whitespace-nowrap text-left truncate mr-2">
               {nickname}
            </p>
         </div>
         <div className="flex-1 p-1 sm:flex justify-between">
            <p
               className="break-words break-all min-w-60"
               style={{ whiteSpace: 'pre-wrap' }}
            >
               {comment}
            </p>
            <p className="w-15 text-xs text-gray-400 break-words">
               {createdAt}
            </p>
         </div>
         <div className="text-xs items-center flex px-1">
            <button
               type="button"
               className="p-1"
               onClick={() => DeleteComment(postId, id)}
            >
               삭제
            </button>
         </div>
      </div>
   )
}
