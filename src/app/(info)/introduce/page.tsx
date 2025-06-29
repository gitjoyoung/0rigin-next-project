import { getDailyStats } from '@/entities/stats'
import Introduce from './ui'

export const dynamic = 'force-static'

export default async function page() {
   const stats = await getDailyStats() // API 호출
   return <Introduce stats={stats} />
}
