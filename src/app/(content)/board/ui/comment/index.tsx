'use client'

import { SupabaseBrowserClient } from '@/lib/supabase/supabase-browser-client'
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

export default function CommentList({ postId }: Props) {
   const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
      null,
   )
   const { data: commentsData = [] } = useQuery<IComment[]>({
      queryKey: ['comments', postId],
      queryFn: () => fetchComments(postId),
   })

   const today = new Date()
   const textData: IComment[] = [
      {
         id: 1,
         post_id: Number(postId),
         parent_id: 0,
         created_at: today.toISOString(),
         updated_at: today.toISOString(),
         content: '첫 번째 댓글입니다.',
         author_id: 'user1',
         guest_name: '게스트1',
         password: '1234',
         likes: 0,
         is_approved: true,
         is_edited: false,
         depth: 0,
      },
      {
         id: 2,
         post_id: Number(postId),
         parent_id: 1,
         created_at: today.toISOString(),
         updated_at: today.toISOString(),
         content: '첫 번째 댓글의 답글입니다.',
         author_id: 'user2',
         guest_name: '게스트2',
         password: '1234',
         likes: 0,
         is_approved: true,
         is_edited: false,
         depth: 1,
      },
   ]
   return (
      <div className="my-2">
         {/* 댓글 헤더 */}
         <CommentHeader commentCount={commentsData.length} />

         {/* 댓글 리스트 */}
         <div className="flex flex-col gap-2">
            {textData.map((data) => (
               <CommentItem
                  key={data.id}
                  commentData={data}
                  isEditing={selectedCommentId === data.id.toString()}
                  setIsEditing={setSelectedCommentId}
               />
            ))}
         </div>

         {/* 댓글 작성 폼 */}
         <CommentForm postId={postId} />
      </div>
   )
}
