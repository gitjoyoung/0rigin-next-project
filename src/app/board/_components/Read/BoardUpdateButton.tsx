import React, { useState } from 'react'
import BoardModal from './BoardModal'
import BasicButton from '@/components/common/buttons/BasicButton'

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
            <BasicButton text="수정" type="button" onClick={handleEdit} />
            <BasicButton text="삭제" type="button" onClick={handleDelete} />
         </div>
      </>
   )
}
