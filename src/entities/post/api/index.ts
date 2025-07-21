import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { Tables } from '@/shared/types/database.types'
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
export async function getPostList(
   params: PostQueryParams,
): Promise<PostListResponse> {
   const { category, page = 1, limit = 20, search, author_id } = params
   const supabase = await SupabaseServerClient()
   const offset = (page - 1) * limit

   // LEFT JOIN을 사용한 게시글 목록 조회 (댓글 수 포함)
   let query = supabase.from('posts').select(
      `
         id,
         title,
         content,
         created_at,
         updated_at,
         author_id,
         nickname,
         view_count,
         category,
         status,
         thumbnail,
         comments!left(count)
      `,
      { count: 'exact' },
   )

   // 필터링 조건 적용
   if (category) {
      query = query.eq('category', category)
   }
   if (search) {
      query = query.ilike('title', `%${search}%`)
   }
   if (author_id) {
      query = query.eq('author_id', author_id)
   }

   // 정렬 및 페이징
   const {
      data: posts,
      error,
      count,
   } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`)
   }

   // 댓글 수 추출 및 Post 타입으로 변환
   const postsWithCommentCount = (posts || []).map((post: any) => {
      const commentCount = post.comments?.[0]?.count || 0
      const { comments, ...postData } = post // comments 필드 제거

      return {
         ...postData,
         comments_count: commentCount > 0 ? commentCount : undefined,
      }
   })

   return {
      items: postsWithCommentCount as Post[],
      totalCount: count || 0,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / limit),
   }
}

// 카테고리별 베스트 게시글 조회 (조회수 기준)
export async function getBestPosts(params: PostQueryParams): Promise<Post[]> {
   const { category, limit } = params
   const supabase = await SupabaseServerClient()
   let query = supabase
      .from('posts')
      .select('*')
      .order('view_count', { ascending: false })
      .limit(limit || 5)
   if (category) query = query.eq('category', category)
   const { data, error } = await query
   if (error) throw error
   return data as Post[]
}

// 게시글 상세 조회
export async function getPostById(id: number): Promise<Tables<'posts'> | null> {
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
