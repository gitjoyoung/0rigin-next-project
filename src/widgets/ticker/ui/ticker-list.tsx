import type { IStats } from '../model/ticker-types'
import TickerItem from './ticker-item'

interface TickerListProps {
   statsData: Partial<IStats>
}

export default function TickerList({ statsData }: TickerListProps) {
   const { view_count, post_count, new_user_count } = statsData
   const STATS_DATA = [
      {
         ariaLabel: '방문 수',
         label: 'today',
         value: view_count,
      },
      {
         ariaLabel: '게시물 수',
         label: 'post',
         value: post_count,
      },
      {
         ariaLabel: '유저 수',
         label: 'user',
         value: new_user_count,
      },
   ]

   return (
      <div className="flex w-full justify-end items-center">
         {STATS_DATA.map((item) => (
            <TickerItem key={item.label} {...item} />
         ))}
      </div>
   )
}
