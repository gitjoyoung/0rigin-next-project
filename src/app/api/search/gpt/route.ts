async function gptFetchGpt(keyword: string) {
   return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search/gpt/`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword }),
   })
}

// API Route에서 사용 가능
export async function POST(request: Request) {
   const { keyword } = await request.json()
   if (!keyword) {
      return Response.json({ error: '검색어가 없습니다.' })
   }
   try {
      const response = await gptFetchGpt(keyword)
      const data = await response.json()
      return Response.json({ data })
   } catch (error) {
      return Response.json({ error: '답변을 찾을 수 없습니다.' })
   }
}
