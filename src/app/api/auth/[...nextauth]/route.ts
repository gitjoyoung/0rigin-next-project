import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { fetchLogin } from '@/app/api/auth/login'

interface Credentials {
   id: string
   password: string
}

const handler = NextAuth({
   providers: [
      // 사용자 정의 로그인 프로바이더 설정
      CredentialsProvider({
         // name : 'Credentials'는 필수 값
         name: 'Credentials',
         // id가 null
         credentials: {},
         authorize: async ({ id, password }: Credentials) => {
            const user = await fetchLogin(id, password)
            if (user) {
               return user // Firebase에서 검증한 사용자 정보를 NextAuth.js 세션에 반영
            }
            throw new Error('로그인 실패') // 로그인 실패 시 에러 처리
         },
      }),
   ],
   secret: process.env.JWT_SECRET,
})

export { handler as GET, handler as POST }
