import type { ICategory } from '@/app/(content)/board/[category]/types/category-type'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'

/**
 * 특정 카테고리의 상세 정보를 조회합니다.
 *
 * @param category - 조회할 카테고리의 slug
 * @returns 카테고리 정보 객체 또는 null (카테고리가 없거나 오류 발생 시)
 *
 * @example
 * ```typescript
 * const categoryInfo = await getCategoryInfo('general')
 * if (categoryInfo) {
 *   console.log(categoryInfo.name) // 카테고리 이름
 *   console.log(categoryInfo.description) // 카테고리 설명
 * }
 * ```
 */
export async function getCategoryInfo(
   category: string,
): Promise<ICategory | null> {
   try {
      const supabase = await SupabaseBrowserClient()
      const { data: categoryData, error: categoryError } = await supabase
         .from('categories')
         .select('*')
         .eq('slug', category)
         .single()

      if (categoryError) {
         return null
      }

      return categoryData
   } catch (error) {
      return null
   }
}

/**
 * 모든 카테고리 목록을 이름순으로 정렬하여 조회합니다.
 *
 * @returns 카테고리 배열 (오류 발생 시 빈 배열)
 *
 * @example
 * ```typescript
 * const categories = await getAllCategories()
 * categories.forEach(category => {
 *   console.log(`${category.name} (${category.slug})`)
 * })
 * ```
 */
export async function getAllCategories(): Promise<ICategory[]> {
   try {
      const supabase = await SupabaseBrowserClient()
      const { data: categoriesData, error: categoriesError } = await supabase
         .from('categories')
         .select('*')
         .order('name', { ascending: true })

      if (categoriesError) {
         console.error('전체 카테고리 조회 실패:', categoriesError)
         return []
      }

      return categoriesData || []
   } catch (error) {
      console.error('전체 카테고리 조회 중 오류 발생:', error)
      return []
   }
}
