import React from 'react'
import { TickerCounts } from '@/types/tickerTypes'
import { Metadata } from 'next'
import { fetchTickerCounts } from '@/service/board/tickerApi'
import Introduce from './_conponents/Introduce'


export const revalidate = 3600

export default async function page() {
   const counts: TickerCounts = await fetchTickerCounts()
   return <Introduce counts={counts} />
}
