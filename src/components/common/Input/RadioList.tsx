import React from 'react'

type TArr = {
   id: string
   name: string
   value: string
}
interface Props {
   arr: TArr[]
}

export default function RadioList({ arr }: Props) {
   if (!arr) return null
   return (
      <ul className="flex gap-2 ">
         {arr.map(({ id, name, value }) => (
            <li key={id} >
               <label className="text-sm font-bold flex items-center" htmlFor={id}>
                  <input
                     type="radio"
                     className="m-1 w-4 h-4"
                     name={name}
                     value={value}
                     id={id}
                  />
                  {value}
               </label>
            </li>
         ))}
      </ul>
   )
}
