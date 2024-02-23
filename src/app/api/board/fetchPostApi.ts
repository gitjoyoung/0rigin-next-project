/* eslint-disable import/prefer-default-export */
import {
   collection,
   doc,
   getDoc,
   getDocs,
   limit,
   orderBy,
   query,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Post {
   id: string
   nickname: string
   content: string
   createdAt: Date
   number: number
   title: string
   category: string
}

/**
 * 글 전체 목록 가져오기
 * @returns
 */
export const fetchPosts = async () => {
   // 'posts' 컬렉션에 대한 쿼리를 생성합니다.
   // timestamp 필드를 기준으로 내림차순으로 정렬하고, 20개 문서로 제한합니다.
   const postsQuery = query(
      collection(db, 'posts'),
      orderBy('number', 'desc'),
      limit(20),
   )

   try {
      // 쿼리를 실행하여 문서 스냅샷을 가져옵니다.
      const querySnapshot = await getDocs(postsQuery)

      // 각 문서의 데이터를 배열에 저장합니다.
      const posts: Post[] = querySnapshot.docs.map((snapshot) => ({
         id: snapshot.id,
         nickname: snapshot.data().nickname,
         content: snapshot.data().content,
         createdAt: snapshot.data().createdAt.toDate(),
         number: snapshot.data().number,
         title: snapshot.data().title,
         category: 'any', // Include the missing category property
      }))
      console.log('posts : ', posts)
      // 가져온 데이터를 반환하거나 상태에 저장합니다.
      return posts
   } catch (error) {
      console.error('Error fetching posts:', error)
      // 오류 처리를 여기서 수행합니다.
   }
}

/**
 * 특정 게시물의 데이터를 조회합니다.
 * @param {string} postId 조회할 게시물의 ID입니다.
 * @returns {Promise<Object>} 조회된 게시물의 데이터를 반환합니다.
 */
export const fetchPostById = async (postId) => {
   console.log('postId :', postId)
   // 'posts' 컬렉션에서 주어진 postId를 가진 문서에 대한 참조를 생성합니다.
   const postRef = doc(db, 'posts', postId)

   try {
      // 문서 참조를 사용하여 문서 스냅샷을 가져옵니다.
      const docSnap = await getDoc(postRef)

      // 문서가 존재하는 경우, 문서 데이터와 함께 문서 ID를 반환합니다.
      if (docSnap.exists()) {
         const postData = docSnap.data()
         // Post 타입으로 데이터 구성
         const post: Post = {
            id: docSnap.id,
            nickname: postData.nickname,
            content: postData.content,
            createdAt: postData.createdAt.toDate(),
            number: postData.number,
            title: postData.title,
            category: 'any',
         }
         return post
      }
      return null
   } catch (error) {
      // 오류가 발생한 경우, 오류를 콘솔에 기록합니다.
      console.error('Error fetching post:', error)
      throw error // 또는 오류를 호출자에게 전파합니다.
   }
}
