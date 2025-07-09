'use client'

import type { Comment } from '@/entities/comment'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

// 클라이언트에서 사용할 댓글 조회 함수
async function fetchComments(postId: string): Promise<Comment[]> {
   const response = await fetch(`/api/comment?postId=${postId}`)
   if (!response.ok) {
      throw new Error('댓글을 불러올 수 없습니다.')
   }
   return response.json()
}

interface UseCommentsProps {
   postId: string
}

export function useComments({ postId }: UseCommentsProps) {
   const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
      null,
   )
   const [editingCommentId, setEditingCommentId] = useState<number | null>(null)

   const { data: commentsData = [], refetch } = useQuery<Comment[]>({
      queryKey: ['comments', postId],
      queryFn: () => fetchComments(postId),
   })

   // 댓글 선택 핸들러
   const handleCommentSelect = (commentId: number) => {
      setSelectedCommentId(selectedCommentId === commentId ? null : commentId)
   }

   // 댓글 편집 모드 설정
   const setEditingComment = (commentId: number | null) => {
      setEditingCommentId(commentId)
   }

   return {
      commentsData,
      selectedCommentId,
      editingCommentId,
      refetch,
      handleCommentSelect,
      setEditingComment,
   }
}
