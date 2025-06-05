import { ROUTE_BOARD } from '@/shared/constants/pathname'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import BoardFooter from './ui/board-footer'
import BoardHeader from './ui/board-header'
import CustomPagination from './ui/pagination/custom-pagination'
import Post from './ui/post'

interface IParams {
   params: {
      category: string
   }
   searchParams: { page: string }
}

export async function generateMetadata({
   params,
   searchParams,
}: IParams): Promise<Metadata> {
   const { category } = await params
   const { page } = await searchParams

   const categoryName = category === 'all' ? '전체' : category
   if (page === undefined) return { title: `${categoryName} 게시판` }
   return {
      title: `${categoryName} 게시판 ${page} 페이지`,
      description: `${categoryName} 게시판의 ${page} 페이지입니다.`,
   }
}

export default async function Page({ params, searchParams }: IParams) {
   const { category } = await params
   if (!category) redirect(ROUTE_BOARD)

   const { page } = await searchParams
   const currentPage: number = Number(page) || 1
   const POST_PER_PAGE = 20

   const supabase = await SupabaseServerClient()

   // 카테고리 정보 조회
   let categoryInfo = {
      slug: 'all',
      name: '최신 게시물',
      description: '최신 게시물을 확인해보세요.',
   }
   if (category !== 'all') {
      const { data: categoryData, error: categoryError } = await supabase
         .from('categories')
         .select('*')
         .eq('slug', category)
         .single()

      // 카테고리가 존재하지 않으면 all로 리다이렉트
      if (categoryError || !categoryData) {
         redirect('/board/all')
      }

      categoryInfo = categoryData
   }

   // 카테고리별 쿼리 구성
   let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

   // 'all'이 아닌 경우에만 카테고리 필터 적용
   if (category !== 'all') {
      query = query.eq('category', category)
   }

   const { data: posts, error } = await query.range(
      (currentPage - 1) * POST_PER_PAGE,
      currentPage * POST_PER_PAGE - 1,
   )

   if (error) {
      console.error('게시물 조회 중 오류 발생:', error)
      return notFound()
   }

   return (
      <section className="flex flex-col gap-4">
         <BoardHeader category={categoryInfo} />
         <Post postData={posts || []} />
         <BoardFooter />
         <CustomPagination
            currentPage={currentPage}
            baseRoute={`/board/${category}`}
         />
      </section>
   )
}
