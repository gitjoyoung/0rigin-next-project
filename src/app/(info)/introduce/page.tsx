import { getDailyStatsRange } from '@/entities/stats'
import Introduce from './ui'

export const dynamic = 'force-static'

export default async function page() {
   const chartStats = await getDailyStatsRange(90) // 최근 90일 데이터

   console.log('chartStats', chartStats)
   return <Introduce chartStats={chartStats} />
}
