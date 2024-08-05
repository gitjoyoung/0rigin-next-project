import { db } from '@/lib/firebase'
import {
   collection,
   query,
   getDocs,
   startAt,
   orderBy,
   endAt,
} from 'firebase/firestore'

export default async function fetchSearch(search: string): Promise<any> {
   try {
      const postsRef = collection(db, 'posts') // 'posts' 컬렉션을 참조
      // 검색어를 사용하여 쿼리를 생성
      const q = query(
         postsRef,
         orderBy('title'), // 제목 정렬
         startAt(search),
         endAt(`${search}\uf8ff`), // Use template literals for string concatenation
      )
      // 쿼리 실행
      const querySnapshot = await getDocs(q)

      // 쿼리 결과를 배열로 변환하여 반환
      return querySnapshot.docs.map((doc) => ({
         id: doc.id, // 문서 ID
         title: doc.data().title, // 문서의 title 속성
         content: doc.data().content, // 문서의 content 속성
         createdAt: doc.data().createdAt, // 문서의 createdAt 속성
      }))
   } catch (error) {
      return []
   }
}
