import {
   doc,
   runTransaction,
   collection,
   getDocs,
   serverTimestamp,
   setDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

/**
 * 카운터 업데이트 및 순번 계산
 * @param db
 * @returns
 */
const updateCounterAndGetNumber = async () => {
   const counterRef = doc(db, 'counters', 'postsCounter')
   const newCount = await runTransaction(db, async (transaction) => {
      const counterSnap = await transaction.get(counterRef)
      let currentCount = 0
      if (!counterSnap.exists()) {
         transaction.set(counterRef, { count: 1 })
         currentCount = 1
      } else {
         currentCount = counterSnap.data().count + 1
         transaction.update(counterRef, { count: currentCount })
      }
      return currentCount
   })
   return newCount
}
const addPostDataWithNumber = async (postData, number) => {
   const newPostRef = doc(collection(db, 'posts'))
   const newPostData = {
      ...postData,
      number, // 업데이트된 순번 사용
      createdAt: serverTimestamp(), // 서버 시간을 사용한 타임스탬프
   }
   await setDoc(newPostRef, newPostData)
   return newPostRef.id
}

export const firebaseFetchData = async (postData) => {
   try {
      // 카운터 업데이트 및 순번 계산
      const number = await updateCounterAndGetNumber()

      // 게시물 데이터 Firestore에 저장
      const postId = await addPostDataWithNumber(postData, number)

      console.log(
         `Post added successfully with ID: ${postId} and Number: ${number}`,
      )
   } catch (e) {
      console.error('Failed to add post with numbering: ', e)
   }
}

export const firebaseFetchRes = () => async () => {
   const querySnapshot = await getDocs(collection(db, 'posts'))
   querySnapshot.forEach((item) => {
      console.log(`${item.id} => ${JSON.stringify(item.data())}`)
   })
}
