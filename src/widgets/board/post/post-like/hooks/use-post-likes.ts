'use client'

import { useAuthState } from '@/app/providers/auth-client-provider'
import { useAnonSession } from '@/shared/hooks/use-anon-session'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type PostLikeData = {
   count: number
   hasLiked?: boolean
}

// API 함수 분리
const fetchPostLikeData = async (postId: string): Promise<PostLikeData> => {
   const res = await fetch(`/api/post/${postId}/like`, {
      method: 'GET',
      credentials: 'include',
   })
   if (!res.ok) {
      throw new Error('좋아요 정보를 불러올 수 없습니다.')
   }
   const { count } = await res.json()
   return { count, hasLiked: true }
}

const togglePostLike = async (
   postId: string,
   anonKey: string,
   isAuthenticated: boolean,
): Promise<PostLikeData> => {
   const body = JSON.stringify({
      anonKey,
      isAuthenticated,
   })

   const res = await fetch(`/api/post/${postId}/like`, {
      method: 'POST',
      body,
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include', // 쿠키 포함
   })

   if (!res.ok) {
      const errorText = await res.text()
      console.error('Server error response:', errorText)
      throw new Error('좋아요 처리에 실패했습니다.')
   }
   return res.json()
}

type UsePostLikesResult = {
   likesCount: number
   isLoading: boolean
   isPending: boolean
   toggleLike: () => void
   hasLiked: boolean
}

export function usePostLikes(postId: string): UsePostLikesResult {
   const { user } = useAuthState()
   const { anonKey } = useAnonSession()
   const queryClient = useQueryClient()
   const userId = user?.id
   const isAuthenticated = !!userId
   const userKey = userId || anonKey

   const { data, isLoading } = useQuery<PostLikeData>({
      queryKey: ['postLikeData', postId],
      queryFn: () => fetchPostLikeData(postId),
   })

   const { mutate, isPending } = useMutation({
      mutationFn: () => togglePostLike(postId, userKey, isAuthenticated),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['postLikeData', postId] })
      },
   })

   const toggleLike = () => {
      if (!isPending && userKey) mutate()
   }

   return {
      likesCount: data?.count ?? 0,
      hasLiked: data?.hasLiked ?? false,
      isLoading,
      isPending,
      toggleLike,
   }
}
