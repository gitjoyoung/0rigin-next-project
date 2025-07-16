'use client'

import type { Comment } from '@/entities/comment'
import { useQuery } from '@tanstack/react-query'

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
   const { data: commentsData = [], refetch } = useQuery<Comment[]>({
      queryKey: ['comments', postId],
      queryFn: () => fetchComments(postId),
   })

   return {
      commentsData,
      refetch,
   }
}
