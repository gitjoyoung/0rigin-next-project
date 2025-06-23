'use client'

import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { Separator } from '@/shared/shadcn/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type { IComment } from '../../types/comment-type'
import CommentForm from './comment-form'
import CommentHeader from './comment-header'
import CommentItem from './comment-item'

interface Props {
   postId: string
}
const supabase = SupabaseBrowserClient()
const fetchComments = async (postId: string) => {
   const { data: commentsData } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
   return commentsData
}

export default function Comment({ postId }: Props) {
   const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
      null,
   )
   const { data: commentsData = [], refetch } = useQuery<IComment[]>({
      queryKey: ['comments', postId],
      queryFn: () => fetchComments(postId),
   })

   return (
      <div className="my-2">
         {/* 댓글 헤더 */}
         <CommentHeader commentCount={commentsData.length} />

         {/* 댓글 리스트 */}
         <div className="my-2">
            {commentsData.map((data) => (
               <CommentItem
                  key={data.id}
                  commentData={data}
                  isEditing={selectedCommentId === data.id.toString()}
                  setIsEditing={setSelectedCommentId}
                  refetch={refetch}
               />
            ))}
         </div>

         {/* 댓글 작성 폼 */}
         <Separator className="my-2" />
         <CommentForm postId={postId} refetch={refetch} />
      </div>
   )
}
