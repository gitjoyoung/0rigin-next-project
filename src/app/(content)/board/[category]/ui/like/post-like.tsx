'use client'

import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import LikeButton from './like-button'
import LikeUserList from './like-user-list'

interface Props {
   postId: string
}

interface RawUserMetaData {
   name?: string
   avatar_url?: string
}

interface LikedUser {
   id: string
   raw_user_meta_data: RawUserMetaData
}

interface PostLike {
   user_id: string | null
   anon_key: string | null
   users?: LikedUser
}

const supabase = SupabaseBrowserClient()

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
            raw_user_meta_data
         )
      `,
      )
      .eq('post_id', postId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

   if (error) {
      console.error('좋아요한 사용자 정보를 가져오는 중 오류 발생:', error)
      return []
   }

   return (data || []).map((like) => ({
      user_id: like.user_id,
      anon_key: like.anon_key,
      users: like.users ? (like.users as unknown as LikedUser) : undefined,
   })) as PostLike[]
}

export default function PostLike({ postId }: Props) {
   return (
      <div className="flex flex-col items-center my-5 space-y-2">
         <LikeButton postId={postId} />
         <LikeUserList postId={postId} />
      </div>
   )
}
