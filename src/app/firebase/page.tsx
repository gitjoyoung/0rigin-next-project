'use client'

import {
   firebaseFetchData,
   firebaseFetchRes,
} from '@/app/api/board/firebaseFetch'

export default function page() {
   const postData = {
      title: 'New Post',
      content: 'This is the content of the new post.',
      author: 'Alan Turing',
      createdAt: new Date(),
   }

   const fetchData = async () => {
      await firebaseFetchData(postData)
   }

   const fetchRes = firebaseFetchRes()

   return (
      <div className="flex flex-col items-center gap-2">
         <p>데이터</p>
         <button type="button" aria-label="알림" onClick={fetchData}>
            데이타 보내기 버튼
         </button>
         <p>데이터</p>

         <button type="button" aria-label="알림" onClick={fetchRes}>
            버튼
         </button>
      </div>
   )
}
