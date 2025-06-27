'use client'

import type { Comment } from '@/entities/comment'
import { Separator } from '@/shared/shadcn/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import CommentForm from './comment-form'
import CommentHeader from './comment-header'
import CommentItem from './comment-item'

interface Props {
   postId: string
}

// 클라이언트에서 사용할 댓글 조회 함수
async function fetchComments(postId: string): Promise<Comment[]> {
   const response = await fetch(`/api/comment?postId=${postId}`)
   if (!response.ok) {
      throw new Error('댓글을 불러올 수 없습니다.')
   }
   return response.json()
}

export default function Comment({ postId }: Props) {
   const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
      null,
   )
   const [editingCommentId, setEditingCommentId] = useState<number | null>(null)

   const { data: commentsData = [], refetch } = useQuery<Comment[]>({
      queryKey: ['comments', postId],
      queryFn: () => fetchComments(postId),
   })

   return (
      <div className="my-2">
         {/* 댓글 헤더 */}
         <CommentHeader commentCount={commentsData.length} />

         {/* 댓글 리스트 */}
         <div className="my-2 space-y-1">
            {commentsData.map((data) => (
               <CommentItem
                  key={data.id}
                  commentData={data}
                  isEditing={editingCommentId === data.id}
                  setIsEditing={setEditingCommentId}
                  isSelected={selectedCommentId === data.id}
                  onSelect={() =>
                     setSelectedCommentId(
                        selectedCommentId === data.id ? null : data.id,
                     )
                  }
                  refetch={refetch}
               />
            ))}
         </div>

         {/* 댓글 작성 폼 */}
         <Separator className="my-4" />
         <CommentForm postId={postId} refetch={refetch} />
      </div>
   )
}
