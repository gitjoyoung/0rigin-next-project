import { ROUTE_BOARD } from '@/constants/pathname'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import {
   Category,
   getActiveCategories,
   getCategoryBySlug,
} from '@/entities/category'
import { getPostList } from '@/entities/post'
import BoardFooter from '@/widgets/board/footer/board-footer'
import BoardHeader from '@/widgets/board/header/board-header'
import { CustomPagination } from '@/widgets/board/pagination'
import PostList from '@/widgets/board/post/post-list'

interface IParams {
   params: {
      category: string
   }
   searchParams: { page: string }
}

// 기본 ISR 설정 - 1 분마다   재생성
export const revalidate = 60

// 빌드 시 생성할 정적 경로들
export async function generateStaticParams() {
   try {
      const categories = await getActiveCategories()

      // 모든 활성 카테고리 + 'latest' 경로 생성
      const staticParams = [
         { category: 'latest' }, // 전체 게시판
         ...categories.map((cat: Category) => ({
            category: cat.slug,
         })),
      ]

      console.log(
         '📄 Static params generated:',
         staticParams.length,
         'categories',
      )
      return staticParams
   } catch (error) {
      console.error('❌ Error generating static params:', error)
      // 기본 경로라도 생성
      return [{ category: 'latest' }]
   }
}

export async function generateMetadata({
   params,
   searchParams,
}: IParams): Promise<Metadata> {
   const { category } = await params
   const { page } = await searchParams

   const categoryName = category === 'latest' ? '전체' : category
   if (page === undefined) return { title: `${categoryName} 게시판` }
   return {
      title: `${categoryName} 게시판 ${page} 페이지`,
      description: `0RIGIN(제로리진) ${categoryName} 게시판의 ${page} 페이지입니다.`,
   }
}

export default async function Page({ params, searchParams }: IParams) {
   const { category } = await params
   if (!category) redirect(ROUTE_BOARD)

   const { page } = await searchParams
   const currentPage: number = Number(page) || 1
   const POST_PER_PAGE: number = 20

   const categoryInfo = await getCategoryBySlug(category)
   if (!categoryInfo) {
      redirect('/board/latest')
   }

   const { items, totalCount } = await getPostList({
      category: category === 'latest' ? undefined : categoryInfo.slug,
      page: currentPage,
      limit: POST_PER_PAGE,
   })

   return (
      <section className="flex flex-col gap-2 px-1">
         <BoardHeader category={categoryInfo} />
         <PostList data={items} category={category} />
         <BoardFooter category={categoryInfo} />
         <div className="my-4">
            <CustomPagination
               count={totalCount}
               currentPage={currentPage}
               baseRoute={`/board/${category}`}
            />
         </div>
      </section>
   )
}
