'use client'

import { SupabaseBrowserClient } from '@/lib/supabase/supabase-browser-client'
import { Button } from '@/shared/shadcn/ui/button'
import { cn } from '@/shared/utils/cn'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
   postId: string
}

const supabase = SupabaseBrowserClient()

// 게시물의 좋아요 수를 가져오는 함수
const fetchPostLikes = async (postId: string): Promise<number> => {
   const { data, error } = await supabase
      .from('posts')
      .select('likes')
      .eq('id', postId)
      .single()

   if (error || !data) {
      console.error('좋아요 정보를 가져오는 중 오류 발생:', error)
      return 0
   }

   return data.likes || 0
}

export default function BoardLikeButton({ postId }: Props) {
   const [hasLiked, setHasLiked] = useState(false)
   const queryClient = useQueryClient()

   // 좋아요 데이터 조회 쿼리
   const { data: reactionCounts = { likes: 0 } } = useQuery({
      queryKey: ['postLikes', postId],
      queryFn: () => fetchPostLikes(postId).then((likes) => ({ likes })),
   })

   // 사용자의 좋아요 상태 조회
   useEffect(() => {
      const storageKey = `post_like_${postId}`
      const likedState = localStorage.getItem(storageKey) === 'true'
      setHasLiked(likedState)
   }, [postId])

   // 좋아요 토글 뮤테이션
   const { mutate: toggleLike, isPending: isLoading } = useMutation({
      mutationFn: async () => {
         const storageKey = `post_like_${postId}`

         if (hasLiked) {
            await supabase.rpc('decrement_like_count', { post_id: postId })
            localStorage.removeItem(storageKey)
         } else {
            await supabase.rpc('increment_like_count', { post_id: postId })
            localStorage.setItem(storageKey, 'true')
         }
      },
      onSuccess: () => {
         setHasLiked(!hasLiked)
         queryClient.invalidateQueries({ queryKey: ['postLikes', postId] })
      },
   })

   return (
      <div className="flex justify-center my-5">
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
               variant="outline"
               size="lg"
               onClick={() => toggleLike()}
               disabled={isLoading}
               className={cn(
                  'flex justify-between items-center h-auto py-2 transition-all duration-300',
                  'hover:shadow-lg hover:shadow-pink-100/50',
                  'border-gray-200 hover:border-pink-300',
                  'hover:bg-pink-50/50',
                  hasLiked &&
                     'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-300 text-pink-600',
               )}
            >
               <AnimatePresence mode="wait">
                  <motion.div
                     key={hasLiked ? 'liked' : 'unliked'}
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                     transition={{ duration: 0.2 }}
                  >
                     <Heart
                        fill={hasLiked ? 'pink-500' : 'black'}
                        stroke={hasLiked ? 'pink' : 'currentColor'}
                        strokeWidth={hasLiked ? 2 : 0}
                        absoluteStrokeWidth
                        className={cn(
                           'h-5 w-5 transition-colors duration-300',
                           hasLiked && 'fill-pink-500',
                        )}
                     />
                  </motion.div>
               </AnimatePresence>
               <motion.span
                  key={reactionCounts.likes}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn('font-medium', hasLiked && 'text-pink-600')}
               >
                  {reactionCounts.likes}
               </motion.span>
            </Button>
         </motion.div>
      </div>
   )
}
