import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { fetchLogin } from './service/auth/login'

export const { handlers, signIn, signOut, auth } = NextAuth({
   trustHost: true,
   providers: [
      Credentials({
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials) => {
            let user = null
            user = await fetchLogin(credentials.email, credentials.password)

            if (!user) {
               throw new Error('User not found.')
            }
            const session = {
               email: user.email,
               id: user.id,
               name: user.name,
               nickname: user.nickname,
               token: user.token,
            }
            console.log('session', session)
            return session
         },
      }),
   ],
})
