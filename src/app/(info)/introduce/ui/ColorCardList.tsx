import React from 'react'
import ColorCard from './ColorCard'
import { v4 } from 'uuid'

export default function ColorCardList() {
   const colorList = [
      { bgColor: 'bg-gray-primary', color: '#FF0000', tag: '게이 레드' },
      { bgColor: 'bg-gray-tertiary', color: '#FF0000', tag: '클라우드 그레이' },
      { bgColor: 'bg-blue-500', color: '#0000FF', tag: '블루' },
      { bgColor: 'bg-red-500', color: '#FF0000', tag: '사파이어 블루' },
   ]
   return (
      <article className="flex w-full flex-col gap-2 p-2 bg-white rounded-sm text-black">
         <h1 className="text-left font-bold">Design System</h1>
         <div className="flex flex-wrap gap-2 px-auto">
            {colorList.map((color) => (
               <ColorCard
                  key={v4()}
                  tag={color.tag}
                  bgColor={color.bgColor}
                  color={color.color}
               />
            ))}
         </div>
      </article>
   )
}
