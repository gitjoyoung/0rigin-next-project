import { ROUTE_BOARD } from '@/constants/pathname'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getCategoryBySlug } from '@/entities/category'
import { getPostById, getPosts } from '@/entities/post'
import Comment from '@/widgets/board/comment'
import BoardFooter from '@/widgets/board/common/board-footer'
import BoardHeader from '@/widgets/board/common/board-header'
import PostLike from '@/widgets/board/post-like'
import PostList from '@/widgets/board/post-list'
import PostView from '@/widgets/board/post-view'
import BreadcrumbWidget from '@/widgets/bread-crumb'

interface IParams {
   params: {
      category: string
      postId: string
   }
   searchParams: { page: string }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
   const { category, postId } = await params
   const postData = await getPostById(Number(postId))
   const metaData = {
      title: postData
         ? `${postData.title} - 0RIGIN(제로리진)`
         : `${category} 게시판 - 0RIGIN(제로리진)`,
      description: postData
         ? `${postData.summary} - 0RIGIN(제로리진)`
         : `${category} 게시판 - 0RIGIN(제로리진)`,
   }
   return metaData
}

export default async function Page({ params }: IParams) {
   const { category, postId } = await params
   if (!category || !postId || isNaN(Number(postId))) redirect(ROUTE_BOARD)

   const categoryInfo = await getCategoryBySlug(category)
   if (!categoryInfo) redirect(ROUTE_BOARD)

   const postData = await getPostById(Number(postId))
   if (!postData) notFound()

   const { items } = await getPosts({
      category: category === 'latest' ? undefined : categoryInfo.slug,
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
            <PostList data={items} />
         </div>
         <BoardFooter category={categoryInfo} />
      </section>
   )
}
