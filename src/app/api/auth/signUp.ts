import { auth } from '@/lib/firebase'
import {
   createUserWithEmailAndPassword,
   fetchSignInMethodsForEmail,
} from 'firebase/auth'

type UserData = {
   userid: string
   password: string
   gender: string
}

/**
 * 회원가입 요청
 * @param userData
 */
export const fetchSignUp = (userData: UserData) => {
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
export const checkEmailDuplicate = (userId) => {
   const email = userId.includes('@') ? userId : `${userId}@0rigin.com`
   return fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
         // signInMethods 배열이 비어있지 않다면, 해당 이메일로 가입할 수 있는 방법이 존재한다는 의미입니다.
         // 즉, 이미 해당 이메일로 가입된 사용자가 있다는 것을 의미합니다.
         return signInMethods.length > 0
      })
      .catch((error) => {
         console.error('Error checking email duplication: ', error)
         // 에러 처리 로직
         throw error
      })
}
