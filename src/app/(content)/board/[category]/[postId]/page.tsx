import { ROUTE_BOARD } from '@/constants/pathname'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getCategoryBySlug } from '@/entities/category'
import { getPostById, getPosts } from '@/entities/post'
import BreadcrumbWidget from '@/widgets/bread-crumb'
import BoardFooter from '../ui/board-common/board-footer'
import BoardHeader from '../ui/board-common/board-header'
import Comment from '../ui/comment'
import Post from '../ui/post'
import PostLike from '../ui/post-like'
import PostView from '../ui/post-view'

// 정적 생성을 위한 설정
export const dynamic = 'force-static'
export const revalidate = 300 // 5분마다 재검증

interface IParams {
   params: {
      category: string
      postId: string
   }
   searchParams: { page: string }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
   const { category, postId } = await params

   // 게시글 정보 조회
   const postData = await getPostById(postId)

   if (!postData) {
      return {
         title: `0rigin ${category}게시판`,
         description: `${category} 카테고리의 게시글입니다.`,
      }
   }

   return {
      title: `${postData.title} - 0rigin ${category}게시판`,
      description: postData.summary,
   }
}

export default async function Page({ params }: IParams) {
   const { category, postId } = await params

   if (!category || !postId) redirect(ROUTE_BOARD)

   // postId가 숫자가 아닌 경우 처리
   if (isNaN(Number(postId))) {
      redirect(`/board/${category}`)
   }

   // 카테고리 정보 조회 (DB에서 조회)
   const categoryInfo = await getCategoryBySlug(category)

   if (!categoryInfo) {
      redirect('/board/latest')
   }

   const postData = await getPostById(postId)

   if (!postData) {
      return notFound()
   }

   // 같은 카테고리의 다른 게시글들을 가져오기 (현재 게시글 제외)
   const { items: relatedPosts } = await getPosts({
      category: category === 'latest' ? undefined : category,
      page: 1,
      limit: 30,
   })

   return (
      <section className="flex flex-col gap-4 my-2 px-2">
         <BreadcrumbWidget />
         <PostView postData={postData} />
         <PostLike postId={postId} />
         <Comment postId={postId} />
         <div className="flex flex-col gap-2">
            <BoardHeader category={categoryInfo} />
            <Post postData={relatedPosts} />
         </div>
         <BoardFooter category={categoryInfo} />
      </section>
   )
}
