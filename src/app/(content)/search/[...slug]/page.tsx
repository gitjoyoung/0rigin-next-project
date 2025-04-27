import { SupabaseServerClient } from '@/lib/supabase/supabase-server-client'
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
   const offset = (activePage - 1) * 20

   const supabase = await SupabaseServerClient()

   const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .ilike('title', `%${keyword}%`)

   const { data: searchResult, error } = await supabase
      .from('posts')
      .select('*')
      .ilike('title', `%${keyword}%`)
      .order('created_at', { ascending: false })
      .range(offset, offset + 19)
      .limit(20)

   if (error) {
      return (
         <div className="w-full h-[500px] flex items-center justify-center m-auto">
            <div className="flex flex-col items-center justify-center">
               <h1 className="text-2xl font-bold">
                  검색 중 오류가 발생했습니다.
               </h1>
               <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
         </div>
      )
   }

   return (
      <div className="my-2 space-y-3">
         <SearchBoard
            searchResult={searchResult}
            keyword={keyword}
            totalCount={count}
         />
         <div className="flex items-center my-12">
            <SearchPagination
               totalItemCount={count}
               activePage={activePage}
               paginationBaseUrl={`/search/${keyword}`}
            />
         </div>
      </div>
   )
}
