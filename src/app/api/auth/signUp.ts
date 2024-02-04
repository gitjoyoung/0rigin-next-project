import axios from 'axios'

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
   try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}users`, userData)
   } catch (error) {
      console.log('실패 :회원가입에 실패 하였습니다.')
   }
}

export default fetchSignUp
