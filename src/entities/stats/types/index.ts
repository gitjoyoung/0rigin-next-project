// 일일 통계 기본 타입 (DB 스키마 기반)
export interface DailyStats {
   id: number
   date: string
   visitor_count: number
   post_count: number
   user_count: number
   comment_count: number
   created_at: string
   updated_at: string
}
