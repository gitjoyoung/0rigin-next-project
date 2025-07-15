import { getDailyStatsRange } from '@/entities/stats'
import Introduce from '@/widgets/introduce/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
   title: '소개',
   description: '0RIGIN(제로리진) 소개 페이지입니다.',
}
export const dynamic = 'force-static' // 데이터 변경 없이 페이지 정적 생성

export default async function page() {
   const chartStats = await getDailyStatsRange(90) // 최근 90일 데이터

   return <Introduce chartStats={chartStats} />
}
