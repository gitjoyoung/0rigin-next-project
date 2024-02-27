/* eslint-disable import/prefer-default-export */
import { db } from '@/lib/firebase'
import {
   collection,
   doc,
   serverTimestamp,
   setDoc,
   updateDoc,
   deleteDoc,
   getDocs,
   query,
   orderBy,
} from 'firebase/firestore'

// 댓글 추가
export const addComment = async (postId, commentData) => {
   const commentRef = doc(collection(db, 'comment', postId, 'comments'))
   const newCommentData = {
      ...commentData,
      createdAt: serverTimestamp(),
   }
   await setDoc(commentRef, newCommentData)
   return commentRef.id
}

// 댓글 수정
export const updateComment = async (postId, commentId, updatedData) => {
   const commentRef = doc(
      collection(db, 'comment', postId, 'comments', commentId),
   )
   await updateDoc(commentRef, updatedData)
}

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
   const commentRef = doc(
      collection(db, 'comment', postId, 'comments', commentId),
   )
   await deleteDoc(commentRef)
}

// 댓글 보기
export const getComments = async (postId) => {
   const commentsRef = collection(db, 'comment', postId, 'comments')
   const q = query(commentsRef, orderBy('createdAt', 'asc')) // 'createdAt' 필드로 내림차순 정렬
   const querySnapshot = await getDocs(q)
   const comments = []

   if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
         comments.push({ id: doc.id, ...doc.data() })
      })
   }

   return comments
}
