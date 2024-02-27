'use client'

import React, { useEffect, useState } from 'react'
import { getComments } from '@/app/api/board/commentApi'
import BoardCommentForm from './BoardCommentForm'
import BoardCommentItem from './BoardCommentItem'

interface BoardCommentProps {
   postID: string // Add the 'postID' property to the interface
}

export default function BoardComment({ postID }: BoardCommentProps) {
   const [commentList, setCommentList] = useState([])

   const fetchCommentData = async () => {
      const commentData = await getComments(postID)
      if (commentData) {
         setCommentList(commentData)
      }
   }
   useEffect(() => {
      fetchCommentData()
   }, [])

   return (
      <div className=" my-2">
         {/* 댓글 헤더 */}
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
         {/* 댓글 리스트 */}
         {commentList.length > 0 &&
            commentList.map(({ comment, nickname, timestamp, id }) => (
               <BoardCommentItem
                  key={id}
                  comment={comment}
                  nickname={nickname}
                  timestamp={timestamp}
                  id={id}
               />
            ))}

         {/* 댓글 작성 폼 */}
         <BoardCommentForm postID={postID} onCommentSubmit={fetchCommentData} />
      </div>
   )
}
