import { getDailyStats } from '@/entities/stats'
import { NextResponse } from 'next/server'

export async function GET() {
   const stats = await getDailyStats()
   return NextResponse.json(stats)
}
