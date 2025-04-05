'use client'

import { SupabaseBrowserClient } from '@/lib/supabase/supabase-browser-client'
import { Button } from '@/shared/shadcn/ui/button'
import { ThumbsUp } from 'lucide-react'
import { useState } from 'react'

interface Props {
   like: number
   postId: string
}

interface ReactionCounts {
   like: number
}

type ReactionType = 'like' | null

const supabase = SupabaseBrowserClient()
const updateLikeCount = async (postId: string, reactionType: ReactionType) => {
   const { data, error } = await supabase
      .from('posts')
      .update({
         [reactionType]: supabase.rpc('increment', { x: 1 }),
      })
      .eq('id', postId)
   if (error) {
      return {
         like: 0,
      }
   }
   return data
}

export default function BoardLikeButton({ like, postId }: Props) {
   const [reactionCounts, setReactionCounts] = useState<ReactionCounts>({
      like: like || 0,
   })
   const [currentReaction, setCurrentReaction] = useState<ReactionType>(null)
   const [isLoading, setIsLoading] = useState(false)

   const fetchUpdateReaction = async (reactionType: 'like') => {
      if (isLoading) return
      if (currentReaction === reactionType) {
         setCurrentReaction(null)
         return
      }
      setIsLoading(true)
      try {
         const updatedCount = await updateLikeCount(postId, reactionType)
         setReactionCounts((prevCounts) => ({
            ...prevCounts,
            ...updatedCount,
         }))
         setCurrentReaction(reactionType)
      } catch (error) {
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div className="flex justify-center my-5">
         <Button
            variant="outline"
            size="lg"
            onClick={() => fetchUpdateReaction('like')}
            disabled={isLoading}
            className={`flex flex-col gap-2 h-auto py-2 ${
               currentReaction === 'like' ? 'bg-blue-100' : ''
            }`}
         >
            <span>{reactionCounts.like}</span>
            <ThumbsUp className="h-5 w-5" />
         </Button>
      </div>
   )
}
