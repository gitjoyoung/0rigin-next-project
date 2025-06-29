import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type {
   Category,
   CategoryCreate,
   CategoryListResponse,
   CategoryQueryParams,
   CategoryStats,
   CategoryUpdate,
} from '../types'

// ========================================
// 카테고리 관련 API
// ========================================

/**
 * 카테고리 목록 조회
 */
export async function getCategories(
   params: CategoryQueryParams = {},
): Promise<CategoryListResponse> {
   const {
      is_active,
      can_write,
      include_post_count = false,
      order_by = 'order_index',
      order = 'asc',
   } = params

   const supabase = await SupabaseServerClient()
   let query = supabase.from('categories').select('*', { count: 'exact' })

   // 필터링
   if (is_active !== undefined) {
      query = query.eq('is_active', is_active)
   }

   if (can_write !== undefined) {
      query = query.eq('can_write', can_write)
   }

   // 정렬
   query = query.order(order_by, { ascending: order === 'asc' })

   const { data: categories, error, count } = await query

   if (error) throw error

   let items = categories as Category[]

   // 게시글 수 포함 요청 시
   if (include_post_count && categories) {
      const categoriesWithCount: Category[] = []

      for (const category of categories) {
         const { count: postCount } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id)

         categoriesWithCount.push({
            ...category,
            post_count: postCount || 0,
         })
      }

      items = categoriesWithCount
   }

   return {
      items,
      total: count || 0,
   }
}

/**
 * 카테고리 상세 조회 (ID로)
 */
export async function getCategoryById(id: string): Promise<Category | null> {
   const supabase = await SupabaseServerClient()

   const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

   if (error || !category) return null

   return category as Category
}

/**
 * 카테고리 상세 조회 (slug로)
 */
export async function getCategoryBySlug(
   slug: string,
): Promise<Category | null> {
   const supabase = await SupabaseServerClient()

   const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

   if (error || !category) return null

   return category as Category
}

/**
 * 카테고리 생성
 */
export async function createCategory(data: CategoryCreate): Promise<Category> {
   const supabase = await SupabaseServerClient()

   const { data: category, error } = await supabase
      .from('categories')
      .insert(data)
      .select()
      .single()

   if (error) throw error
   return category as Category
}

/**
 * 카테고리 수정
 */
export async function updateCategory(
   id: string,
   data: CategoryUpdate,
): Promise<Category> {
   const supabase = await SupabaseServerClient()

   const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
   }

   const { data: category, error } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

   if (error) throw error
   return category as Category
}

/**
 * 카테고리 삭제
 */
export async function deleteCategory(id: string): Promise<void> {
   const supabase = await SupabaseServerClient()

   const { error } = await supabase.from('categories').delete().eq('id', id)
   if (error) throw error
}

/**
 * 카테고리 활성화/비활성화
 */
export async function toggleCategoryActive(
   id: string,
   is_active: boolean,
): Promise<Category> {
   const supabase = await SupabaseServerClient()

   const { data: category, error } = await supabase
      .from('categories')
      .update({
         is_active,
         updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

   if (error) throw error
   return category as Category
}

/**
 * 카테고리 글쓰기 권한 설정
 */
export async function toggleCategoryWritePermission(
   id: string,
   can_write: boolean,
): Promise<Category> {
   const supabase = await SupabaseServerClient()

   const { data: category, error } = await supabase
      .from('categories')
      .update({
         can_write,
         updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

   if (error) throw error
   return category as Category
}

/**
 * 활성 카테고리 목록 조회 (간단 버전)
 */
export async function getActiveCategories(): Promise<Category[]> {
   const supabase = await SupabaseServerClient()

   const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })
      .order('name', { ascending: true })

   if (error) throw error
   return (categories || []) as Category[]
}

/**
 * 글쓰기 가능한 카테고리 목록 조회
 */
export async function getWritableCategories(): Promise<Category[]> {
   const supabase = await SupabaseServerClient()

   const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .eq('can_write', true)
      .order('order_index', { ascending: true })
      .order('name', { ascending: true })

   if (error) throw error
   return (categories || []) as Category[]
}

/**
 * 카테고리 통계 조회
 */
export async function getCategoryStats(): Promise<CategoryStats> {
   const supabase = await SupabaseServerClient()

   // 카테고리 기본 통계
   const { data: allCategories } = await supabase
      .from('categories')
      .select('id, is_active, can_write')

   const totalCategories = allCategories?.length || 0
   const activeCategories =
      allCategories?.filter((c) => c.is_active).length || 0
   const writableCategories =
      allCategories?.filter((c) => c.can_write && c.is_active).length || 0

   // 카테고리별 게시글 수
   const { data: postCounts } = await supabase
      .from('posts')
      .select('category_id')
      .not('category_id', 'is', null)

   const postsByCategory: Record<string, number> = {}
   postCounts?.forEach((post) => {
      if (post.category_id) {
         postsByCategory[post.category_id] =
            (postsByCategory[post.category_id] || 0) + 1
      }
   })

   return {
      total_categories: totalCategories,
      active_categories: activeCategories,
      writable_categories: writableCategories,
      total_posts_by_category: postsByCategory,
   }
}
