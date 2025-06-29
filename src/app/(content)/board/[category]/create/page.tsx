import { getCategoryBySlug } from '@/entities/category'
import { getProfile } from '@/entities/profile/api/profile-api'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import BoardPostForm from './ui'

export const metadata: Metadata = {
   title: '0rigin 글쓰기',
   description: '0rigin 글쓰기 페이지입니다.',
}

interface IParams {
   params: {
      category: string
   }
}

export default async function Create({ params }: IParams) {
   const { category } = params

   // 카테고리 존재 확인
   const categoryData = await getCategoryBySlug(category)
   if (!categoryData || !categoryData.can_write) {
      redirect('/board/latest')
   }

   const userProfile = await getProfile().catch(() => null)
   const isLoggedIn = !!userProfile

   return <BoardPostForm category={category} userProfile={isLoggedIn} />
}
