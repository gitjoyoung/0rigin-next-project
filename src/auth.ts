import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { fetchLogin } from './service/auth/login'
import { Login } from './types/authTypes'

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
         authorize: async (credentials: Credentials): Promise<Login | null> => {
            const email = credentials.email
            const password = credentials.password

            // fetchLogin 함수로 사용자 인증 수행
            const user = await fetchLogin(email, password)

            if (!user) {
               throw new Error('User not found.')
            }
            const session: Login = {
               displayName: user.displayName,
               email: user.email,
               emailVerified: user.emailVerified,
               phoneNumber: user.phoneNumber,
               photoURL: user.photoURL,
               uid: user.uid,
               accessToken: user.accessToken,
            }
            console.log('session', session)
            return session
         },
      }),
   ],
})
