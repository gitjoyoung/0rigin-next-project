import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from './schema/auth'
import saltAndHashPassword from './utils/authValidators/password'
import { ZodError } from 'zod'
import { fetchSignIn } from './service/auth/fetchSignIn'

interface Credentials {
   email: string
   password: string
}

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
      Credentials({
         // 인증에 필요한 필드 정의
         credentials: {
            email: { label: 'Email' },
            password: { label: 'Password', type: 'password' },
         },
         // 사용자 인증 로직
         authorize: async (credentials) => {
            try {
               // 입력값 검증
               const { email, password } =
                  await signInSchema.parseAsync(credentials)

               // 비밀번호 해시화
               const pwHash = saltAndHashPassword(password)

               // DB에서 사용자 조회
               const user = await fetchSignIn(email, pwHash)

               if (!user) {
                  throw new Error('해당 회원의 정보가 없습니다.')
               }

               return user
            } catch (error) {
               // Zod 검증 에러 처리
               if (error instanceof ZodError) {
                  throw new Error('검증 오류: ' + error.errors[0].message)
               }
               throw new Error('통신 실패: ' + error.message)
            }
         },
      }),
   ],
   callbacks: {
      // 로그인 성공 여부 확인
      async signIn({ user }) {
         return !!user.email
      },
      // JWT 토큰에 사용자 정보 추가
      async jwt({ token, user }) {
         if (user) {
            token.email = user.email
         }
         return token
      },
      // 세션에 사용자 정보 추가
      async session({ session, token }) {
         session.user.email = token.email
         return session
      },
   },
})
