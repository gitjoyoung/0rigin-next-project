'use client'

import type { Comment } from '@/entities/comment'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/shadcn/ui/avatar'
import { Button } from '@/shared/shadcn/ui/button'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { cn } from '@/shared/utils/cn'
import { formatSmartDate } from '@/shared/utils/dayjs-config'
import { Edit3, Trash2 } from 'lucide-react'
import PasswordConfirmModal from '../../post/post-view/password-conrifm-modal'
import { useCommentItem } from '../hooks/use-comment-item'

interface Props {
   commentData: Comment
   refetch: () => void
   isSelected?: number | null
   onSelect: (id: number) => void
}
const DEFAULT_AVATAR_URL = `/images/mascot/logo.webp`

export default function CommentItem({
   commentData,
   refetch,
   onSelect,
   isSelected,
}: Props) {
   const {
      isEditing,
      setIsEditing,
      editContentRef,
      handleUpdate,
      handleDelete,
      handlePasswordConfirm,
      isUpdating,
      isDeleting,
      showPasswordModal,
      setShowPasswordModal,
      passwordError,
   } = useCommentItem({ commentData, refetch, isSelected })

   return (
      <>
         <div
            className={cn(
               'group relative py-2 px-1  border border-transparent transition-all duration-200 hover:bg-muted/30 cursor-pointer',
            )}
            onClick={() => onSelect(commentData.id)}
         >
            <div className="flex gap-2">
               {/* 아바타 */}
               <div className="flex-shrink-0">
                  <Avatar className="w-8 h-8">
                     <AvatarImage
                        src={DEFAULT_AVATAR_URL}
                        alt={`${commentData.nickname || 'anonymous'} 아바타`}
                     />
                     <AvatarFallback>
                        {commentData.nickname || '익명'}
                     </AvatarFallback>
                  </Avatar>
               </div>

               {/* 댓글 내용 */}
               <div className="flex-1 min-w-0 relative">
                  {/* 헤더 */}
                  <div className="flex items-center justify-between mb-1">
                     <div className="flex gap-2 items-end">
                        <span className="text-sm font-medium text-foreground">
                           {commentData.nickname || '익명'}
                        </span>

                        <span className="text-[10px] flex text-muted-foreground ">
                           {formatSmartDate(commentData.created_at)}
                        </span>
                     </div>

                     {/* 수정/삭제 버튼 (선택되었을 때만 표시) */}
                     {isSelected === commentData.id && (
                        <div className="flex gap-3 px-2 absolute right-0 top-0">
                           <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 setIsEditing(!isEditing)
                              }}
                              className="h-4 w-4 px-2 text-xs"
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
                              disabled={isDeleting}
                              className="h-4 w-4 px-2 text-xs"
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
                           ref={editContentRef}
                           className="min-h-[80px] resize-none text-sm"
                           placeholder="댓글을 입력하세요..."
                        />
                        <div className="flex gap-2">
                           <Button
                              onClick={handleUpdate}
                              disabled={isUpdating}
                              size="sm"
                              className="h-7 text-xs"
                           >
                              {isUpdating ? '수정 중...' : '완료'}
                           </Button>
                           <Button
                              variant="outline"
                              onClick={() => {
                                 setIsEditing(false)
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

         {/* 비밀번호 확인 다이얼로그 */}
         <PasswordConfirmModal
            open={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
            onConfirm={handlePasswordConfirm}
            loading={isUpdating || isDeleting}
            error={passwordError || ''}
            title={isEditing ? '댓글 수정' : '댓글 삭제'}
         />
      </>
   )
}
