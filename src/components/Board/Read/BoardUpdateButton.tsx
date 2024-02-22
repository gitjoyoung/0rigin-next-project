import React from 'react'

export default function BoardUpdateButton({ handleEdit, handleDelete }) {
   return (
      <div className="flex justify-end gap-3 my-2 ">
         <button className="px-3 py-1" type="button" onClick={handleEdit}>
            수정
         </button>
         <button className="px-3 py-1" type="button" onClick={handleDelete}>
            삭제
         </button>
      </div>
   )
}
