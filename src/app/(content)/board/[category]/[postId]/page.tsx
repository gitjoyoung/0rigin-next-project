import { ROUTE_BOARD } from '@/constants/pathname'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getCategoryBySlug } from '@/entities/category'
import { getPostById, getPosts } from '@/entities/post'
import BreadcrumbWidget from '@/widgets/bread-crumb'
import BoardFooter from '../ui/board-common/board-footer'
import BoardHeader from '../ui/board-common/board-header'
import Comment from '../ui/comment'
import PostLike from '../ui/post-like'
import Post from '../ui/post-list'
import PostView from '../ui/post-view'

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
   const postData = await getPostById(Number(postId))

   if (!postData) {
      return {
         title: `0RIGIN(제로리진) ${category} 게시판`,
         description: `0RIGIN(제로리진) ${category} 카테고리의 게시글입니다.`,
      }
   }

   return {
      title: `${postData.title}`,
      description: postData.summary,
   }
}

export default async function Page({ params }: IParams) {
   const { category, postId } = await params
   if (!category || !postId) redirect(ROUTE_BOARD)

   if (isNaN(Number(postId))) {
      redirect(`/board/${category}`)
   }
   const categoryInfo = await getCategoryBySlug(category)
   if (!categoryInfo) {
      redirect('/board/latest')
   }
   const postData = await getPostById(Number(postId))

   if (!postData) {
      return notFound()
   }

   const { items } = await getPosts({
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
            <Post data={items} />
         </div>
         <BoardFooter category={categoryInfo} />
      </section>
   )
}
