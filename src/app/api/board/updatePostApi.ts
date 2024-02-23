import {
   doc,
   runTransaction,
   collection,
   serverTimestamp,
   setDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

// 포스트 넘버링
const postNumbering = async () => {
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
// 포스트 추가
const addPost = async (postData, number) => {
   const newPostRef = doc(collection(db, 'posts'))
   const newPostData = {
      ...postData,
      number, // 업데이트된 순번 사용
      createdAt: serverTimestamp(), // 서버 시간을 사용한 타임스탬프
   }
   await setDoc(newPostRef, newPostData)
   return newPostRef.id
}

// 포스트 수정 함수
const editPost = async (postId, updatedData) => {
   const postRef = doc(db, 'posts', postId)
   await updateDoc(postRef, updatedData)
}

// 게시물 삭제 함수
const deletePost = async (postId) => {
   const postRef = doc(db, 'posts', postId)
   await deleteDoc(postRef)
}

// 생성 핸들링 함수
const updatePost = async (postData) => {
   try {
      // 현재 최신 글 순번 가져오기
      const postNumber = await postNumbering()
      // 게시물 업로드 Firestore에 저장
      const postId = await addPost(postData, postNumber)
      return postId
   } catch (e) {
      return null
   }
}

export default updatePost
