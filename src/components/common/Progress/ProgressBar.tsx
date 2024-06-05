import React from 'react'

export default function ProgressBar({ progress }) {
   return (
      <div className=" bg-gray-300 w-full ">
         <div
            className="bg-black text-xs font-medium rounded-lg text-blue-100 text-center p-1 leading-none"
            style={{
               width: `${progress}%`,
               transition: `width 99ms ease-in-out`,
            }}
         />
      </div>
   )
}
