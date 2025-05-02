export interface IStats {
   id: number
   visitor_count: number
   post_count: number
   user_count: number
   created_at: Date
   updated_at: Date

   // 추후 추가 예정
   // comment_count: number
   // active_user_count: number
   // peak_concurrent_users: number
   // trending_post_id: string
   // trending_post_views: number
   // avg_response_time_ms: number
   // last_updated_by: string
}
