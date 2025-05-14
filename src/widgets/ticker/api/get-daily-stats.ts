import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import type { IStats } from '../model/ticker-types'

const DEFAULT_STATS: Partial<IStats> = {
   visitor_count: 0,
   post_count: 0,
   user_count: 0,
} as const

export const getDailyStats = async (): Promise<Partial<IStats>> => {
   const supabase = await SupabaseBrowserClient()
   const { data: dailyStats } = await supabase
      .from('daily_stats')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single()
   return dailyStats ? { ...DEFAULT_STATS, ...dailyStats } : DEFAULT_STATS
}
