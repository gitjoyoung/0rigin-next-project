'use client'

import BoardComment from '@/components/Board/Comment/BoardCommentsList'
import { useEffect, useState } from 'react'
import { fetchPostById } from '@/app/api/board/fetchPostApi'
import { Post } from '@/types/boardTypes'
import BoardModal from './BoardModal'
import BoardReadTitle from './BoardReadTitle'
import BoardUpdateButton from './BoardUpdateButton'
import BoardLikeButton from './BoardLikeButton'
import BoardNavButton from './BoardNavButton'
import MarkDownViewer from '../Create/MarkDownViewer'

interface Props {
   postId: string
   page: number
}

export default function BoardRead({ postId, page }: Props) {
   const [readData, setReadData] = useState<Post | null>(null)

   useEffect(() => {
      fetchPostById(postId).then((data) => {
         setReadData(data)
      })
   }, [postId])

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
   if (readData === null) {
      return null
   }
   // 데이타가 있을때

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
            title={readData.title}
            nickname={readData.nickname}
            like={readData.like}
            date={readData.createdAt}
         />
         {/* 글 수정  , 삭제 버튼 */}
         <BoardUpdateButton
            handleDelete={handleDelete}
            handleEdit={handleEdit}
         />
         {/* 글내용 마크다운 뷰어 */}
         <MarkDownViewer content={readData.content} />

         {/* 싫어요,좋아요  버튼 */}
         <BoardLikeButton
            postId={postId}
            like={readData.like}
            dislike={readData.dislike}
         />

         {/* 댓글 컴포넌트  */}
         <BoardComment postId={postId} />
         {/* 이전 목록 다음 글 이동 */}
         <BoardNavButton page={page} postID={postId} />
      </section>
   )
}
