'use client'

import { fetchComments } from '@/service/board/commentApi'
import type { CommentData } from '@/types/commentTypes'
import { useEffect, useState } from 'react'
import CommentForm from './comment-form'
import CommentHeader from './comment-header'
import CommentItem from './comment-item'

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
         <CommentHeader commentCount={comments.length} />

         {/* 댓글 리스트 */}
         {comments.map((data) => (
            <CommentItem
               key={data.id}
               commentData={data}
               isEditing={editingCommentId === data.id}
               setIsEditing={setEditingCommentId}
            />
         ))}

         {/* 댓글 작성 폼 */}
         <CommentForm postId={postId} />
      </div>
   )
}
