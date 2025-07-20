import { searchQuizzes } from '@/entities/quiz'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import SearchBoard from './ui'
import SearchPagination from './ui/search-pagination'

export default async function page({
   params,
}: {
   params: Promise<{ slug: string[] }>
}) {
   const { slug } = await params
   const keyword = decodeURIComponent(slug[0] || '')
   const activePage = parseInt(slug[1] || '1')
   const offset = (activePage - 1) * 5

   const supabase = await SupabaseServerClient()

   // 게시글 검색
   const { count: postCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .ilike('title', `%${keyword}%`)

   const { data: postSearchResult, error: postError } = await supabase
      .from('posts')
      .select('*')
      .ilike('title', `%${keyword}%`)
      .order('created_at', { ascending: false })
      .range(offset, offset + 4)
      .limit(5)

   // 퀴즈 검색
   const { data: quizSearchResult, count: quizCount } = await searchQuizzes(
      keyword,
      5,
      offset,
   )

   if (postError) {
      return (
         <div className="w-full h-[500px] flex items-center justify-center m-auto">
            <div className="flex flex-col items-center justify-center">
               <h1 className="text-2xl font-bold">
                  검색 중 오류가 발생했습니다.
               </h1>
               <p className="text-sm text-muted-foreground">
                  {postError.message}
               </p>
            </div>
         </div>
      )
   }

   const totalCount = (postCount || 0) + (quizCount || 0)

   return (
      <div className="my-2 space-y-3">
         <SearchBoard
            postSearchResult={postSearchResult}
            quizSearchResult={quizSearchResult}
            keyword={keyword}
            postCount={postCount ?? 0}
            quizCount={quizCount}
            totalCount={totalCount}
         />
         <div className="flex items-center my-12">
            <SearchPagination
               totalItemCount={totalCount}
               activePage={activePage}
               paginationBaseUrl={`/search/${keyword}`}
            />
         </div>
      </div>
   )
}
