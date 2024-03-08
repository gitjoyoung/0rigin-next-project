/* eslint-disable import/prefer-default-export */
import {
   collection,
   doc,
   getDoc,
   getDocs,
   limit,
   orderBy,
   query,
   startAt,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Post } from '@/types/boardTypes'

/**
 * 최신 글 20개의 목록 가져오기
 * @returns
 */
export const fetchPosts = async (lastDocSnapshot = 1) => {
   const postsQuery = query(
      collection(db, 'posts'),
      orderBy('number', 'asc'),
      startAt(lastDocSnapshot),
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
         category: snapshot.data().category, // Include the missing category property
      }))

      // 가져온 데이터를 반환하거나 상태에 저장합니다.
      return posts.reverse()
   } catch (error) {
      console.error('Error fetching posts:', error)
      // 오류 처리를 여기서 수행합니다.
      return null
   }
}

/**
 * 단일 게시물의 데이터를 조회합니다.
 * @param {string} postID 조회할 게시물의 ID입니다.
 * @returns {Promise<Object>} 조회된 게시물의 데이터를 반환합니다.
 */
export const fetchPostById = async (postID: string): Promise<Post | null> => {
   // 'posts' 컬렉션에서 주어진 postID를 가진 문서에 대한 참조를 생성합니다.
   const postRef = doc(db, 'posts', postID)

   try {
      // 문서 참조를 사용하여 문서 스냅샷을 가져옵니다.
      const docSnap = await getDoc(postRef)

      // 문서가 존재하는 경우, 문서 데이터와 함께 문서 ID를 반환합니다.
      if (docSnap.exists()) {
         const postData = docSnap.data()
         const createdAt = postData.createdAt.toDate()
         return {
            id: docSnap.id,
            nickname: postData.nickname,
            content: postData.content,
            number: postData.number,
            title: postData.title,
            createdAt,
         }
      }
      return null
   } catch (error) {
      console.error('Error fetching post:', error)
      throw error // 또는 오류를 호출자에게 전파합니다.
   }
}

/**
 * 배너 영역에 들어갈 추천 게시물 가져오기
 * @param {string} condition 특정 조건
 * @returns {Promise<Post[]>} 조건에 맞는 게시물 배열을 반환합니다.
 */
export const fetchTopPosts = async () => {
   // 'posts' 컬렉션에 대한 쿼리를 생성합니다.
   // 특정 조건을 추가하고, 5개 문서로 제한합니다.
   // desc 내림차순은 큰 숫자부터 작은 숫자로 정렬
   const postsQuery = query(
      collection(db, 'posts'),
      orderBy('like', 'desc'),
      limit(5),
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
         category: snapshot.data().category,
      }))
      // 가져온 데이터를 반환하거나 상태에 저장합니다.
      return posts
   } catch (error) {
      console.error('Error fetching posts:', error)
      // 오류 처리를 여기서 수행합니다.
      return null
   }
}
