'use client'

import type { IStats } from '@/widgets/ticker/model/ticker-types'
import { useQuery } from '@tanstack/react-query'
import { getDailyStats } from './api/get-daily-stats'
import TickerList from './ui/ticker-list'
import TickerLoader from './ui/ticker-loader'

export default function Ticker() {
   const { data: statsData, isLoading } = useQuery<Partial<IStats>>({
      queryKey: ['tickerStats'],
      queryFn: getDailyStats,
      refetchInterval: 5 * 60 * 1000, // 5분마다 자동 갱신
   })

   return (
      <aside className="relative bg-black text-white text-xs w-full h-[12px] ">
         {isLoading ? <TickerLoader /> : <TickerList statsData={statsData} />}
      </aside>
   )
}
