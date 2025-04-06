import { SupabaseServerClient } from '@/lib/supabase/supabase-server-client'
import SearchBoard from './ui'

interface SearchParams {
   searchParams: {
      keyword: string
   }
}

export default async function page({ searchParams }: SearchParams) {
   const { keyword } = searchParams
   const supabase = await SupabaseServerClient()
   const { data: searchResult, error } = await supabase
      .from('posts')
      .select('*')
      .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)
      .order('created_at', { ascending: false })

   if (error) {
      return <div>검색 중 오류가 발생했습니다.</div>
   }

   return <SearchBoard searchResult={searchResult} />
}
