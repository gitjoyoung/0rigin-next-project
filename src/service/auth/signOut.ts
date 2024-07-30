import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

export const fetchLogout = async (): Promise<void> => {
   return await signOut(auth)
      .then(() => {
         console.log('로그아웃 성공')
      })
      .catch((error) => {
         console.error(`로그아웃 요청 오류: ${error}`)
      })
}
