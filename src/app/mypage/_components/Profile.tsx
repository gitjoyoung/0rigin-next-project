import Image from 'next/image'
import React from 'react'

interface Props {
   name: string
   email: string
}

export default function Profile({ name, email }: Props) {
   return (
      <article className="flex justify-center items-center ">
         <div className=" flex border rounded-md w-full">
            <Image
               className="rounded-lg"
               src="/mascot/winksaurus.png"
               alt="프로필 이미지"
               width={90}
               height={100}
            />
            <ul className="  flex flex-col gap-0.5 p-0.5">
               <li className="flex-col flex">
                  <p> {name || '닉네임'}</p>
               </li>
               <li className="flex-col flex ">
                  <p className="text-gray-500 text-xs">{email}</p>
               </li>

               <li>
                  <button type="button" onClick={() => console.log('asd')}>
                     로그아웃
                  </button>
               </li>
            </ul>
         </div>
      </article>
   )
}
