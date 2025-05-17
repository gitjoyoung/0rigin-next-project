// src/widgets/post/list/api/index.ts

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'

// 타입 정의
interface Post {
   id: string
   title: string
   content: string
   category: string
   author_id: string
   created_at: string
   updated_at: string
   author?: {
      id: string
      username: string
      avatar_url?: string
   }
}

interface PostQueryParams {
   category?: string
   page?: number
   limit?: number
}

type PostCreate = Omit<Post, 'id' | 'created_at' | 'updated_at' | 'author'>
type PostUpdate = Partial<PostCreate>

export const postServerApi = {
   async getList(params: PostQueryParams) {
      const { category, page = 1, limit = 20 } = params
      const supabase = await SupabaseServerClient()
      const offset = (page - 1) * limit

      let query = supabase
         .from('posts')
         .select('*, author:profiles(*)', { count: 'exact' })

      if (category) {
         query = query.eq('category', category)
      }

      const { data, error, count } = await query
         .order('created_at', { ascending: false })
         .range(offset, offset + limit - 1)

      if (error) throw new Error(error.message)

      return {
         items: data as Post[],
         total: count || 0,
         page,
         limit,
      }
   },

   async getById(id: string) {
      const supabase = await SupabaseServerClient()
      const { data, error } = await supabase
         .from('posts')
         .select('*, author:profiles(*), comments:comments(*)')
         .eq('id', id)
         .single()

      if (error) throw new Error(error.message)

      return data as Post
   },

   async create(data: PostCreate) {
      const supabase = await SupabaseServerClient()
      const { data: post, error } = await supabase
         .from('posts')
         .insert(data)
         .select()
         .single()

      if (error) throw new Error(error.message)

      return post as Post
   },

   async update(id: string, data: PostUpdate) {
      const supabase = await SupabaseServerClient()
      const { data: post, error } = await supabase
         .from('posts')
         .update(data)
         .eq('id', id)
         .select()
         .single()

      if (error) throw new Error(error.message)

      return post as Post
   },

   async delete(id: string) {
      const supabase = await SupabaseServerClient()
      const { error } = await supabase.from('posts').delete().eq('id', id)

      if (error) throw new Error(error.message)

      return true
   },
}

// 타입 export
export type { Post, PostCreate, PostQueryParams, PostUpdate }
