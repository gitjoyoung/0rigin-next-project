'use client'

import type { Post } from '@/entities/post/types'
import { useQuery } from '@tanstack/react-query'

interface UseUserPostsResponse {
   posts: Post[]
}

export function useUserPosts() {
   return useQuery<UseUserPostsResponse>({
      queryKey: ['user', 'posts'],
      queryFn: async () => {
         const response = await fetch('/api/user/posts')

         if (!response.ok) {
            if (response.status === 401) {
               throw new Error('로그인이 필요합니다.')
            }
            throw new Error('게시글을 가져올 수 없습니다.')
         }

         return response.json()
      },
      staleTime: 2 * 60 * 1000, // 2분
      gcTime: 5 * 60 * 1000, // 5분
   })
}
