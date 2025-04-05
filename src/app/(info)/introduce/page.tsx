import { getDailyStats } from './api/getStats'
import Introduce from './ui'

export default async function page() {
   const stats = await getDailyStats() // API 호출
   return <Introduce stats={stats} />
}
