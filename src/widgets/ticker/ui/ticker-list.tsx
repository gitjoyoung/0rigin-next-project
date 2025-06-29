import type { DailyStats } from '@/entities/stats'
import TickerItem from './ticker-item'

interface TickerListProps {
   statsData?: Partial<DailyStats>
}

export default function TickerList({ statsData }: TickerListProps) {
   // statsData가 없을 경우 빈 객체 할당
   const { visitor_count = 0, post_count = 0, user_count = 0 } = statsData || {}

   const STATS_DATA = [
      {
         ariaLabel: '방문 수',
         label: 'today',
         value: visitor_count,
      },
      {
         ariaLabel: '게시물 수',
         label: 'post',
         value: post_count,
      },
      {
         ariaLabel: '유저 수',
         label: 'user',
         value: user_count,
      },
   ]

   return (
      <div className="flex w-full items-center">
         {STATS_DATA.map((item) => (
            <TickerItem key={item.label} {...item} />
         ))}
      </div>
   )
}
