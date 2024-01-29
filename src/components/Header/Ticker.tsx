import React from 'react'

export default function Ticker() {
   return (
      <aside className=" px-2 flex gap-2 justify-between bg-black h-4 w-full text-white text-xs">
         <div className="">
            <p>포인트 현황 1000m</p>
         </div>
         <div className="flex">
            <p>오늘 방문자 100</p>
            <p>게시글 1000+</p>
            <p>회원 수 1000</p>
         </div>
      </aside>
   )
}
