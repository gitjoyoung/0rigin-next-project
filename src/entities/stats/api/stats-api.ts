import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'

// 최신 일일 통계 조회 (제네릭)
export async function getDailyStats<T = any>(): Promise<T | null> {
   const supabase = await SupabaseServerClient()

   const { data: dailyStats, error } = await supabase
      .from('daily_stats')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single()

   if (error) {
      console.error('일일 통계 조회 에러:', error)
      return null
   }

   return dailyStats as T
}
