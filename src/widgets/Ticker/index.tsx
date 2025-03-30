'use client'

import { useQuery } from '@tanstack/react-query'
import { getCountStats } from './api/getCountStats'
import { TickerCounts } from './model/types'
import TickerList from './ui/TickerList'
import TickerLoader from './ui/TickerLoader'

export default function Ticker() {
   const { data, isLoading } = useQuery<TickerCounts>({
      queryKey: ['tickerStats'],
      queryFn: getCountStats,
      refetchInterval: 5 * 60 * 1000, // 5분마다 자동 갱신
   })

   return (
      <aside className="relative bg-black text-white text-xs w-full ">
         {isLoading && <TickerLoader />}
         <TickerList counts={data || { post: 0, visit: 0, user: 0 }} />
      </aside>
   )
}
