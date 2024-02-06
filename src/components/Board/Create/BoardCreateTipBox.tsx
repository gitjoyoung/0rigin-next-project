'use client'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function BoardCreateTipBox() {
   const [isExpanded, setIsExpanded] = useState(false)

   const toggleList = () => {
      setIsExpanded(!isExpanded)
   }

   const tipContent = [
      '주제에 집중하면 글이 더욱 명확해집니다.',
      '간결하고 명확한 문장 사용은 가독성을 향상시킵니다.',
      '핵심 정보를 먼저 요약하여 전달해주세요.',
      '목차를 사용하면 긴 글의 구조가 명확해집니다.',
   ]

   return (
      <div className="h-full md:block hidden min-w-[250px] border  bg-green-100 w-full text-sm p-2">
         <div
            className="flex items-center  gap-2 text-xl "
            onClick={toggleList}
            aria-hidden="true"
         >
            <FontAwesomeIcon icon={isExpanded ? faAngleDown : faAngleRight} />
            <h1>TIP : 글쓰기 가이드</h1>
         </div>
         {isExpanded && (
            <ul className="flex flex-col gap-1 font-semibold">
               {tipContent.map((tip, index) => (
                  <li key={index}>{`${index + 1}. ${tip}`}</li>
               ))}
            </ul>
         )}
      </div>
   )
}
