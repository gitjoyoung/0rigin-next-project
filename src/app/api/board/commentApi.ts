/* eslint-disable import/prefer-default-export */
import { db } from '@/lib/firebase'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'

// 댓글 추가
export const addComment = async (postId, commentData) => {
   const commentRef = doc(collection(db, 'posts', postId, 'comments'))
   const newCommentData = {
      ...commentData,
      createdAt: serverTimestamp(),
   }
   await setDoc(commentRef, newCommentData)
   return commentRef.id
}
