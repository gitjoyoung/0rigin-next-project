import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import UpdatePostForm from '../ui'

interface IParams {
   params: {
      id: string
      category: string
   }
}

export const metadata: Metadata = {
   title: '0rigin 게시물 수정',
   description: '게시물 수정하기.',
}

export default async function Update({ params }: IParams) {
   const { id: postId, category } = params

   if (!category || !postId) {
      redirect('/board/all')
   }

   const supabase = await SupabaseServerClient()

   const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

   if (error || !post) {
      return notFound()
   }

   return <UpdatePostForm category={category} post={post} postId={postId} />
}
