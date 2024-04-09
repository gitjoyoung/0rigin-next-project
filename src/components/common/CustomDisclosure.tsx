import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Props {
   title: string
   tip: string
   color: string
}

export default function CustomDisclosure({ title, tip, color }: Props) {
   return (
      <div className="w-full  ">
         <div className=" w-full  bg-white py-1">
            <Disclosure>
               {({ open }) => (
                  <>
                     <Disclosure.Button
                        className={`flex w-full gap-3  bg-${color}-100 px-4 py-2 text-left 
                     text-sm font-medium text-${color}-900 hover:bg-${color}-200 
                     focus:outline-none focus-visible:ring focus-visible:ring-${color}-500/75`}
                     >
                        <h1>{title}</h1>
                        <ChevronUpIcon
                           className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-${color}-500`}
                        />
                     </Disclosure.Button>
                     <Disclosure.Panel className="px-4 pb-2 pt-4 text-xs text-gray-500 border">
                        <h2 className="flex flex-col gap-3 font-semibold  leading-7 break-words whitespace-pre">
                           {tip}
                        </h2>
                     </Disclosure.Panel>
                  </>
               )}
            </Disclosure>
         </div>
      </div>
   )
}
