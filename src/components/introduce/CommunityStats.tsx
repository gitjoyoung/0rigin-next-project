import React from 'react'
import {
   faComments,
   faEye,
   faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TickerCounts } from '@/types/tickerTypes'

interface Props {
   counts: TickerCounts
}

function StatCard({ icon, title, count }) {
   return (
      <div className="border rounded-md border-white shadow-lg">
         <div className="p-4 sm:p-6 flex-col  flex-wrap  items-center text-xs sm:text-sm  justify-center">
            <FontAwesomeIcon icon={icon} />
            <div className="flex flex-col ">
               <p>{title}</p>
               <p className="text-lg">{count}</p>
            </div>
         </div>
      </div>
   )
}
export default function CommunityStats({ counts }: Props) {
   const stats = [
      {
         id: 'posts_and_comments',
         title: '게시글',
         count: counts?.post,
         icon: faComments,
      },
      {
         id: 'members',
         title: '회원수',
         count: counts?.user,
         icon: faUserFriends,
      },
      {
         id: 'daily_visitors',
         title: '일일 방문',
         count: counts?.visit,
         icon: faEye,
      },
   ]
   return (
      <div className="grid grid-cols-3 gap-3 m-2 text-sm">
         {stats.map(({ id, title, count, icon }) => (
            <StatCard key={id} icon={icon} title={title} count={count} />
         ))}
      </div>
   )
}
