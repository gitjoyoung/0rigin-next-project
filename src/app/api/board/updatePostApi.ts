import {
   doc,
   runTransaction,
   collection,
   serverTimestamp,
   setDoc,
   updateDoc,
   deleteDoc,
   getDocs,
   orderBy,
   query,
   limit,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { CreatePostData } from '@/types/boardTypes'

// 포스트 넘버링
const postNumbering = async (): Promise<number> => {
   try {
      const postsQuery = query(
         collection(db, 'posts'),
         // createdAt 기준으로 내림차순 정렬하여 가장 최신 게시물의 순번을 가져옴
         orderBy('createdAt', 'desc'),
         limit(1),
      )
      const counterSnapshot = await getDocs(postsQuery)
      if (!counterSnapshot.empty) {
         const numberAsString = counterSnapshot.docs[0].data().number
         // 반환값이 문자열이므로 숫자로 변환하여 반환
         const number = parseInt(numberAsString, 10)
         return number
      }
      return 0
   } catch (error) {
      console.error('postNumbering 통신 중 오류 발생:', error)
      throw new Error('postNumbering 통신 중 오류 발생')
   }
}

// 포스트 추가
const addPost = async (postData: CreatePostData, number: number) => {
   console.log('addPost postData', postData)
   console.log('addPost number', number)
   const incrementedNumber = number + 1
   console.log(incrementedNumber)
   const newPostRef = doc(collection(db, 'posts'), incrementedNumber.toString())

   const newPostData = {
      ...postData,
      number: incrementedNumber, // 업데이트된 순번 사용
      createdAt: serverTimestamp(), // 서버 시간을 사용한 타임스탬프
   }
   try {
      await setDoc(newPostRef, newPostData)
      return newPostRef.id
   } catch (error) {
      console.error('addPost 통신 중 오류 발생:', error)
      throw new Error('addPost 통신 중 오류 발생')
   }
}
// 글 생성 핸들링 함수
export const updatePost = async (postData): Promise<string> => {
   const postNumber = await postNumbering()
   // 게시물 업로드 Firestore에 저장
   const postId = await addPost(postData, postNumber)
   return postId
}

// 게시물 수정 함수
export const editPost = async (postId, updatedData) => {
   const postRef = doc(db, 'posts', postId)
   await updateDoc(postRef, updatedData)
}

// 게시물 삭제 함수
export const deletePost = async (postId) => {
   const postRef = doc(db, 'posts', postId)
   await deleteDoc(postRef)
}
