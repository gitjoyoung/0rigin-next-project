'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import BoardCommentForm from './BoardCommentForm'

interface BoardCommentProps {
   postid: string // Add the 'postId' property to the interface
}

interface Comment {
   comment: string
   nickname: string
   id: string
   timestamp: Date
}

export default function BoardComment({ postid }: BoardCommentProps) {
   const [commentList, setCommentList] = useState<Comment[]>([])

   const data = (timestamp) => {
      return timestamp
         ? dayjs(timestamp).format('YYYY.MM.DD HH:mm:ss')
         : '날자 없음'
   }
   console.log('postid :', postid)
   const fetchCommentData = async () => {
      try {
         const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}comment?postid=${postid}`,
         )
         console.log(
            `${process.env.NEXT_PUBLIC_API_URL}comment?postid=${postid}`,
         )
         setCommentList(res.data)
         console.log('commentList :', res.data)
      } catch (error) {
         console.log('error', error)
      }
   }
   useEffect(() => {
      console.log('use Effect')
      fetchCommentData()
   }, [])

   return (
      <div className=" my-2">
         <div className="border-b border-t border-black flex justify-between text-xs  p-1">
            <div className="flex text-gray-700 items-center ">
               <h1>전체 코멘트</h1>
               <span className="text-red-500">{commentList.length}</span>
               <span>개</span>
            </div>
            <button
               type="button"
               onClick={fetchCommentData}
               className="text-blue-500"
            >
               새로고침
            </button>
         </div>
         {commentList.length > 0 &&
            commentList.map(({ comment, nickname, timestamp, id }) => (
               <div
                  key={id}
                  className="flex  flex-wrap  border-b last:border-b-0 text-sm"
               >
                  <div className="p-2 border-r">
                     <p className="  w-20 whitespace-nowrap text-left truncate mr-2">
                        {nickname}
                     </p>
                  </div>
                  <div className="flex-1 p-2 sm:flex justify-between">
                     <p className=" break-words break-all min-w-60">
                        {comment}
                     </p>
                     <p className=" w-18 text-xs text-gray-400   break-words ">
                        {data(timestamp)}
                     </p>
                  </div>
               </div>
            ))}
         <BoardCommentForm postid={postid} onCommentSubmit={fetchCommentData} />
      </div>
   )
}
