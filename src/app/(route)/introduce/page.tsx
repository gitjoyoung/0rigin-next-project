import React from 'react'
import { TickerCounts } from '@/types/tickerTypes'
import { Metadata } from 'next'
import Introduce from '@/components/Introduce/Introduce'
import { fetchTickerCounts } from '../api/board/tickerApi'

export const metadata: Metadata = {
   title: '0rigin 소개',
}

export default async function page() {
   const counts: TickerCounts = await fetchTickerCounts()
   return <Introduce counts={counts} />
}
