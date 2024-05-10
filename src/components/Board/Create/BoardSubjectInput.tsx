import React from 'react'

interface Props {
   name: string
   title?: string
}

export default function BoardSubjectInput({ name, title = null }: Props) {
   return (
      <input
         className="border p-2  text-sm "
         type="text"
         name={name}
         placeholder="제목"
         defaultValue={title || ''}
         required
      />
   )
}
