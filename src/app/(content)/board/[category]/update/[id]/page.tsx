import { getCategoryBySlug } from '@/entities/category'
import { getPostById } from '@/entities/post/api'
import { getProfile } from '@/entities/profile/api/profile-api'
import PostUpdateWidget from '@/widgets/board/post/post-update/ui'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface IParams {
   params: {
      category: string
      id: string
   }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
   const { category } = await params

   return {
      title: `${category} 게시글 수정`,
      description: `0RIGIN(제로리진) 커뮤니티 ${category} 게시글 수정 페이지입니다.`,
   }
}
export default async function Update({ params }: IParams) {
   const { category, id: postId } = await params

   // 카테고리 존재 확인
   const categoryData = await getCategoryBySlug(category)
   if (!categoryData || !categoryData.can_write) {
      redirect('/board/latest')
   }

   // 게시글 존재 확인
   const post = await getPostById(Number(postId))
   if (!post) {
      redirect(`/board/${category}`)
   }

   const profile = await getProfile().catch(() => null)

   return (
      <PostUpdateWidget
         category={category}
         profile={profile}
         initialData={post}
      />
   )
}
