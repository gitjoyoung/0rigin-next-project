/* eslint-disable import/prefer-default-export */
import { db } from '@/lib/firebase'
import { CommentData, CreateCommentData } from '@/types/commentTypes'
import formatCustomDate from '@/utils/boardValidators/formatCustomDate'
import {
   collection,
   doc,
   serverTimestamp,
   deleteDoc,
   getDocs,
   query,
   orderBy,
   addDoc,
} from 'firebase/firestore'

// 댓글 추가
export const addComment = async (
   postId: string,
   commentData: CreateCommentData,
): Promise<string> => {
   const commentsCollectionRef = collection(db, 'comments', postId, 'comments')
   const newCommentData = {
      ...commentData,
      createdAt: serverTimestamp(), // 서버 타임스탬프로 createdAt 필드 설정
   }
   // `addDoc` 함수를 사용하여 새 댓글 데이터를 컬렉션에 추가합니다.
   const docRef = await addDoc(commentsCollectionRef, newCommentData)
   return docRef.id // 생성된 댓글 문서의 ID를 반환합니다.
}

// 댓글 삭제
export const deleteComment = async (
   postId: string,
   commentId: string,
): Promise<void> => {
   const commentRef = doc(
      collection(db, 'comments', postId, 'comments', commentId),
   )
   try {
      await deleteDoc(commentRef)
   } catch (error) {
      console.error('Error removing document: ', error)
   }
}

// 댓글 가져오기
export const fetchComments = async (postId): Promise<CommentData[]> => {
   const commentsCollectionRef = collection(db, 'comments', postId, 'comments')
   const q = query(commentsCollectionRef, orderBy('createdAt', 'asc')) // 'createdAt' 필드로 오름차순 정렬
   const querySnapshot = await getDocs(q)
   const comments = []

   if (querySnapshot.size > 0) {
      querySnapshot.forEach((res) => {
         const data = res.data()
         comments.push({
            id: res.id,
            ...data,
            createdAt: formatCustomDate(data.createdAt?.toDate()),
         })
      })
   }

   return comments
}

// 댓글 수 가져오기
export const getCommentCount = async (
   postId: string,
): Promise<number | null> => {
   const commentsCollectionRef = collection(db, 'comments', postId, 'comments')
   const querySnapshot = await getDocs(commentsCollectionRef)
   return querySnapshot.size || null
}
