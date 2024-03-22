import React, { useState } from 'react'
import BoardModal from './BoardModal'

interface Props {
   postId: string
}

export default function BoardUpdateButton({ postId }: Props) {
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

   return (
      <>
         {isModalOpen && (
            <BoardModal
               postId={postId}
               onClose={() => setIsModalOpen(false)}
               flag={modalMode}
            />
         )}
         <div className="flex justify-end gap-3 my-2 ">
            <button className="px-3 py-1" type="button" onClick={handleEdit}>
               수정
            </button>
            <button className="px-3 py-1" type="button" onClick={handleDelete}>
               삭제
            </button>
         </div>
      </>
   )
}
