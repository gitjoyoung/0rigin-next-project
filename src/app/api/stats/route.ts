import { getDailyStats } from '@/entities/stats'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const stats = await getDailyStats()

      if (!stats) {
         return NextResponse.json(
            { error: '통계 데이터를 찾을 수 없습니다.' },
            { status: 404 },
         )
      }

      return NextResponse.json(stats)
   } catch (error) {
      console.error('통계 API 에러:', error)
      return NextResponse.json(
         { error: '통계 데이터를 불러오는데 실패했습니다.' },
         { status: 500 },
      )
   }
}
