'use client'

import { useAuthState } from '@/app/providers/auth-client-provider'
import { useAnonSession } from '@/shared/hooks/use-anon-session'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type PostLikeData = {
   isLiked: boolean
   count: number
}

// API 함수 분리
const fetchPostLikeData = async (
   postId: string,
   userId?: string,
   anonKey?: string,
): Promise<PostLikeData> => {
   const params = new URLSearchParams()
   if (userId) params.append('userId', userId)
   if (anonKey) params.append('anonKey', anonKey)
   const res = await fetch(`/api/post/${postId}/like?${params}`)
   if (!res.ok) throw new Error('좋아요 정보를 불러올 수 없습니다.')
   return res.json()
}

const togglePostLike = async (
   postId: string,
   userId?: string,
   anonKey?: string,
): Promise<PostLikeData> => {
   const body = JSON.stringify({ userId, anonKey })
   const res = await fetch(`/api/post/${postId}/like`, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
   })
   if (!res.ok) throw new Error('좋아요 처리에 실패했습니다.')
   return res.json()
}

type UsePostLikesResult = {
   likesCount: number
   hasLiked: boolean
   isLoading: boolean
   isPending: boolean
   error: unknown
   toggleLike: () => void
}

export function usePostLikes(postId: string): UsePostLikesResult {
   const { user } = useAuthState()
   const { anonKey } = useAnonSession()
   const queryClient = useQueryClient()
   const userId = user?.id

   const { data, isLoading, error } = useQuery<PostLikeData>({
      queryKey: ['postLikeData', postId, userId || anonKey],
      queryFn: () => fetchPostLikeData(postId, userId, anonKey),
      staleTime: 1000 * 60 * 5,
      enabled: !!(userId || anonKey),
   })

   const { mutate, isPending } = useMutation({
      mutationFn: () => togglePostLike(postId, userId, anonKey),
      onSuccess: (newData) => {
         queryClient.setQueryData(
            ['postLikeData', postId, userId || anonKey],
            newData,
         )
         queryClient.invalidateQueries({ queryKey: ['postLikeData', postId] })
      },
      onError: (err) => {
         console.error('좋아요 토글 실패:', err)
      },
   })

   const toggleLike = () => {
      if (!isPending && (userId || anonKey)) mutate()
   }

   return {
      likesCount: data?.count ?? 0,
      hasLiked: data?.isLiked ?? false,
      isLoading,
      isPending,
      error,
      toggleLike,
   }
}
