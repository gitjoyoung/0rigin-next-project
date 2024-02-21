/* eslint-disable import/prefer-default-export */
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { time } from 'console'

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
      const posts = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
         createdAt: doc.data().createdAt.toDate(),
      }))
      console.log('posts : ', posts)
      // 가져온 데이터를 반환하거나 상태에 저장합니다.
      return posts
   } catch (error) {
      console.error('Error fetching posts:', error)
      // 오류 처리를 여기서 수행합니다.
   }
}
