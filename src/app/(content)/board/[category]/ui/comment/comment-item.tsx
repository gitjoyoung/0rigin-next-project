'use client'

import type { Comment } from '@/entities/comment'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/shadcn/ui/avatar'
import { Button } from '@/shared/shadcn/ui/button'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { cn } from '@/shared/utils/cn'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Edit3, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Props {
   commentData: Comment
   isEditing: boolean
   setIsEditing: (id: number | null) => void
   refetch: () => void
   isSelected?: boolean
   onSelect?: () => void
}

// 클라이언트에서 사용할 댓글 수정 함수
async function updateCommentApi(id: number, content: string) {
   const response = await fetch(`/api/comment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
   })
   if (!response.ok) {
      throw new Error('댓글 수정에 실패했습니다.')
   }
   return response.json()
}

// 클라이언트에서 사용할 댓글 삭제 함수
async function deleteCommentApi(id: number) {
   const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
   })
   if (!response.ok) {
      throw new Error('댓글 삭제에 실패했습니다.')
   }
   return response.json()
}

export default function CommentItem({
   commentData,
   isEditing,
   setIsEditing,
   refetch,
   isSelected = false,
   onSelect,
}: Props) {
   const [editContent, setEditContent] = useState(commentData.content)

   const updateMutation = useMutation({
      mutationFn: ({ id, content }: { id: number; content: string }) =>
         updateCommentApi(id, content),
      onSuccess: () => {
         setIsEditing(null)
         refetch()
      },
   })

   const deleteMutation = useMutation({
      mutationFn: deleteCommentApi,
      onSuccess: () => {
         refetch()
      },
   })

   const handleUpdate = () => {
      updateMutation.mutate({
         id: commentData.id,
         content: editContent,
      })
   }

   const handleDelete = () => {
      if (confirm('댓글을 삭제하시겠습니까?')) {
         deleteMutation.mutate(commentData.id)
      }
   }

   const avatarUrl = `/images/mascot/logo.webp`

   return (
      <div
         className={cn(
            'group relative p-3 rounded-md transition-all duration-200 hover:bg-muted/30 cursor-pointer',
            isSelected && 'shadow-[0_0_0_2px_hsl(var(--primary))]',
         )}
         onClick={onSelect}
      >
         <div className="flex gap-2">
            {/* 아바타 */}
            <div className="flex-shrink-0">
               <Avatar className="w-8 h-8">
                  <AvatarImage
                     src={avatarUrl}
                     alt={`${commentData.nickname || 'anonymous'} 아바타`}
                  />
                  <AvatarFallback>
                     {commentData.nickname || '익명'}
                  </AvatarFallback>
               </Avatar>
            </div>

            {/* 댓글 내용 */}
            <div className="flex-1 min-w-0">
               {/* 헤더 */}
               <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                     <span className="text-sm font-medium text-foreground">
                        {commentData.nickname || '익명'}
                     </span>

                     <span className="text-xs text-muted-foreground">
                        {dayjs(commentData.created_at).format('YYYY-MM-DD')}
                     </span>
                  </div>

                  {/* 수정/삭제 버튼 (선택되었을 때만 표시) */}
                  {isSelected && (
                     <div className="flex gap-1">
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={(e) => {
                              e.stopPropagation()
                              setIsEditing(isEditing ? null : commentData.id)
                           }}
                           className="h-6 px-2 text-xs"
                        >
                           <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={(e) => {
                              e.stopPropagation()
                              handleDelete()
                           }}
                           disabled={deleteMutation.isPending}
                           className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                        >
                           <Trash2 className="w-3 h-3" />
                        </Button>
                     </div>
                  )}
               </div>

               {/* 댓글 내용 */}
               {isEditing ? (
                  <div
                     className="space-y-2"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[80px] resize-none text-sm"
                        placeholder="댓글을 입력하세요..."
                     />
                     <div className="flex gap-2">
                        <Button
                           onClick={handleUpdate}
                           disabled={
                              updateMutation.isPending || !editContent.trim()
                           }
                           size="sm"
                           className="h-7 text-xs"
                        >
                           {updateMutation.isPending ? '수정 중...' : '완료'}
                        </Button>
                        <Button
                           variant="outline"
                           onClick={() => {
                              setIsEditing(null)
                              setEditContent(commentData.content)
                           }}
                           size="sm"
                           className="h-7 text-xs"
                        >
                           취소
                        </Button>
                     </div>
                  </div>
               ) : (
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                     {commentData.content}
                  </p>
               )}
            </div>
         </div>
      </div>
   )
}
