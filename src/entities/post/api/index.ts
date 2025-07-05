import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type {
   Post,
   PostCreate,
   PostDetail,
   PostListResponse,
   PostQueryParams,
   PostUpdate,
} from '../types'

// password 필드 제거 유틸
function removePasswordFromPost(post: any) {
   if (!post) return post
   const { password, ...rest } = post
   return rest
}

// 게시글 목록 조회
export async function getPosts(
   params: PostQueryParams,
): Promise<PostListResponse> {
   const { category, page = 1, limit = 20, search, author_id } = params
   const supabase = await SupabaseServerClient()
   const offset = (page - 1) * limit

   let query = supabase.from('posts').select('*', { count: 'exact' })

   // 카테고리 필터링 - category가 있으면 직접 사용
   if (category) {
      query = query.eq('category', category)
   }

   if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
   }

   if (author_id) {
      query = query.eq('author_id', author_id)
   }

   const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) throw error

   const totalPages = Math.ceil((count || 0) / limit)

   return {
      items: (data as Post[]).map(removePasswordFromPost),
      total: count || 0,
      page,
      limit,
      totalPages,
   }
}

// 카테고리별 베스트 게시글 조회 (조회수 기준)
export async function getBestPosts(params: PostQueryParams): Promise<Post[]> {
   const { category, limit = 5 } = params
   const supabase = await SupabaseServerClient()

   let query = supabase
      .from('posts')
      .select('*')
      .order('view_count', { ascending: false })
      .limit(limit)

   if (category) {
      query = query.eq('category', category)
   }

   const { data, error } = await query

   if (error) throw error

   return (data as Post[]).map(removePasswordFromPost)
}

// 게시글 상세 조회
export async function getPostById(id: number): Promise<PostDetail | null> {
   const supabase = await SupabaseServerClient()

   const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

   if (error || !post) return null

   // 조회수 증가
   await incrementPostView(id)

   return removePasswordFromPost(post as PostDetail)
}

// 게시글 생성
export async function createPost(data: PostCreate): Promise<Post> {
   const supabase = await SupabaseServerClient()

   const { data: post, error } = await supabase
      .from('posts')
      .insert(data)
      .select()
      .single()

   if (error) throw error
   return removePasswordFromPost(post as Post)
}

// 게시글 수정
export async function updatePost(id: number, data: PostUpdate): Promise<Post> {
   const supabase = await SupabaseServerClient()

   const { data: post, error } = await supabase
      .from('posts')
      .update(data)
      .eq('id', id)
      .select()
      .single()

   if (error) throw error
   return removePasswordFromPost(post as Post)
}

// 게시글 삭제
export async function deletePost(id: number): Promise<void> {
   const supabase = await SupabaseServerClient()

   const { error } = await supabase.from('posts').delete().eq('id', id)
   if (error) throw error
}

// 게시글 조회수 증가
export async function incrementPostView(
   postId: number | string,
): Promise<void> {
   const supabase = await SupabaseServerClient()

   const { error } = await supabase.rpc('increment_view_count', {
      post_id: Number(postId),
   })

   if (error) {
      console.error('조회수 증가 실패:', error)
   }
}

// 사용자별 게시글 조회
export async function getPostsByUserId(userId: string): Promise<Post[]> {
   const supabase = await SupabaseServerClient()

   const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', userId)
      .order('created_at', { ascending: false })

   if (error) throw error
   return (posts || []).map(removePasswordFromPost)
}

// 게시글 비밀번호 검증 (password 필드 포함)
export async function verifyPostPassword(
   id: number,
   password: string,
): Promise<boolean> {
   const supabase = await SupabaseServerClient()

   const { data: post, error } = await supabase
      .from('posts')
      .select('password')
      .eq('id', id)
      .single()

   if (error || !post) {
      return false
   }

   return post.password === password
}
