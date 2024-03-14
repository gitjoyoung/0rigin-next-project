import { db } from '@/lib/firebase'
import { SearchResult } from '@/types/searchTypes'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default async function fetchSearch(
   search: string,
): Promise<SearchResult[]> {
   try {
      const postsRef = collection(db, 'posts') // 'posts' 컬렉션을 참조
      // 검색어를 사용하여 쿼리를 생성
      const q = query(postsRef, where('title', '==', search)) // 'title' 필드가 검색어와 일치하는 문서를 쿼리
      // 쿼리 실행
      const querySnapshot = await getDocs(q)

      // 쿼리 결과를 배열로 변환하여 반환
      return querySnapshot.docs.map((doc) => ({
         id: doc.id, // 문서 ID
         title: doc.data().title, // 문서의 title 속성
         content: doc.data().content, // 문서의 content 속성
         createdAt: doc.data().createdAt, // 문서의 createdAt 속성
      })) as SearchResult[] // Explicitly define the type of the returned array as SearchResult[]
   } catch (error) {
      console.log('error :', error)
      return []
   }
}
