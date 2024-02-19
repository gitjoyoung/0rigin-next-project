import { auth } from '@/lib/firebase'
import {  createUserWithEmailAndPassword } from 'firebase/auth'
type UserData = {
   userid: string
   password: string
   gender: string
}
/**
 * 회원가입 요청
 * @param userData
 */
const fetchSignUp = async (userData: UserData) => {
   console.log('실행')
   try {
      await createUserWithEmailAndPassword(
         auth,
         userData.userid,
         userData.password,
      ).then((userCredential) => {
         const { user } = userCredential
         console.log(user)
      })
      console.log('서버 통신 성공')
   } catch (error) {
      console.log(error, ' 실패 :회원가입에 실패 하였습니다.')
   }
}

export default fetchSignUp
