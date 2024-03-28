import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { fetchLogin } from '../login'

interface Credentials {
   id: string
   password: string
}

export const options: NextAuthOptions = {
   providers: [
      // 사용자 정의 로그인 프로바이더 설정
      CredentialsProvider({
         // name : 'Credentials'는 필수 값
         name: 'Credentials',
         // id가 null
         credentials: {
            id: { label: 'ID', type: 'text', placeholder: 'ID' },
            password: { label: 'Password', type: 'password' },
         },
         authorize: async ({ id, password }: Credentials) => {
            const user = await fetchLogin(id, password)
            if (user) {
               return user // Firebase에서 검증한 사용자 정보를 NextAuth.js 세션에 반영
            }
            return null // 로그인 실패 시 에러 처리
         },
      }),
   ],
   secret: process.env.JWT_SECRET,
}
