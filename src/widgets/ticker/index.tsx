'use client'

import type { IStats } from '@/widgets/ticker/model/ticker-types'
import { useQuery } from '@tanstack/react-query'
import { getDailyStats } from './api/get-daily-stats'
import TickerList from './ui/ticker-list'

export default function Ticker() {
   const { data: statsData, isLoading } = useQuery<Partial<IStats>>({
      queryKey: ['tickerStats'],
      queryFn: getDailyStats,
      refetchInterval: 5 * 60 * 1000, // 5분마다 자동 갱신
   })

   console.log(statsData)
   return (
      <aside className="relative bg-black text-white text-xs w-full h-[16px]">
         <div className=" absolute right-0 flex items-center">
            <TickerList statsData={statsData} />
         </div>
      </aside>
   )
}
