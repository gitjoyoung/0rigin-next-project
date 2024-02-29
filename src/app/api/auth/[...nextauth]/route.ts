import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { fetchLogin } from '@/app/api/auth/login'
const handler = NextAuth({
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {},
         authorize: async (credentials: { id: string; password: string }) => {
            const user = await fetchLogin(credentials.id, credentials.password)
            if (user) {
               console.log('user :', user)
               return user // Firebase에서 검증한 사용자 정보를 NextAuth.js 세션에 반영
            }
            throw new Error('로그인 실패') // 로그인 실패 시 에러 처리
         },
      }),
   ],
   callbacks: {
      jwt: async ({ token, user }) => {
         if (user) {
            token.id = user.id // JWT 토큰에 사용자 ID 반영
         }
         return token
      },
      session: async ({ session, token }) => {
         session.user.email = token.email // 세션 정보에 사용자 ID 반영
         session.user.id = token.id // 세션 정보에 사용자 ID 반영
         return session
      },
   },
})

export { handler as GET, handler as POST }
