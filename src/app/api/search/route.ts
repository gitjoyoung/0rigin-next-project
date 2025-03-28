import fetchSearch from '@/service/search/search'

export async function POST(request: Request) {
   const { keyword } = await request.json()
   if (!keyword) {
      return Response.json('검색어가 없습니다.')
   }
   try {
      const response = await fetchSearch(keyword)
      return Response.json(response)
   } catch (error) {
      return Response.json('통신에 문제가 있습니다.')
   }
}
