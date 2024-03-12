import { db } from '@/lib/firebase'
import { TickerCounts } from '@/types/tickerTypes'
import {
   collection,
   doc,
   getDocs,
   increment,
   updateDoc,
} from 'firebase/firestore'

export const fetchTickerCounts = async (): Promise<TickerCounts> => {
   const countCollectionRef = collection(db, 'count')
   const snapshot = await getDocs(countCollectionRef)
   const results: TickerCounts = {
      post: { count: 0 },
      visit: { count: 0 },
      user: { count: 0 },
   }

   snapshot.docs.forEach((document) => {
      results[document.id as keyof TickerCounts] = {
         count: document.data().count,
      }
   })

   return results
}

export const updateIncrementCount = async (category: string): Promise<void> => {
   const infoRef = doc(db, 'count', category)
   try {
      await updateDoc(infoRef, { count: increment(1) }) // count 필드에 1을 더함
   } catch (error) {
      console.error('Error updating document: ', error)
      throw new Error(error)
   }
}
