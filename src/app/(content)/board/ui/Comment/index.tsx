'use client'

import { fetchComments } from '@/service/board/commentApi'
import type { CommentData } from '@/types/commentTypes'
import { useEffect, useState } from 'react'
import BoardCommentForm from './CommentForm'
import BoardCommentHeader from './CommentHeader'
import BoardCommentItem from './CommentItem'

interface Props {
   postId: string
}

export default function CommentList({ postId }: Props) {
   const [comments, setComments] = useState<CommentData[]>([])
   const [editingCommentId, setEditingCommentId] = useState<string | null>(null)

   const fetchData = async (postId: string) => {
      const commentsData = await fetchComments(postId)
      setComments(commentsData)
   }

   useEffect(() => {
      fetchData(postId)
   }, [postId])

   return (
      <div className="my-2">
         {/* 댓글 헤더 */}
         <BoardCommentHeader commentCount={comments.length} />

         {/* 댓글 리스트 */}
         {comments.map((data) => (
            <BoardCommentItem
               key={data.id}
               commentData={data}
               isEditing={editingCommentId === data.id}
               setIsEditing={setEditingCommentId}
            />
         ))}

         {/* 댓글 작성 폼 */}
         <BoardCommentForm postId={postId} />
      </div>
   )
}
