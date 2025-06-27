import { getCategoryByName } from '@/entities/post'
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

   // 'latest'인 경우 바로 리다이렉트 (글쓰기는 특정 카테고리에서만 가능)
   if (category === 'latest') {
      redirect('/board/latest')
   }

   // 카테고리 존재 확인
   const categoryData = await getCategoryByName(category)
   if (!categoryData) {
      redirect('/board/latest')
   }

   // 프로필 조회 (로그인된 경우)
   const userProfile = await getProfile().catch(() => null)
   const isLoggedIn = !!userProfile

   return <BoardPostForm category={category} userProfile={isLoggedIn} />
}
