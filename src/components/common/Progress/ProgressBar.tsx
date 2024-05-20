import React from 'react'

export default function ProgressBar({ progress }) {
   return (
      <div className=" bg-gray-300">
         <div
            className="bg-black text-xs font-medium text-blue-100 text-center p-1 leading-none"
            style={{
               width: `${progress}%`,
               transition: `width 99ms ease-in-out`,
            }}
         />
      </div>
   )
}
