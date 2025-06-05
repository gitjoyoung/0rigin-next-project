import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { useQuery } from '@tanstack/react-query'
import { PostLike } from '../types'

const supabase = SupabaseBrowserClient()

interface SupabaseLikeResponse {
   user_id: string | null
   anon_key: string | null
   users: {
      id: string
      nickname: string
   } | null
}

// 게시물의 좋아요 수를 가져오는 함수
const fetchPostLikes = async (postId: string): Promise<number> => {
   const { count, error } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId)
      .is('deleted_at', null)

   if (error) {
      console.error('좋아요 정보를 가져오는 중 오류 발생:', error)
      return 0
   }

   return count || 0
}

// 좋아요한 사용자들의 정보를 가져오는 함수
const fetchLikedUsers = async (postId: string): Promise<PostLike[]> => {
   const { data, error } = await supabase
      .from('post_likes')
      .select(
         `
         user_id,
         anon_key,
         users:user_id (
            id,
            nickname
         )
      `,
      )
      .eq('post_id', postId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

   if (error || !data) {
      return []
   }

   if (data.length === 0) {
      return []
   }

   return (data as unknown as SupabaseLikeResponse[]).map((like) => ({
      user_id: like.user_id,
      anon_key: like.anon_key,
      nickname: like.user_id ? like.users?.nickname || '익명' : '익명',
      users: like.users
         ? {
              id: like.users.id,
              raw_user_meta_data: {
                 name: like.users.nickname,
              },
           }
         : undefined,
   }))
}

export function usePostLikes(postId: string) {
   const { data: reactionCounts = { likes: 0 } } = useQuery({
      queryKey: ['postLikes', postId],
      queryFn: () => fetchPostLikes(postId).then((likes) => ({ likes })),
   })

   const { data: likedUsers = [] } = useQuery({
      queryKey: ['likedUsers', postId],
      queryFn: () => fetchLikedUsers(postId),
   })

   return {
      likesCount: reactionCounts.likes,
      likedUsers,
   }
}
