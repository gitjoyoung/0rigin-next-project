'use client'

import React, { useState } from 'react'
import BoardModal from './BoardModal'
import BasicButton from '@/components/common/buttons/BasicButton'
import { Button } from '@/shared/shadcn/ui/button'

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
            <Button variant="outline" size="sm" onClick={handleEdit}>
               수정
            </Button>
            <Button variant="outline" size="sm" onClick={handleDelete}>
               삭제
            </Button>
         </div>
      </>
   )
}
