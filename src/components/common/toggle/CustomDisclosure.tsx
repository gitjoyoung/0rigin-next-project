import { ChevronRightIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

interface Props {
   title: string
   text: string
   color?: string
}

export default function CustomDisclosure({ title, text, color }: Props) {
   const [isOpen, setIsOpen] = useState(false)

   const toggle = () => setIsOpen((prev) => !prev)
   return (
      <div className="w-full bg-white py-1">
         <button
            type="button"
            onClick={toggle}
            className={`flex w-full items-center gap-3 bg-${color}-100 px-4 py-2 text-left text-sm font-medium text-${color}-900 hover:bg-${color}-200 focus:outline-none focus-visible:ring focus-visible:ring-${color}-500/75`}
         >
            <h1>{title}</h1>
            <ChevronRightIcon
               className={`${isOpen ? 'rotate-90 transform' : ''} h-5 w-5 text-${color}-500`}
            />
         </button>
         {isOpen && (
            <div className="px-4 pb-2 pt-4 text-xs text-gray-500 border">
               <p className="font-semibold leading-7 break-words whitespace-pre-line">
                  {text}
               </p>
            </div>
         )}
      </div>
   )
}
