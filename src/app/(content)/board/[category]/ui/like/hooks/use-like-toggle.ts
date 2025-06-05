import { getUser } from '@/entities/auth/api/get-user'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const supabase = SupabaseBrowserClient()

export function useLikeToggle(postId: string) {
   const [hasLiked, setHasLiked] = useState(false)
   const queryClient = useQueryClient()

   useEffect(() => {
      const checkLikeStatus = async () => {
         const user = await getUser()
         const userId = user?.id

         if (userId) {
            const { data } = await supabase
               .from('post_likes')
               .select('id')
               .eq('post_id', postId)
               .eq('user_id', userId)
               .is('deleted_at', null)
               .single()

            setHasLiked(!!data)
         } else {
            const anonKey = localStorage.getItem('anon_key')
            if (anonKey) {
               const { data } = await supabase
                  .from('post_likes')
                  .select('id')
                  .eq('post_id', postId)
                  .eq('anon_key', anonKey)
                  .is('deleted_at', null)
                  .single()

               setHasLiked(!!data)
            }
         }
      }

      checkLikeStatus()
   }, [postId])

   const { mutate: toggleLike, isPending: isLoading } = useMutation({
      mutationFn: async () => {
         const {
            data: { session },
         } = await supabase.auth.getSession()
         const userId = session?.user?.id

         if (hasLiked) {
            // 좋아요 취소
            if (userId) {
               await supabase
                  .from('post_likes')
                  .update({ deleted_at: new Date().toISOString() })
                  .eq('post_id', postId)
                  .eq('user_id', userId)
                  .is('deleted_at', null)
            } else {
               const anonKey = localStorage.getItem('anon_key')
               if (anonKey) {
                  await supabase
                     .from('post_likes')
                     .update({ deleted_at: new Date().toISOString() })
                     .eq('post_id', postId)
                     .eq('anon_key', anonKey)
                     .is('deleted_at', null)
               }
            }
         } else {
            // 좋아요 추가
            if (userId) {
               await supabase.from('post_likes').insert({
                  post_id: postId,
                  user_id: userId,
               })
            } else {
               let anonKey = localStorage.getItem('anon_key')
               if (!anonKey) {
                  anonKey = crypto.randomUUID()
                  localStorage.setItem('anon_key', anonKey)
               }
               await supabase.from('post_likes').insert({
                  post_id: postId,
                  anon_key: anonKey,
               })
            }
         }
      },
      onSuccess: () => {
         setHasLiked(!hasLiked)
         queryClient.invalidateQueries({ queryKey: ['postLikes', postId] })
         queryClient.invalidateQueries({ queryKey: ['likedUsers', postId] })
      },
   })

   return {
      hasLiked,
      toggleLike,
      isLoading,
   }
}
