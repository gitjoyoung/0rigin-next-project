import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import BoardFooter from './ui/board-footer'
import CustomPagination from './ui/pagination/custom-pagination'
import PostList from './ui/post'

interface Params {
   params: {
      id: string
   }
   searchParams: { page: string }
}

export async function generateMetadata({
   searchParams,
}: Params): Promise<Metadata> {
   const { page } = await searchParams
   if (page) return { title: `게시판 ${page} Page` }
   return { title: '게시판' }
}

const POST_PER_PAGE = 20
export default async function Page({ searchParams }: Params) {
   const { page } = await searchParams
   const currentPage: number = Number(page) || 1

   const supabase = await createClient()

   const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
   const totalPages = Math.ceil((count || 0) / POST_PER_PAGE)

   const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false })
      .range((currentPage - 1) * POST_PER_PAGE, currentPage * POST_PER_PAGE - 1)

   if (error) {
      throw new Error(error.message)
   }

   return (
      <main>
         <section className="flex flex-col gap-4 mb-10">
            <PostList postData={posts || []} />
            <BoardFooter />
            <CustomPagination
               totalPages={totalPages}
               currentPage={currentPage}
            />
         </section>
      </main>
   )
}

export const revalidate = 0
