'use client'

import React from 'react'
import { CommentData } from '@/types/commentTypes'
import BoardCommentForm from './BoardCommentForm'
import BoardCommentHeader from './BoardCommentHeader'
import BoardCommentItem from './BoardCommentItem'

interface Props {
   postId: string
   commentData: CommentData[]
}

// Use the commentData object in your code

export default function BoardComment({ postId, commentData }: Props) {
   return (
      <div className=" my-2">
         {/* 댓글 헤더 */}
         <BoardCommentHeader commentListData={commentData} />

         {/* 댓글 리스트 */}
         {commentData &&
            commentData.map((data: CommentData) => (
               <BoardCommentItem
                  key={data.id + data.createdAt}
                  commentData={data}
               />
            ))}

         {/* 댓글 작성 폼 */}
         <BoardCommentForm postId={postId} />
      </div>
   )
}
