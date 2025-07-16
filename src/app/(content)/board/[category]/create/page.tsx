import { getCategoryBySlug } from '@/entities/category'
import { getProfile } from '@/entities/profile/api/profile-api'
import PostCreateWidget from '@/widgets/board/post/post-create/ui'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface IParams {
   params: {
      category: string
   }
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
   const { category } = await params

   return {
      title: `${category} 게시글 작성`,
      description: `0RIGIN(제로리진) 커뮤니티 ${category} 게시글 작성 페이지입니다.`,
   }
}

export default async function Create({ params }: IParams) {
   const { category } = await params

   const categoryData = await getCategoryBySlug(category)
   if (!categoryData || !categoryData.can_write) {
      redirect('/board/latest')
   }
   const userProfile = await getProfile().catch(() => null)

   return (
      <div className="flex flex-col gap-2 my-2">
         <h1 className="text-2xl px-2 font-bold">{category} 글쓰기</h1>
         <PostCreateWidget category={category} userProfile={userProfile} />
      </div>
   )
}
