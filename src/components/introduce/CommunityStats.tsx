import React from 'react'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CommunityStats() {
   const stats = [
      { id: 'posts_and_comments', title: '게시글 및 댓글', count: '1200명' },
      { id: 'members', title: '회원수', count: '1300명' },
      { id: 'daily_visitors', title: '일일 방문자', count: '1030명' },
   ]

   return (
      <div className="grid grid-cols-3 gap-3 m-2 text-sm">
         {stats.map(({ id, title, count }) => (
            <div key={id} className="border rounded-md border-white shadow-lg">
               <div className="p-4">
                  <FontAwesomeIcon icon={faUsers} />
                  <p>{title}</p>
                  <p className="text-lg">{count}</p>
               </div>
            </div>
         ))}
      </div>
   )
}
