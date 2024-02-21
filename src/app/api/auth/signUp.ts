import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

type UserData = {
   userid: string
   password: string
   gender: string
}

/**
 * 회원가입 요청
 * @param userData
 */
const fetchSignUp = (userData: UserData) => {
   return createUserWithEmailAndPassword(
      auth,
      userData.userid,
      userData.password,
   )
      .then((userCredential) => {
         const { user } = userCredential
         return user
      })
      .catch((error) => {
         console.log(error, ' 실패 :회원가입에 실패 하였습니다.')
         // 에러 처리 로직
         return null
      })
}

export default fetchSignUp
