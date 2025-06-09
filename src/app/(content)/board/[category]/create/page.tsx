import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import BoardPostForm from './ui'

export const metadata: Metadata = {
   title: '0rigin 글쓰기',
}

interface IParams {
   params: {
      category: string
   }
}

export default async function Create({ params }: IParams) {
   const { category } = await params

   // 'all'인 경우 바로 리다이렉트 (DB 조회 불필요)
   if (category === 'all') {
      redirect('/board/all')
   }

   const supabase = await SupabaseServerClient()

   // 실제 카테고리가 존재하는지 확인
   const { data: categoryData, error } = await supabase
      .from('categories')
      .select('slug')
      .eq('slug', category)
      .eq('is_active', true)
      .single()

   const { data: userData } = await supabase.auth.getUser()
   const { user } = userData
   // 카테고리가 존재하지 않으면 게시판 홈으로 리다이렉트
   if (error || !categoryData) {
      redirect('/board/all')
   }

   return <BoardPostForm category={category} user={user} />
}
