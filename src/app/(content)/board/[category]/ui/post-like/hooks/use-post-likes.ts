'use client'

import { useQuery } from '@tanstack/react-query'

// 클라이언트에서 사용할 좋아요 수 조회 함수
async function getPostLikeCountApi(postId: string): Promise<number> {
   const response = await fetch(`/api/post/${postId}/likes?type=count`)
   if (!response.ok) {
      throw new Error('좋아요 수를 불러올 수 없습니다.')
   }
   const data = await response.json()
   return data.count
}

// 클라이언트에서 사용할 좋아요한 사용자 목록 조회 함수
async function getPostLikeUsersApi(postId: string): Promise<any[]> {
   const response = await fetch(`/api/post/${postId}/likes?type=users`)
   if (!response.ok) {
      throw new Error('좋아요한 사용자 목록을 불러올 수 없습니다.')
   }
   const data = await response.json()
   return data.users
}

export function usePostLikes(postId: string) {
   const { data: likesCount = 0 } = useQuery({
      queryKey: ['postLikes', postId],
      queryFn: () => getPostLikeCountApi(postId),
   })

   const { data: likedUsers = [] } = useQuery({
      queryKey: ['likedUsers', postId],
      queryFn: () => getPostLikeUsersApi(postId),
   })

   return {
      likesCount,
      likedUsers,
   }
}
