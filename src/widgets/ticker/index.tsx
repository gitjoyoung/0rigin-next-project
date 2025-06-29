'use client'

import type { DailyStats } from '@/entities/stats'
import { cn } from '@/shared/utils/cn'
import { useQuery } from '@tanstack/react-query'
import TickerList from './ui/ticker-list'

export default function Ticker() {
   const { data: statsData, isLoading } = useQuery<Partial<DailyStats> | null>({
      queryKey: ['tickerStats'],
      queryFn: () => fetch('/api/stats').then((res) => res.json()),
      refetchInterval: 5 * 60 * 1000, // 5분마다 자동 갱신
   })

   return (
      <aside
         className={cn(
            'relative  bg-black text-white text-xs w-full h-[16px]',
            isLoading && 'animate-pulse',
         )}
      >
         <div className=" absolute right-0 flex items-center">
            <TickerList statsData={statsData} />
         </div>
      </aside>
   )
}
