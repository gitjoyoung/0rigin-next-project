/**
 * @description 서버 사이드 전용 Post Search API
 * 이 파일의 함수들은 서버 컴포넌트에서만 사용 가능합니다.
 * 클라이언트에서 사용하려면 API 라우트를 통해 접근해야 합니다.
 */

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { PostCategory, PostSearchResult } from '../types'

// 게시글 검색
export async function searchPosts(
   keyword: string,
   categoryId?: string,
   limit = 10,
   offset = 0,
): Promise<{ data: PostSearchResult[]; count: number }> {
   const supabase = await SupabaseServerClient()

   let query = supabase
      .from('posts')
      .select('*, author:profiles(*)', { count: 'exact' })
      .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)

   if (categoryId) {
      query = query.eq('category_id', categoryId)
   }

   const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) {
      throw new Error('게시글 검색에 실패했습니다.')
   }

   // 검색 결과에 excerpt 추가
   const searchResults: PostSearchResult[] = (data || []).map((post) => ({
      ...post,
      excerpt: generateExcerpt(post.content, 150),
   }))

   return {
      data: searchResults,
      count: count || 0,
   }
}

// 카테고리별 게시글 검색
export async function searchPostsByCategory(
   categoryId: string,
   limit = 10,
   offset = 0,
): Promise<{ data: PostSearchResult[]; count: number }> {
   const supabase = await SupabaseServerClient()

   const { data, error, count } = await supabase
      .from('posts')
      .select('*, author:profiles(*)', { count: 'exact' })
      .eq('category_id', categoryId as string) // 타입 단언 사용
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) {
      throw new Error('카테고리별 게시글 검색에 실패했습니다.')
   }

   const searchResults: PostSearchResult[] = (data || []).map((post) => ({
      ...post,
      excerpt: generateExcerpt(post.content, 150),
   }))

   return {
      data: searchResults,
      count: count || 0,
   }
}

// 카테고리 목록 조회
export async function getCategories(): Promise<PostCategory[]> {
   const supabase = await SupabaseServerClient()

   // categories 테이블에서 활성 카테고리 조회
   const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })
      .order('name', { ascending: true })

   if (error) {
      throw new Error('카테고리 목록을 불러올 수 없습니다.')
   }

   // 각 카테고리별 게시글 수 조회
   const categoriesWithCount: PostCategory[] = []

   for (const category of categories || []) {
      const { count } = await supabase
         .from('posts')
         .select('*', { count: 'exact', head: true })
         .eq('category_id', category.id)

      categoriesWithCount.push({
         ...category,
         post_count: count || 0,
      })
   }

   return categoriesWithCount
}

// 특정 카테고리 정보 조회 (slug로)
export async function getCategoryByName(
   categorySlug: string,
): Promise<PostCategory | null> {
   const supabase = await SupabaseServerClient()

   // categories 테이블에서 slug로 카테고리 조회
   const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', categorySlug)
      .eq('is_active', true)
      .single()

   if (error || !category) {
      return null
   }

   // 해당 카테고리의 게시글 수 조회
   const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', category.id)

   return {
      ...category,
      post_count: count || 0,
   }
}

// 인기 게시글 검색 (좋아요 수 기준)
export async function getPopularPosts(
   limit = 10,
   offset = 0,
): Promise<{ data: PostSearchResult[]; count: number }> {
   const supabase = await SupabaseServerClient()

   const { data, error, count } = await supabase
      .from('posts')
      .select(
         `
         *,
         author:profiles(*),
         post_likes(count)
      `,
         { count: 'exact' },
      )
      .order('post_likes.count', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) {
      throw new Error('인기 게시글을 불러올 수 없습니다.')
   }

   const searchResults: PostSearchResult[] = (data || []).map((post) => ({
      ...post,
      excerpt: generateExcerpt(post.content, 150),
   }))

   return {
      data: searchResults,
      count: count || 0,
   }
}

// 최근 게시글 검색
export async function getRecentPosts(
   limit = 10,
   offset = 0,
): Promise<{ data: PostSearchResult[]; count: number }> {
   const supabase = await SupabaseServerClient()

   const { data, error, count } = await supabase
      .from('posts')
      .select('*, author:profiles(*)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) {
      throw new Error('최근 게시글을 불러올 수 없습니다.')
   }

   const searchResults: PostSearchResult[] = (data || []).map((post) => ({
      ...post,
      excerpt: generateExcerpt(post.content, 150),
   }))

   return {
      data: searchResults,
      count: count || 0,
   }
}

// 내용에서 excerpt 생성하는 헬퍼 함수
function generateExcerpt(content: string, maxLength: number): string {
   // HTML 태그 제거
   const plainText = content.replace(/<[^>]*>/g, '')

   if (plainText.length <= maxLength) {
      return plainText
   }

   return plainText.substring(0, maxLength) + '...'
}
