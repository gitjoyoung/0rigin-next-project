import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import type { IIntroduceStats } from '../model/types'

const DEFAULT_STATS: IIntroduceStats = {
   id: 0,
   date: new Date(),
   view_count: 0,
   post_count: 0,
   new_user_count: 0,
   comment_count: 0,
   active_user_count: 0,
   peak_concurrent_users: 0,
   trending_post_id: '',
   trending_post_views: 0,
   avg_response_time_ms: 0,
   created_at: undefined,
   updated_at: undefined,
   last_updated_by: '',
} as const

export const getDailyStats = async (): Promise<Partial<IIntroduceStats>> => {
   const supabase = await SupabaseBrowserClient()
   const { data: dailyStats } = await supabase
      .from('daily_stats')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single()
   return dailyStats ? { ...DEFAULT_STATS, ...dailyStats } : DEFAULT_STATS
}
