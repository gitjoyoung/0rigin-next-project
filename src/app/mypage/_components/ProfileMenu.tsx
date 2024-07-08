import React from 'react'
import { v4 as uuid4 } from 'uuid'

export default function ProfileMenu() {
   const menu = ['내가 작성한 글', '회원정보 수정', '비밀번호 변경', '회원탈퇴']
   const handleProfileMenu = () => {
      console.log('profile menu')
   }

   return (
      <article className="flex flex-col my-2 gap-1">
         {menu.map((item) => (
            <button
               className=""
               type="button"
               key={uuid4()}
               onClick={handleProfileMenu}
            >
               {item}
            </button>
         ))}
      </article>
   )
}
