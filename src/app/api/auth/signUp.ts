import { auth, db } from '@/lib/firebase'
import { UserData } from '@/types/authTypes'
import {
   UserCredential,
   createUserWithEmailAndPassword,
   fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

// 회원가입 시 추가 정보 저장
const addUserDatabase = (userId, additionalUserData): Promise<void> => {
   return addDoc(collection(db, 'users'), {
      uid: userId,
      ...additionalUserData,
   })
}

/**
 * 회원가입 요청
 * @param userData
 */
export const fetchSignUp = (userData: UserData): Promise<any> => {
   return createUserWithEmailAndPassword(
      auth,
      userData.userid,
      userData.password,
   )
      .then((userCredential) => {
         const { user } = userCredential
         addUserDatabase(user.uid, userData)
         return user
      })
      .catch((error) => {
         console.log(error, ' 실패 :회원가입에 실패 하였습니다.')
         return null
      })
}
export const checkEmailDuplicate = (
   userId,
): Promise<UserCredential | boolean> => {
   const email = userId.includes('@') ? userId : `${userId}@0rigin.com`
   return fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
         return signInMethods.length > 0
      })
      .catch((error) => {
         console.error('Error checking email duplication: ', error)
         throw error
      })
}
