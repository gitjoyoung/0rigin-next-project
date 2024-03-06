import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { fetchLogin } from '@/app/api/auth/login'

const handler = NextAuth({
   providers: [
      // 사용자 정의 로그인 프로바이더 설정
      CredentialsProvider({
         name: 'Credentials',
         credentials: {},
         authorize: async (credentials) => {
            const user = await fetchLogin(credentials.id, credentials.password)
            if (user) {
               console.log('user :', user)
               return user // Firebase에서 검증한 사용자 정보를 NextAuth.js 세션에 반영
            }
            throw new Error('로그인 실패') // 로그인 실패 시 에러 처리
         },
      }),
   ],
})

export { handler as GET, handler as POST }
