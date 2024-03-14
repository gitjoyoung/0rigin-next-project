'use client'

import { Disclosure } from '@headlessui/react'
import React from 'react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { TIP_CONTENT } from '@/constants/board/markDownTip'

export default function BoardEditorHelpBox() {
   return (
      <div className="w-full  ">
         <div className=" w-full  bg-white py-1">
            <Disclosure>
               {({ open }) => (
                  <>
                     <Disclosure.Button className="flex w-full gap-3  bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                        <span>TIP : 마크다운 글쓰기 가이드</span>
                        <ChevronUpIcon
                           className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`}
                        />
                     </Disclosure.Button>
                     <Disclosure.Panel className="px-4 pb-2 pt-4 text-xs text-gray-500 border">
                        <ul className="flex flex-col gap-3 font-semibold">
                           {TIP_CONTENT.map((tip) => (
                              <li key={tip}>{tip}</li>
                           ))}
                        </ul>
                     </Disclosure.Panel>
                  </>
               )}
            </Disclosure>
         </div>
      </div>
   )
}
