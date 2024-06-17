'use client'

import React from 'react'
import { CommentData } from '@/types/commentTypes'
import BoardCommentForm from './CommentForm'
import BoardCommentHeader from './CommentHeader'
import BoardCommentItem from './CommentItem'
import { v4 } from 'uuid'

interface Props {
   postId: string
   commentsData: CommentData[]
}

export default function CommentList({ postId, commentsData }: Props) {
   return (
      <div className=" my-2">
         {/* 댓글 헤더 */}
         <BoardCommentHeader length={commentsData.length} />

         {/* 댓글 리스트 */}
         {commentsData &&
            commentsData.map((data: CommentData) => (
               <BoardCommentItem key={v4()} commentData={data} />
            ))}

         {/* 댓글 작성 폼 */}
         <BoardCommentForm postId={postId} />
      </div>
   )
}
