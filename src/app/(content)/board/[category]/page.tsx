import { ROUTE_BOARD } from '@/constants/pathname'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getCategoryByName, getPosts } from '@/entities/post'
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

   const categoryName = category === 'latest' ? '전체' : category
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
   const POST_PER_PAGE: number = 20

   // 카테고리 정보 조회 (DB에서 'latest' 포함하여 조회)
   const categoryInfo = await getCategoryByName(category)

   if (!categoryInfo) {
      redirect('/board/latest')
   }

   const postResponse = await getPosts({
      category: category,
      page: currentPage,
      limit: POST_PER_PAGE,
   })

   return (
      <section className="flex flex-col gap-2 px-1">
         <BoardHeader category={categoryInfo} />
         <Post postData={postResponse.items} />
         <BoardFooter category={category} />
         <div className=" my-4">
            <CustomPagination
               count={postResponse.total}
               currentPage={currentPage}
               baseRoute={`/board/${category}`}
            />
         </div>
      </section>
   )
}
