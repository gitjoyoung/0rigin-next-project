import type { IStats } from '../model/ticker-types'
import TickerItem from './ticker-item'

interface TickerListProps {
   statsData: Partial<IStats>
}

export default function TickerList({ statsData }: TickerListProps) {
   return (
      <div className="flex w-full justify-end items-center">
         <TickerItem label="today" value={statsData.view_count} />
         <TickerItem label="post" value={statsData.post_count} />
         <TickerItem label="user" value={statsData.new_user_count} />
      </div>
   )
}
