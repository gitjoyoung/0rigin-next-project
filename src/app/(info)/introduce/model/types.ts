export interface IIntroduceStats {
   id: number
   date: Date
   view_count: number
   post_count: number
   new_user_count: number
   comment_count: number
   active_user_count: number
   peak_concurrent_users: number
   trending_post_id: string
   trending_post_views: number
   avg_response_time_ms: number
   created_at: Date
   updated_at: Date
   last_updated_by: string
}
