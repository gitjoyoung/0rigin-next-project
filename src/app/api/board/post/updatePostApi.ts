import {
   doc,
   collection,
   serverTimestamp,
   setDoc,
   updateDoc,
   deleteDoc,
   getDocs,
   orderBy,
   query,
   limit,
   increment,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { CreatePostData } from '@/types/boardTypes'
import { updateIncrementCount } from '../tickerApi'

// 포스트 마지막 순번 가져오기
const fetchLastPostIndex = async (): Promise<number> => {
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
         const lastPostNumber = parseInt(numberAsString, 10)
         return lastPostNumber
      }
      return 0
   } catch (error) {
      console.error('postNumbering 통신 중 오류 발생:', error)
      throw new Error('postNumbering 통신 중 오류 발생')
   }
}

// 포스트 추가
const updateAddPost = async (
   postData: CreatePostData,
   number: number,
): Promise<string> => {
   const incrementedNumber = number + 1
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
export const createPost = async (postData: CreatePostData): Promise<string> => {
   const postNumber = await fetchLastPostIndex()
   // 게시물 업로드 Firestore에 저장
   const postId = await updateAddPost(postData, postNumber)
   await updateIncrementCount('post')

   return postId
}

// 포스트 기존 글 수정 함수
export const updateEditPost = async (
   postId: string,
   updatedData: Partial<CreatePostData>,
): Promise<void> => {
   const postRef = doc(db, 'posts', postId)
   await updateDoc(postRef, updatedData)
}

// 포스트 삭제 함수
export const updateDeletePost = async (postId: string): Promise<void> => {
   const postRef = doc(db, 'posts', postId)
   await deleteDoc(postRef)
}

// 조회수 증가 함수
export const updateIncreaseViews = async (postId: string): Promise<void> => {
   const postRef = doc(db, 'posts', postId)
   await updateDoc(postRef, {
      views: increment(1), // Increase views by 1
   })
}
