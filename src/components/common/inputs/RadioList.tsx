import React from 'react'
import { v4 } from 'uuid'

interface IGenderList {
   id: string
   name: string
   value: string
}
interface Props {
   arr: IGenderList[]
}
/**
 * RadioList
 * @param arr - radio list
 * @returns RadioList
 **/
export default function RadioList({ arr }: Props) {
   if (!arr) return null
   return (
      <div className="flex gap-2 justify-between  ">
         {arr.map(({ id, name, value }) => (
            <label
               key={v4()}
               className="text-sm font-bold flex items-center border py-2 px-3 rounded-md cursor-pointer hover:bg-gray-100"
               htmlFor={id}
            >
               <input
                  type="radio"
                  className="m-1 w-4 h-4"
                  name={name}
                  value={value}
                  id={id}
               />
               {value}
            </label>
         ))}
      </div>
   )
}
