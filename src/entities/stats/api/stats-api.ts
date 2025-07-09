import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { Tables } from '@/shared/types'

// 최신 일일 통계 조회 (제네릭)
export async function getDailyStats(): Promise<Tables<'daily_stats'>> {
   const supabase = await SupabaseServerClient()

   const { data: dailyStats } = await supabase
      .from('daily_stats')
      .select('*')
      .order('id', { ascending: false })
      .limit(1)
      .single()
   return dailyStats
}

// 기간별 일일 통계 조회 (차트용)
export async function getDailyStatsRange<T = any>(
   days: number = 90,
): Promise<Tables<'daily_stats'>[]> {
   const supabase = await SupabaseServerClient()

   const { data: dailyStats, error } = await supabase
      .from('daily_stats')
      .select('*')
      .order('date', { ascending: true })
      .limit(days)

   if (error) {
      console.error('기간별 일일 통계 조회 에러:', error)
      return null
   }

   return dailyStats
}
