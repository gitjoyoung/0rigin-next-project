import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { fetchLogin } from './service/auth/login'
import { Login } from './types/authTypes'

export const { handlers, signIn, signOut, auth } = NextAuth({
   trustHost: true,
   providers: [
      Credentials({
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials): Promise<Login | null> => {
            const user = await fetchLogin(
               credentials.email,
               credentials.password,
            )
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
