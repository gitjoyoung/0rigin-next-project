import { db } from '@/lib/firebase'
import { TickerCounts } from '@/types/tickerTypes'
import { collection, getDocs } from 'firebase/firestore'

// 카운트 정보 가져오기
export const getStats = async (): Promise<TickerCounts> => {
   const countCollectionRef = collection(db, 'count')
   const snapshot = await getDocs(countCollectionRef)
   const results: TickerCounts = {
      post: 0,
      visit: 0,
      user: 0,
   }

   snapshot.docs.forEach((document) => {
      results[document.id as keyof TickerCounts] = document.data().count
   })

   return results
}
