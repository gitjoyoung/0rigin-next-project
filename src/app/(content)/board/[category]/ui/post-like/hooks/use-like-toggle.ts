'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

// 클라이언트에서 사용할 좋아요 상태 확인 함수
async function checkPostLikeApi(postId: string): Promise<boolean> {
   const response = await fetch(`/api/post/${postId}/like`)
   if (!response.ok) {
      throw new Error('좋아요 상태를 확인할 수 없습니다.')
   }
   const data = await response.json()
   return data.isLiked
}

// 클라이언트에서 사용할 좋아요 토글 함수
async function togglePostLikeApi(postId: string) {
   const response = await fetch(`/api/post/${postId}/like`, {
      method: 'POST',
   })
   if (!response.ok) {
      throw new Error('좋아요 처리에 실패했습니다.')
   }
   return response.json()
}

export function useLikeToggle(postId: string) {
   const [hasLiked, setHasLiked] = useState(false)
   const [isLoading, setIsLoading] = useState(true)
   const queryClient = useQueryClient()

   // 초기 좋아요 상태 확인
   useEffect(() => {
      const checkInitialLikeStatus = async () => {
         try {
            const isLiked = await checkPostLikeApi(postId)
            setHasLiked(isLiked)
         } catch (error) {
            console.error('좋아요 상태 확인 실패:', error)
         } finally {
            setIsLoading(false)
         }
      }

      checkInitialLikeStatus()
   }, [postId])

   const mutation = useMutation({
      mutationFn: () => togglePostLikeApi(postId),
      onSuccess: (data) => {
         setHasLiked(data.isLiked)
         // 관련 쿼리 무효화
         queryClient.invalidateQueries({ queryKey: ['post-likes', postId] })
      },
      onError: (error) => {
         console.error('좋아요 토글 실패:', error)
      },
   })

   const toggleLike = () => {
      if (!mutation.isPending) {
         mutation.mutate()
      }
   }

   return {
      hasLiked,
      isLoading,
      toggleLike,
      isPending: mutation.isPending,
   }
}
