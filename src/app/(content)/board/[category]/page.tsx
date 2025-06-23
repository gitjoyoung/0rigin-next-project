import { ROUTE_BOARD } from '@/constants/pathname'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getCategoryInfo } from '@/entities/auth/api/get-category-info'
import {
   getPostInfo,
   getTotalPostCount,
} from '@/entities/auth/api/get-post-info'
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

   // 카테고리 정보 조회
   let categoryInfo = {
      slug: 'all',
      name: '최신 게시물',
      description: '최신 게시물을 확인해보세요.',
   }
   if (category !== 'all') {
      const categoryData = await getCategoryInfo(category)
      categoryInfo = categoryData
   }

   const { data: posts, error } = await getPostInfo(
      category,
      currentPage,
      POST_PER_PAGE,
   )

   const { count } = await getTotalPostCount()
   return (
      <section className="flex flex-col gap-2 px-1">
         <BoardHeader category={categoryInfo} />
         <Post postData={posts || []} />
         <BoardFooter />
         <div className=" my-4">
            <CustomPagination
               count={count || 0}
               currentPage={currentPage}
               baseRoute={`/board/${category}`}
            />
         </div>
      </section>
   )
}
