import type { Comment } from '@/entities/comment'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

// 클라이언트에서 사용할 댓글 수정 함수
async function updateCommentApi(id: number, content: string) {
   const response = await fetch(`/api/comment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
   })
   if (!response.ok) {
      throw new Error('댓글 수정에 실패했습니다.')
   }
   return response.json()
}

// 클라이언트에서 사용할 댓글 삭제 함수
async function deleteCommentApi(id: number) {
   const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
   })
   if (!response.ok) {
      throw new Error('댓글 삭제에 실패했습니다.')
   }
   return response.json()
}

export function useCommentItem({
   commentData,
   refetch,
}: {
   commentData: Comment
   refetch: () => void
}) {
   const [isEditing, setIsEditing] = useState(false)
   const [editContent, setEditContent] = useState(commentData.content)

   const updateMutation = useMutation({
      mutationFn: ({ id, content }: { id: number; content: string }) =>
         updateCommentApi(id, content),
      onSuccess: () => {
         setIsEditing(false)
         refetch()
      },
   })

   const deleteMutation = useMutation({
      mutationFn: deleteCommentApi,
      onSuccess: () => {
         refetch()
      },
   })

   const handleUpdate = () => {
      updateMutation.mutate({
         id: commentData.id,
         content: editContent,
      })
   }

   const handleDelete = () => {
      if (confirm('댓글을 삭제하시겠습니까?')) {
         deleteMutation.mutate(commentData.id)
      }
   }

   return {
      isEditing,
      setIsEditing,
      editContent,
      setEditContent,
      handleUpdate,
      handleDelete,
      updateMutation,
      deleteMutation,
   }
}
