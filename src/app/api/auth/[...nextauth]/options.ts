import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { fetchLogin } from '../login'
import { signInSchema } from '../Schema/signInSchema'

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
         authorize: async (credentials: Credentials) => {
            const { id, password } = await signInSchema.parseAsync(credentials)
            const user = await fetchLogin(id, password)
            if (user) {
               return user
            }
            return null // 로그인 실패 시 에러 처리
         },
      }),
   ],
   callbacks: {
      session: async ({ session, token }) => {
         if (token) {
            session.user.id = token?.id
            session.user.nickname = token?.nickname
         }
         return session
      },
      jwt: async ({ token, user }) => {
         if (user) {
            token.id = user.id
            token.nickname = user.nickname
         }
         return token
      },
   },
   secret: process.env.JWT_SECRET,
}
