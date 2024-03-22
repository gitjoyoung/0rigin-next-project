'use client'

import React, { useEffect, useState } from 'react'
import { CommentData } from '@/types/commentTypes'
import { fetchComments } from '@/app/api/board/commentApi'
import BoardCommentForm from './BoardCommentForm'
import BoardCommentItem from './BoardCommentItem'

interface Props {
   postId: string
}

// Use the commentData object in your code

export default function BoardComment({ postId }: Props) {
   const [commentListData, setCommentListData] = useState<CommentData[] | null>(
      null,
   )

   const fetchCommentData = async (id) => {
      const commentData = await fetchComments(id)
      if (commentData) {
         setCommentListData(commentData)
      }
   }
   useEffect(() => {
      fetchCommentData(postId)
   }, [postId])

   return (
      <div className=" my-2">
         {/* 댓글 헤더 */}
         <div className="border-b border-t border-black flex justify-between text-xs  p-1">
            <div className="flex text-gray-700 items-center ">
               <h1>전체 코멘트</h1>
               <span className="text-red-500">
                  {commentListData && commentListData.length}
               </span>
               <span>개</span>
            </div>
            <button
               type="button"
               onClick={() => fetchCommentData(postId)}
               className="text-blue-500"
            >
               새로고침
            </button>
         </div>
         {/* 댓글 리스트 */}
         {commentListData &&
            commentListData.map((commentData: CommentData) => (
               <BoardCommentItem
                  key={commentData.id + commentData.createdAt}
                  commentData={commentData}
               />
            ))}

         {/* 댓글 작성 폼 */}
         <BoardCommentForm postId={postId} onCommentSubmit={fetchCommentData} />
      </div>
   )
}
