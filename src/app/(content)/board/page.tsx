import { SupabaseServerClient } from '@/lib/supabase/supabase-server-client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BoardFooter from './ui/board-footer'
import CustomPagination from './ui/pagination/custom-pagination'
import Post from './ui/post'

interface Post {
   id: number
   title: string
   content: string
   created_at: string
   // 필요한 다른 필드들...
}

interface Params {
   searchParams: { page: string }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
   searchParams,
}: Params): Promise<Metadata> {
   const { page } = searchParams
   if (page) return { title: `게시판 ${page} Page` }
   return { title: '게시판' }
}

const POST_PER_PAGE = 20

export default async function Page({ searchParams }: Params) {
   const { page } = searchParams
   const currentPage: number = Number(page) || 1

   const supabase = await SupabaseServerClient()

   // 전체 게시물 수 조회
   const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })

   if (!count) {
      return notFound()
   }

   // 현재 페이지의 게시물 조회
   const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false })
      .range((currentPage - 1) * POST_PER_PAGE, currentPage * POST_PER_PAGE - 1)

   if (error) {
      console.error('게시물 조회 중 오류 발생:', error)
      return notFound()
   }

   return (
      <section className="flex flex-col gap-4 mb-10">
         <Post postData={posts || []} />
         <CustomPagination currentPage={currentPage} baseRoute="/board" />
         <BoardFooter />
      </section>
   )
}
