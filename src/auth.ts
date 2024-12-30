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
   trustHost: true,
   providers: [
      Credentials({
         credentials: {
            email: {
               label: 'Email',
            },
            password: { label: 'Password', type: 'password' },
         },
         authorize: async (credentials) => {
            try {
               console.log('credentials', credentials)
               const { email, password } =
                  await signInSchema.parseAsync(credentials)
               // console.log('credentials', email, password)
               const pwHash = saltAndHashPassword(password)
               // logic to verify if the user exists
               const user = await fetchSignIn(email, pwHash)

               if (!user) {
                  throw new Error('해당 회원의 정보가 없습니다.')
               }

               return user
            } catch (error) {
               if (error instanceof ZodError) {
                  throw new Error('검증 오류' + error.errors[0].message)
               }
               throw new Error('통신 실패' + error.message)
            }
         },
      }),
   ],
   callbacks: {
      async signIn({ user, account, profile }) {
         if (!user.email) {
            return false
         }
         return true
      },
      async jwt({ token, user }) {
         if (user) {
            token.email = user.email
         }
         return token
      },
      async session({ session, token }) {
         session.user.email = token.email
         return session
      },
   },
})
