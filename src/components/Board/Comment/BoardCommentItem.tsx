import React from 'react'

export default function BoardCommentItem({ comment, nickname, timestamp, id }) {
   return (
      <div
         key={id + timestamp}
         className="flex  flex-wrap  border-b last:border-b-0 text-sm min-h-9 hover:bg-gray-100"
      >
         <div className="p-2 border-r">
            <p className="w-20 whitespace-nowrap text-left truncate mr-2">
               {nickname}
            </p>
         </div>
         <div className="flex-1 p-2 sm:flex justify-between">
            <p
               className="break-words break-all min-w-60"
               style={{ whiteSpace: 'pre-wrap' }}
            >
               {comment}
            </p>
            <p className="w-18 text-xs text-gray-400 break-words">
               {timestamp}
            </p>
         </div>
         <div className="text-xs ">
            <button type="button" className="p-2">
               수정
            </button>
            <button type="button" className="p-2">
               삭제
            </button>
         </div>
      </div>
   )
}
