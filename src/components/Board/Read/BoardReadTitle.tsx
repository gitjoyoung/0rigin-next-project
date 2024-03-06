import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function BoardReadTitle({ title, nickname, like, date }) {
   return (
      <div className="border-b border-gray grid gap-2 py-3 px-1">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl">{title}</h1>

            <button type="button" aria-label="Button Label">
               <FontAwesomeIcon icon={faStar} />
            </button>
         </div>
         <ul className="list-none flex gap-2  text-xs">
            <li className="font-bold">
               닉네임 : <span>{nickname}</span>
            </li>
            <li>
               <span>|</span>
            </li>
            <li className="">
               추천 : <span className="">{like || 0}</span>
            </li>
            <li>
               <span>|</span>
            </li>
            <li className="">
               작성시간 : <span className="">{date}</span>
            </li>
         </ul>
      </div>
   )
}
