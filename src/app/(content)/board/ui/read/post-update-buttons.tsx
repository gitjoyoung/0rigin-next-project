'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { useState } from 'react'

interface Props {
   postId: string
}

export default function PostUpdateButtons({ postId }: Props) {
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
         {isModalOpen && <div>모달</div>}
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
