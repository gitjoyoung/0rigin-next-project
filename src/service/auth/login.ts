import { auth } from '@/lib/firebase'
import { Login } from '@/types/authTypes'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const fetchLogin = async (
   email: string,
   password: string,
): Promise<Login | null> => {
   return await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
         const user = userCredential.user
         // 필요한 경우 userCredential.user에서 Login 타입 객체로 변환
         const accessToken = await user.getIdToken()
         const loginResult: Login = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
            accessToken,
         }
         return loginResult // 로그인 성공 시 Login 객체 반환
      })
      .catch((error) => {
         return null // 오류 발생 시 null 반환
      })
}

export const fetchLogout = async (): Promise<void> => {
   return await signOut(auth)
      .then(() => {
         console.log('로그아웃 성공')
      })
      .catch((error) => {
         console.error(`로그아웃 요청 오류: ${error}`)
      })
}
