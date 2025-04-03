'use client'

import { createClient } from '@/lib/supabase/client'
import type { CommentData } from '@/types/commentTypes'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import CommentForm from './comment-form'
import CommentHeader from './comment-header'
import CommentItem from './comment-item'

interface Props {
   postId: string
}
const supabase = createClient()

const fetchComments = async (postId: string) => {
   const { data: commentsData } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
   return commentsData
}

export default function CommentList({ postId }: Props) {
   const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
      null,
   )
   const { data: commentsData = [] } = useQuery<CommentData[]>({
      queryKey: ['comments', postId],
      queryFn: () => fetchComments(postId),
   })
   return (
      <div className="my-2">
         {/* 댓글 헤더 */}
         <CommentHeader commentCount={commentsData.length} />

         {/* 댓글 리스트 */}
         {commentsData.map((data) => (
            <CommentItem
               key={data.id}
               commentData={data}
               isEditing={selectedCommentId === data.id}
               setIsEditing={setSelectedCommentId}
            />
         ))}

         {/* 댓글 작성 폼 */}
         <CommentForm postId={postId} />
      </div>
   )
}
