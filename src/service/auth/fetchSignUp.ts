import { auth, db } from '@/lib/firebase'
import { UserData } from '@/types/authTypes'
import saltAndHashPassword from '@/utils/authValidators/password'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { DocumentReference, addDoc, collection } from 'firebase/firestore'

// 회원가입 시 추가 정보 저장
const addUserDatabase = (
   userId: string,
   additionalUserData: UserData,
): Promise<DocumentReference> => {
   return addDoc(collection(db, 'users'), {
      uid: userId,
      ...additionalUserData,
   })
}

/**
 * 회원가입 요청
 * @param userData
 */
export const fetchSignUp = (
   email: string,
   password: string,
   gender: string,
): Promise<object> => {
   return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         const userId = userCredential.user.uid
         const pwHash = saltAndHashPassword(password)
         const userData = {
            gender,
            email,
            password: pwHash,
         }
         addUserDatabase(userId, userData)
         return { success: true, userId }
      })
      .catch((error) => {
         switch (error.code) {
            case 'auth/email-already-in-use':
               return {
                  success: false,
                  message: '이미 사용중인 이메일 주소입니다.',
               }
            case 'auth/invalid-email':
               return {
                  success: false,
                  message: '유효하지 않은 이메일 주소입니다.',
               }
            case 'auth/weak-password':
               return {
                  success: false,
                  message: '비밀번호가 너무 약합니다.',
               }
            default:
               return {
                  success: false,
                  message: '알 수 없는 오류가 발생했습니다.',
               }
         }
      })
}
