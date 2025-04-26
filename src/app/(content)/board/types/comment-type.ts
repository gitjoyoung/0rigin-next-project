export interface IComment {
   id: number
   post_id: number
   parent_id: number
   created_at: string
   updated_at: string
   content: string
   author_id: string
   nickname: string
   password: string
   likes: number
   is_approved: boolean
   is_edited: boolean
   depth: number
}
