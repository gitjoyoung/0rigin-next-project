import axios from 'axios'

/**
 * 로그인 요청 통신 함수
 * @param userId
 * @param password
 */
const fetchLogin = async (
   userId: string,
   password: string,
): Promise<any | null> => {
   const options = {
      url: `${process.env.NEXT_PUBLIC_API_URL}users?userid=${userId}&password=${password}`,
      method: 'get',
   }
   try {
      const res = await axios(options)
      if (res.data.length > 0) {
         return res.data // 로그인 성공 시 사용자 데이터 반환
      }
      return null // 로그인 실패 시 null 반환
   } catch (error) {
      console.error(`로그인 요청 오류: ${error}`)
      return null // 오류 발생 시 null 반환
   }
}

export default fetchLogin
