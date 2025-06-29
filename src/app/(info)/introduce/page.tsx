import { getDailyStats } from '@/entities/stats'
import Introduce from './ui'

export const revalidate = 3600 // 1시간으로 변경
export const dynamic = 'force-dynamic' // 동적 페이지로 명시적 설정

export default async function page() {
   const stats = await getDailyStats() // API 호출
   return <Introduce stats={stats} />
}
