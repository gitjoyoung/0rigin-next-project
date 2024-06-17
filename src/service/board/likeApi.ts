import { db } from '@/lib/firebase'
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore'

// 좋아요 싫어요 증가
export const updateReactionCount = async (
   postId: string,
   reactionType: 'like' | 'dislike',
): Promise<{ like: number; dislike: number }> => {
   const postRef = doc(db, 'posts', postId) // 'posts' 컬렉션에서 postId에 해당하는 문서 참조 가져오기

   try {
      await updateDoc(postRef, {
         [reactionType]: increment(1), // 'like' 또는 'dislike' 필드의 현재 값에서 1 증가
      })
      const updatedDoc = await getDoc(postRef)
      if (updatedDoc.exists()) {
         const data = updatedDoc.data()
         return {
            like: data.like || 0, // 데이터에 'like' 필드가 없는 경우 0을 기본값으로 사용
            dislike: data.dislike || 0, // 데이터에 'dislike' 필드가 없는 경우 0을 기본값으로 사용
         }
      }
   } catch (error) {
      console.error(`Error updating ${reactionType}:`, error)
   }
   return { like: 0, dislike: 0 }
}
