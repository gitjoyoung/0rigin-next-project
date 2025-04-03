import { apiMethods } from '@/shared/api/methods'
import { TickerCounts } from '@/widgets/ticker/model/types'

export const getCountStats = async (): Promise<TickerCounts> => {
   const response =
      await apiMethods.get<Array<{ id: string; count: number }>>('count')
   // 초기값 설정
   const results: TickerCounts = {
      post: 0,
      visit: 0,
      user: 0,
   }
   // 응답 데이터를 TickerCounts 형식으로 변환
   response.data.forEach((item) => {
      if (item.id in results) {
         results[item.id as keyof TickerCounts] = item.count
      }
   })
   return results
}
