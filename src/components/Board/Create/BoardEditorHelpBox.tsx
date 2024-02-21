'use client'

import { Disclosure } from '@headlessui/react'
import React, { useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

export default function BoardEditorHelpBox() {
   const tipContent = [
      '# : 제목을 추가하려면 "#"을 사용하세요.  예: `# 제목 1`, `## 제목 2`',
      '** : 굵은 글씨로 표시하려면 "**" 또는 "__"을 사용하세요. 예: `**굵은 글씨**`',
      '* : 이탤릭체로 표시하려면 "*" 또는 "_"을 사용하세요. 예: `*이탤릭체*`',
      '[]() : 링크를 추가하려면 "[]"와 "()"을 사용하세요. 예: `[Google](https://www.google.com)`',
      '- : 목록을 만들려면 "-" 또는 "*"을 사용하세요. 예: `- 목록 항목 1`',
      '` : 코드를 표시하려면 "`"을 사용하세요. 한 줄 코드 예: `` `코드` ``, 여러 줄 코드는 "```"을 사용하세요.',
      '> : 인용문을 추가하려면 ">"을 사용하세요. 예: `> 인용문`',
      '![]() : 이미지를 추가하려면 "!"와 "[]" 및 "()"을 사용하세요. 예: `![이미지 설명](이미지_URL)`',
   ]

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
                           {tipContent.map((tip) => (
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
