import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

interface Login {
   id: string
   name: string
   email: string
}
/**
 * 로그인 요청 통신 함수
 * @param userId
 * @param password
 */
export const fetchLogin = (userId, password): Promise<Login | null> => {
   const email = userId.includes('@') ? userId : `${userId}@0rigin.com`
   console.log('fetchLogin data :', userId, email, password)

   return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         console.log(userCredential)
         // 필요한 경우 userCredential.user에서 Login 타입 객체로 변환
         const loginResult: Login = {
            email: userCredential.user.email,
            id: userCredential.user.uid,
            name: userCredential.user.displayName || '사용자 이름',
         }
         return loginResult // 로그인 성공 시 Login 객체 반환
      })
      .catch((error) => {
         console.error(`로그인 요청 오류: ${error}`)
         return null // 오류 발생 시 null 반환
      })
}

export const fetchLogout = () => {
   return signOut(auth)
      .then(() => {
         console.log('로그아웃 성공')
      })
      .catch((error) => {
         console.error(`로그아웃 요청 오류: ${error}`)
      })
}
