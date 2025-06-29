'use client'

import { useUser } from '@/shared/hooks/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// 좋아요 상태 및 수 조회 API (통합)
async function getPostLikeDataApi(
   postId: string,
): Promise<{ isLiked: boolean; count: number }> {
   const response = await fetch(`/api/post/${postId}/like`)
   if (!response.ok) {
      throw new Error('좋아요 정보를 불러올 수 없습니다.')
   }
   const data = await response.json()
   return { isLiked: data.isLiked, count: data.count }
}

// 좋아요 토글 API
async function togglePostLikeApi(postId: string) {
   const response = await fetch(`/api/post/${postId}/like`, {
      method: 'POST',
   })
   if (!response.ok) {
      throw new Error('좋아요 처리에 실패했습니다.')
   }
   return response.json()
}

export function usePostLikes(postId: string) {
   const { data: userData } = useUser()
   const queryClient = useQueryClient()

   const user = userData?.user
   const userId = user?.id

   // 좋아요 상태 및 수 조회 (통합)
   const { data: likeData, isLoading } = useQuery({
      queryKey: ['postLikeData', postId, userId],
      queryFn: () => getPostLikeDataApi(postId),
      enabled: !!userId, // 로그인된 사용자만 실행
      staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
   })

   const likesCount = likeData?.count ?? 0
   const hasLiked = likeData?.isLiked ?? false

   // 좋아요 토글 뮤테이션
   const toggleMutation = useMutation({
      mutationFn: () => togglePostLikeApi(postId),
      onSuccess: (data) => {
         // 좋아요 데이터 업데이트
         queryClient.setQueryData(['postLikeData', postId, userId], {
            isLiked: data.isLiked,
            count: data.count,
         })

         // 관련 쿼리 무효화 (정확한 데이터 동기화)
         queryClient.invalidateQueries({ queryKey: ['postLikeData', postId] })
      },
      onError: (error) => {
         console.error('좋아요 토글 실패:', error)
      },
   })

   const toggleLike = () => {
      if (!toggleMutation.isPending && userId) {
         toggleMutation.mutate()
      }
   }

   return {
      likesCount,
      hasLiked,
      isLoading,
      toggleLike,
      isPending: toggleMutation.isPending,
      error: toggleMutation.error,
   }
}
