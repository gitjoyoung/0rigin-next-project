import {
   doc,
   getFirestore,
   updateDoc,
   setDoc,
   getDoc,
   increment,
} from 'firebase/firestore'

// Firebase 초기화 코드는 여기에 위치해야 합니다.
const db = getFirestore()

// 날짜 기반 카운터 업데이트 함수
export const updateDailyVisitCount = async (date: string): Promise<void> => {
   const dailyCountRef = doc(db, 'dailyCounts', date) // "dailyCounts" 컬렉션에서 해당 날짜의 문서 참조

   // 해당 날짜 문서가 있는지 확인
   const docSnap = await getDoc(dailyCountRef)

   if (docSnap.exists()) {
      // 문서가 존재하면 방문 횟수(count) 필드를 1만큼 증가
      await updateDoc(dailyCountRef, { count: increment(1) })
   } else {
      // 문서가 존재하지 않으면 새로운 문서를 생성하고 방문 횟수를 1로 설정
      await setDoc(dailyCountRef, { count: 1 })
   }
}
