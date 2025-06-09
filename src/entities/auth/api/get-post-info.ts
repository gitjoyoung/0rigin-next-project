import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'

// 게시물 정보 조회
// 게시물 페이지네이션 방법이 여러가지가 있는데 현재 오프셋기반 페이지네이션을 사용하고 있다.
// 1. 커서기반 페이지네이션
// 마지막으로 가져온 게시물의 created_at 값을 기준으로 다음 페이지를 조회
//    .order('created_at', {
//       ascending: true,
//    })
//    .limit(20)
// 장점 : 데이터 조회 시 커서를 사용하여 페이지네이션을 구현할 수 있다.
// 단점 : 데이터 조회 시 커서를 사용하여 페이지네이션을 구현할 수 있다.
// 2. 오프셋기반 페이지네이션
// ex : offset(10 , 20) 10부터 20까지 조회
// ex : range(10 , 20) 10부터 20까지 조회
// 장점 : 데이터 조회 시 오프셋을 사용하여 페이지네이션을 구현할 수 있다.
// 단점 : 데이터 조회 시 오프셋을 사용하여 페이지네이션을 구현할 수 있다.
export async function getPostInfo(
   category: string = 'all',
   currentPage: number,
   postPerPage: number,
) {
   const supabase = await SupabaseServerClient()

   // 기본 쿼리 생성 (count도 함께 조회)
   let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

   // 카테고리가 제공된 경우에만 필터 적용
   if (category !== 'all') {
      query = query.eq('category', category)
   }

   // 페이지네이션 적용하면서 count와 data 모두 가져오기
   const { data, error } = await query.range(
      (currentPage - 1) * postPerPage,
      currentPage * postPerPage - 1,
   )

   return {
      data,
      error,
   }
}

// 전체 테이블 개수만 가져오는 별도 함수
export async function getTotalPostCount() {
   const supabase = await SupabaseServerClient()

   const { count, error } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })

   return { count, error }
}
