import { ROUTE_BOARD } from '@/shared/constants/pathname'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getCategoryInfo } from '@/entities/auth/api/get-category-info'
import BreadcrumbWidget from '@/widgets/breadcrumb'
import BoardFooter from '../ui/board-footer'
import BoardHeader from '../ui/board-header'
import CommentList from '../ui/comment'
import PostLike from '../ui/like/post-like'
import Post from '../ui/post'
import PostView from '../ui/view'

interface IParams {
   params: {
      category: string
      postId: string
   }
   searchParams: { page: string }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
   const { category, postId } = await params

   return {
      title: `${postId}번 게시글`,
      description: `${category} 카테고리의 ${postId}번 게시글입니다.`,
   }
}

export default async function Page({ params }: IParams) {
   const { category, postId } = await params

   if (!category || !postId) redirect(ROUTE_BOARD)

   // postId가 숫자가 아닌 경우 처리
   if (isNaN(Number(postId))) {
      redirect(`/board/${category}`)
   }

   const supabase = await SupabaseServerClient()

   const { data: readData, error: readError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

   if (readError || !readData) {
      return notFound()
   }

   const categoryInfo = await getCategoryInfo(category)

   return (
      <section className="flex flex-col gap-4 my-2">
         <BreadcrumbWidget />
         <PostView {...readData} />
         <PostLike postId={postId} />
         <CommentList postId={postId} />
         <BoardFooter />
         <div>
            <BoardHeader category={categoryInfo} />
            <Post postData={readData} />
         </div>
      </section>
   )
}
