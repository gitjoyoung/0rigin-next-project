import React from 'react'
import { TickerCounts } from '@/types/tickerTypes'
import Introduce from './ui/Introduce'
import { getStats } from './api/getStats'

export default async function page() {
   const stats = await getStats() // API 호출
   return <Introduce counts={stats} />
}
