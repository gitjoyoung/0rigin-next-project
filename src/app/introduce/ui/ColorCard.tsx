import React from 'react'

interface Props {
   tag: string
   bgColor: string
   color: string
}
export default function ColorCard({ tag, bgColor, color }: Props) {
   return (
      <div className="w-28 border border-black rounded-md overflow-hidden">
         <div className={`w-full ${bgColor} h-16`} />
         <div className="flex flex-col bg-white">
            <p className="w-full font-bold text-sm">{tag}</p>
            <p className="w-full text-sm">{color}</p>
         </div>
      </div>
   )
}
