'use client'

import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'

export default function MobileAlramButton() {
   const audioRef = useRef<HTMLAudioElement | null>(null)
   useEffect(() => {
      // 컴포넌트가 마운트된 후 Audio 인스턴스 생성
      audioRef.current = new Audio('/sound/click.mp3')
   }, [])
   const [ping, setPing] = useState(false)

   const handleClick = () => {
      audioRef.current?.play()
      setPing((prev) => !prev)
   }

   return (
      <button
         className=" relative border-none outline-none shadow-none "
         type="button"
         aria-label="알림 버튼"
         onClick={handleClick}
      >
         {ping && (
            <span className="absolute right-0 top-0.5 flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
               <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
         )}

         <FontAwesomeIcon icon={faBell} size="lg" />
      </button>
   )
}
