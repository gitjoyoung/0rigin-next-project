import Introduce from '@/components/Introduce/Introduce'
import React from 'react'
import { TickerCounts } from '@/types/tickerTypes'
import { fetchTickerCounts } from '../api/board/tickerApi'

export default async function page() {
   const counts: TickerCounts = await fetchTickerCounts()
   return <Introduce counts={counts} />
}
