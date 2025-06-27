import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import {
   Post,
   PostCreate,
   PostDetail,
   PostListResponse,
   PostQueryParams,
   PostUpdate,
} from '../types'

// 게시글 목록 조회
export async function getPosts(
   params: PostQueryParams,
): Promise<PostListResponse> {
   const { category, page = 1, limit = 20, search, author_id } = params
   const supabase = await SupabaseServerClient()
   const offset = (page - 1) * limit

   let query = supabase.from('posts').select('*', { count: 'exact' })

   // category가 직접 제공된 경우
   if (category) {
      query = query.eq('category', category)
   }
   // 'latest'가 아닌 특정 카테고리인 경우에만 필터링
   else if (category && category !== 'latest') {
      const { data: categoryData, error: categoryError } = await supabase
         .from('categories')
         .select('id')
         .eq('slug', category)
         .eq('is_active', true)
         .single()

      if (categoryData) {
         // 해당 카테고리의 게시글만 조회 (category_id가 일치하는 것)
         query = query.eq('category_id', categoryData.id)
      } else {
         // 존재하지 않는 카테고리인 경우 빈 결과 반환
         return {
            items: [],
            total: 0,
            page,
            limit,
            totalPages: 0,
         }
      }
   }
   // 'latest'인 경우: 모든 카테고리의 게시글을 가져옴 (카테고리가 없는 글도 포함)

   if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
   }

   if (author_id) {
      query = query.eq('author_id', author_id)
   }

   const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) {
      console.error('게시글 목록 조회 에러:', error)
      throw new Error(`게시글 목록을 불러올 수 없습니다: ${error.message}`)
   }

   const totalPages = Math.ceil((count || 0) / limit)

   return {
      items: data as Post[],
      total: count || 0,
      page,
      limit,
      totalPages,
   }
}

// 게시글 상세 조회
export async function getPostById(
   id: number | string,
): Promise<PostDetail | null> {
   const supabase = await SupabaseServerClient()

   // 1. 게시글 기본 정보 조회
   const { data: post, error: postError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

   if (postError) {
      console.error('게시글 조회 에러:', postError)
      throw new Error('게시글을 불러올 수 없습니다.')
   }

   if (!post) return null

   // 2. 작성자 정보 조회 (author_id가 있는 경우)
   let author = null
   if (post.author_id) {
      const { data: authorData } = await supabase
         .from('profiles')
         .select('id, username, avatar_url')
         .eq('id', post.author_id)
         .single()

      author = authorData
   }

   // 3. 댓글 조회
   const { data: comments = [] } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })

   // 4. 조회수 증가
   await incrementPostView(id)

   // 5. 결합된 데이터 반환
   return {
      ...post,
      author,
      comments,
   } as PostDetail
}

// 게시글 생성
export async function createPost(data: PostCreate): Promise<Post> {
   const supabase = await SupabaseServerClient()

   const { data: post, error } = await supabase
      .from('posts')
      .insert(data)
      .select()
      .single()

   if (error) {
      throw new Error('게시글 생성에 실패했습니다.')
   }

   return post as Post
}

// 게시글 업데이트
export async function updatePost(
   id: number | string,
   data: PostUpdate,
): Promise<Post> {
   const supabase = await SupabaseServerClient()

   const { data: post, error } = await supabase
      .from('posts')
      .update(data)
      .eq('id', id)
      .select()
      .single()

   if (error) {
      throw new Error('게시글 업데이트에 실패했습니다.')
   }

   return post as Post
}

// 게시글 삭제
export async function deletePost(id: number | string): Promise<void> {
   const supabase = await SupabaseServerClient()

   const { error } = await supabase.from('posts').delete().eq('id', id)

   if (error) {
      throw new Error('게시글 삭제에 실패했습니다.')
   }
}

// 게시글 조회수 증가
export async function incrementPostView(
   postId: number | string,
): Promise<void> {
   const supabase = await SupabaseServerClient()

   // DB의 increment_view_count 함수 호출
   const { error } = await supabase.rpc('increment_view_count', {
      post_id: postId as number, // 타입 단언으로 간단하게 처리
   })

   if (error) {
      console.error('조회수 증가 실패:', error)
      // 에러가 발생해도 게시글 조회는 계속 진행되도록 함
   }
}

// 사용자별 게시글 조회 (좋아요, 댓글 수 포함)
export async function getPostsByUserId(userId: string): Promise<Post[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('posts')
      .select(
         `
         *,
         likes_count:post_likes(count),
         comments_count:comments(count)
      `,
      )
      .eq('author_id', userId)
      .order('created_at', { ascending: false })

   if (error) {
      console.error('사용자 게시글 조회 에러:', error)
      throw new Error(`사용자 게시글을 불러올 수 없습니다: ${error.message}`)
   }

   return data as Post[]
}

// 게시글에 작성자 정보를 추가하는 유틸리티 함수 (필요시 사용)
export async function enrichPostsWithAuthorInfo(
   posts: Post[],
): Promise<Post[]> {
   const supabase = await SupabaseServerClient()

   // author_id가 있는 게시글들의 작성자 정보 조회
   const authorIds = posts
      .filter((post) => post.author_id)
      .map((post) => post.author_id)

   if (authorIds.length === 0) {
      return posts // author_id가 없는 경우 원본 반환
   }

   const { data: authors } = await supabase
      .from('profile')
      .select('id, nickname, avatar_url')
      .in('id', authorIds)

   // 게시글에 작성자 정보 매핑
   return posts.map((post) => ({
      ...post,
      author: authors?.find((author) => author.id === post.author_id) || null,
   }))
}
