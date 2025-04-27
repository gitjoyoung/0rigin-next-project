import { ROUTE_BOARD } from '@/constants/pathname'
import { SupabaseServerClient } from '@/lib/supabase/supabase-server-client'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import BoardFooter from '../ui/board-footer'
import CommentList from '../ui/comment'
import CustomPagination from '../ui/pagination/custom-pagination'
import Post from '../ui/post'
import PostRead from '../ui/read'
interface IParams {
   params: {
      id: string
   }
   searchParams: { page: string }
}

export async function generateMetadata({
   params,
   searchParams,
}: IParams): Promise<Metadata> {
   const { id } = await params
   const { page } = await searchParams
   if (page === undefined) return { title: `${id}번 게시글` }
   return {
      title: `${id}번 게시글 ${page} 페이지 `,
      description: `게시글 ${id}번의 ${page} 페이지 입니다.`,
   }
}

export default async function Page({ params, searchParams }: IParams) {
   const { id } = await params
   if (id === undefined) redirect(ROUTE_BOARD)
   const { page } = await searchParams
   const currentPage: number = Number(page) || 1
   const POST_PER_PAGE = 20

   const supabase = await SupabaseServerClient()

   const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false })
      .range((currentPage - 1) * POST_PER_PAGE, currentPage * POST_PER_PAGE - 1)

   const { data: readData, error: readError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

   if (readError) {
      throw new Error(readError.message)
   }

   return (
      <section className="flex flex-col gap-4">
         <PostRead {...readData} />
         <CommentList postId={id} />
         <Post postData={posts} />
         <BoardFooter />
         <CustomPagination
            currentPage={currentPage}
            baseRoute={`/board/${id}`}
         />
      </section>
   )
}
