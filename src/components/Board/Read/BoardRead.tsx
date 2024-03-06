'use client'

import BoardComment from '@/components/Board/Comment/BoardCommentsList'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import formatCustomDate from '@/utils/boardValidators/formatCustomDate'
import { BoardReadData } from '@/types/boardTypes'
import BoardModal from './BoardModal'
import BoardReadTitle from './BoardReadTitle'
import BoardUpdateButton from './BoardUpdateButton'
import BoardLikeButton from './BoardLikeButton'
import BoardNavButton from './BoardNavButton'
import MarkDownViewer from '../Create/MarkDownViewer'

interface Props {
   readData: BoardReadData
   postId: string
}

export default function BoardRead({
   readData: { title, nickname, like, dislike, content, createdAt },
   postId,
}: Props) {
   const router = useRouter()
   /** 모달 관련 */
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [modalMode, setModalMode] = useState<'edit' | 'delete'>('edit')
   const handleEdit = () => {
      setModalMode('edit')
      setIsModalOpen(true)
   }

   const handleDelete = () => {
      setModalMode('delete')
      setIsModalOpen(true)
   }
   if (title === null) {
      return <div>로딩중...</div>
   }
   // 데이타가 있을때
   const date = formatCustomDate(createdAt)

   return (
      <section className="mt-1 ">
         {/* 모달  */}
         {isModalOpen && (
            <BoardModal
               postId={postId}
               onClose={() => setIsModalOpen(false)}
               flag={modalMode}
            />
         )}

         {/* 글제목 */}
         <BoardReadTitle
            title={title}
            nickname={nickname}
            like={like}
            date={date}
         />
         {/* 글 수정  , 삭제 버튼 */}
         <BoardUpdateButton
            handleDelete={handleDelete}
            handleEdit={handleEdit}
         />
         {/* 글내용 마크다운 뷰어 */}
         <MarkDownViewer content={content} />

         {/* 싫어요,좋아요  버튼 */}
         <BoardLikeButton postId={postId} like={like} dislike={dislike} />

         {/* 댓글 컴포넌트  */}
         <BoardComment postId={postId} />
         <BoardNavButton router={router} postID={postId} />
      </section>
   )
}
