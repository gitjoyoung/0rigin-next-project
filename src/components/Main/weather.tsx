import Image from 'next/image'
import React from 'react'
import pepe from '@/assets/sadpepe.jpg' // 이미지 예시

export default function weather() {
   return (
      <div className="flex gap-3 flex-wrap">
         <Image src={pepe} alt="개구리" width={100} height={100} />
         <div className="border  bg-black   h-30 w-5  " />
         <div>
            <p>오늘의 날씨</p>
            <p>기온 10도</p>
            <p>비가 오네요</p>
            <p>외투는 입어야 합니다</p>
         </div>
      </div>
   )
}
