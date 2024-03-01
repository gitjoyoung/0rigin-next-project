import { db } from '@/lib/firebase'
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore'

// 댓글 추가
export const increaseLike = async (postId): Promise<number> => {
   const postRef = doc(db, 'posts', postId) // 'posts' 컬렉션에서 postId에 해당하는 문서 참조 가져오기

   try {
      await updateDoc(postRef, {
         like: increment(1), // 'likes' 필드의 현재 값에서 1 증가
      })
      const updatedDoc = await getDoc(postRef)
      if (updatedDoc.exists()) {
         console.log(' like:', updatedDoc.data().like) // 업데이트된 'like' 필드 값 출력
         return updatedDoc.data().like // 업데이트된 'like' 필드 값 출력
      }
   } catch (error) {
      console.error('Error updating likes:', error)
   }
   return 0 // Add a return statement at the end of the function to return a default value of 0
}

export const increaseDislike = async (postId) => {
   const postRef = doc(db, 'posts', postId) // 'posts' 컬렉션에서 postId에 해당하는 문서 참조 가져오기

   try {
      await updateDoc(postRef, {
         dislike: increment(1), // 'dislikes' 필드의 현재 값에서 1 증가
      })
      const updatedDoc = await getDoc(postRef)
      if (updatedDoc.exists()) {
         console.log(' dislike:', updatedDoc.data()) // 업데이트된 'like' 필드 값 출력
         return updatedDoc.data().dislike
      }
   } catch (error) {
      console.error('Error updating dislikes:', error)
   }
   return 0
}
