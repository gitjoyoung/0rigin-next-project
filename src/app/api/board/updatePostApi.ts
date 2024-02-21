import {
   doc,
   runTransaction,
   collection,
   serverTimestamp,
   setDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

/**
 * 현재글이 몇번째 글인지 순번 계산
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

export const updatePost = async (postData) => {
   try {
      // 현재 최신 글 순번 가져오기
      const postNumber = await updateCounterAndGetNumber()

      // 게시물 업로드 Firestore에 저장
      const postId = await addPostDataWithNumber(postData, postNumber)

      console.log(
         `Post added successfully with ID: ${postId} and Number: ${postNumber}`,
      )
      return postNumber
   } catch (e) {
      console.error('Failed to add post with numbering: ', e)
   }
}
