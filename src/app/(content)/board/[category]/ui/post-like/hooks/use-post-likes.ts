'use client'

import { useUser } from '@/shared/hooks/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

// 좋아요 수 조회 API
async function getPostLikeCountApi(postId: string): Promise<number> {
   const response = await fetch(`/api/post/${postId}/like/count`)
   if (!response.ok) {
      throw new Error('좋아요 수를 불러올 수 없습니다.')
   }
   const data = await response.json()
   return data.count
}

// 좋아요 상태 확인 API
async function checkPostLikeApi(
   postId: string,
   userId?: string,
   anonKey?: string,
): Promise<boolean> {
   const headers: Record<string, string> = {}
   if (userId) headers['x-user-id'] = userId
   if (anonKey) headers['x-anon-key'] = anonKey

   const response = await fetch(`/api/post/${postId}/like`, { headers })
   if (!response.ok) {
      throw new Error('좋아요 상태를 확인할 수 없습니다.')
   }
   const data = await response.json()
   return data.isLiked
}

// 좋아요 토글 API
async function togglePostLikeApi(
   postId: string,
   userId?: string,
   anonKey?: string,
) {
   const headers: Record<string, string> = {}
   if (userId) headers['x-user-id'] = userId
   if (anonKey) headers['x-anon-key'] = anonKey

   const response = await fetch(`/api/post/${postId}/like`, {
      method: 'POST',
      headers,
   })
   if (!response.ok) {
      throw new Error('좋아요 처리에 실패했습니다.')
   }
   return response.json()
}

// 익명 사용자 키 생성
function generateAnonKey(): string {
   return crypto.randomUUID()
}

export function usePostLikes(postId: string) {
   const { data: userData } = useUser()
   const [anonKey, setAnonKey] = useState<string>()
   const queryClient = useQueryClient()

   const user = userData?.user
   const userId = user?.id

   // 비회원용 익명 키 설정
   useEffect(() => {
      if (!userId) {
         const stored = localStorage.getItem(`anon-key-${postId}`)
         if (stored) {
            setAnonKey(stored)
         } else {
            const newKey = generateAnonKey()
            setAnonKey(newKey)
            localStorage.setItem(`anon-key-${postId}`, newKey)
         }
      }
   }, [userId, postId])

   // 좋아요 수 조회
   const { data: likesCount = 0, isLoading: isCountLoading } = useQuery({
      queryKey: ['postLikes', postId],
      queryFn: () => getPostLikeCountApi(postId),
      staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
   })

   // 좋아요 상태 확인
   const { data: hasLiked = false, isLoading: isLikeStatusLoading } = useQuery({
      queryKey: ['postLikeStatus', postId, userId, anonKey],
      queryFn: () => checkPostLikeApi(postId, userId, anonKey),
      enabled: !!(userId || anonKey), // 사용자 정보나 익명 키가 있을 때만 실행
      staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
   })

   // 좋아요 토글 뮤테이션
   const toggleMutation = useMutation({
      mutationFn: () => togglePostLikeApi(postId, userId, anonKey),
      onSuccess: (data) => {
         // 좋아요 상태 업데이트
         queryClient.setQueryData(
            ['postLikeStatus', postId, userId, anonKey],
            data.isLiked,
         )

         // 좋아요 수 업데이트 (optimistic update)
         queryClient.setQueryData(
            ['postLikes', postId],
            (oldCount: number = 0) => {
               return data.isLiked ? oldCount + 1 : Math.max(0, oldCount - 1)
            },
         )

         // 관련 쿼리 무효화 (정확한 데이터 동기화)
         queryClient.invalidateQueries({ queryKey: ['postLikes', postId] })
      },
      onError: (error) => {
         console.error('좋아요 토글 실패:', error)
      },
   })

   const toggleLike = () => {
      if (!toggleMutation.isPending && (userId || anonKey)) {
         toggleMutation.mutate()
      }
   }

   return {
      likesCount,
      hasLiked,
      isLoading: isCountLoading || isLikeStatusLoading,
      toggleLike,
      isPending: toggleMutation.isPending,
      error: toggleMutation.error,
   }
}
