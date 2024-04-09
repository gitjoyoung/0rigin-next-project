import React from 'react'
import {
   faComments,
   faEye,
   faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { TickerCounts } from '@/types/tickerTypes'
import StatCard from './StatCart'

interface Props {
   counts: TickerCounts
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
