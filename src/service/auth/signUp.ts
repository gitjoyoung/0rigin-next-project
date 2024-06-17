import { auth, db } from '@/lib/firebase'
import { UserData } from '@/types/authTypes'
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
export const fetchSignUp = (userData: UserData): Promise<string | Error> => {
   return createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
   )
      .then((userCredential) => {
         const userId = userCredential.user.uid
         addUserDatabase(userId, userData)
         return userId
      })
      .catch((error) => {
         const errorObj = new Error()
         switch (error.code) {
            case 'auth/email-already-in-use':
               errorObj.message = '이미 사용 중인 이메일 주소입니다.'
               break
            case 'auth/invalid-email':
               errorObj.message = '유효하지 않은 이메일 주소 형식입니다.'
               break
            case 'auth/weak-password':
               errorObj.message = '비밀번호는 8자 이상이어야 합니다.'
               break
            default:
               errorObj.message = '회원가입에 실패 하였습니다.'
               break
         }
         return errorObj
      })
}
