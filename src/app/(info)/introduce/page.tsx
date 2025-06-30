import { getDailyStatsRange, type DailyStats } from '@/entities/stats'
import Introduce from './ui'

export const dynamic = 'force-static'

export default async function page() {
   const chartStats = await getDailyStatsRange<DailyStats>(90) // 최근 90일 데이터

   return <Introduce chartStats={chartStats} />
}
