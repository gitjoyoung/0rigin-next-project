'use client'

import { useEffect, useState } from 'react'
import TickerView from './ui/TickerView'
import { getCountStats } from './api/getCountStats'
import { TickerCounts } from './model/types'
import TickerLoader from './ui/TickerLoader'

export default function Ticker() {
   const [data, setData] = useState<TickerCounts>({
      post: 0,
      visit: 0,
      user: 0,
   })
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchData = async () => {
         try {
            setLoading(true)
            const stats = await getCountStats()
            setData(stats)
         } catch (error) {
            console.error('Failed to fetch ticker stats:', error)
         } finally {
            setLoading(false)
         }
      }

      fetchData()
      const interval = setInterval(fetchData, 5 * 60 * 1000)
      return () => clearInterval(interval)
   }, [])

   return (
      <aside className="relative bg-black text-white text-xs w-full">
         {loading && <TickerLoader />}
         <TickerView initialData={data} />
      </aside>
   )
}
