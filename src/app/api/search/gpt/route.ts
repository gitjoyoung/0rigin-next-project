import { getGptReply } from '@/service/gpt/getGptReply'

export const gptFetchGpt = async (keyword) =>
   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search/gpt/`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword }),
   })

export async function POST(request: Request) {
   const { keyword } = await request.json()
   if (!keyword) {
      return Response.json({ error: '검색어가 없습니다.' })
   }
   const system =
      '철학 문제에 대한 답변을 요청합니다. 답변은 100자 미만 입니다.'
   const stream = false

   try {
      const response = await getGptReply(system, keyword, stream)
      const data = response.choices[0].message.content
      console.log(data)
      return Response.json(data)
   } catch (error) {
      return Response.json('답변을 찾을 수 없습니다.')
   }
}
