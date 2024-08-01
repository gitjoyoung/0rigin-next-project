import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from './schma/auth'
import saltAndHashPassword from './utils/authValidators/password'
import { ZodError } from 'zod'
import { fetchSignIn } from './service/auth/signIn'

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
               let user = null

               const { email, password } =
                  await signInSchema.parseAsync(credentials)
               // console.log('credentials', email, password)
               // const pwHash = saltAndHashPassword(password)

               // logic to verify if the user exists
               user = await fetchSignIn(email, password)

               if (!user) {
                  throw new Error('User not found.')
               }

               return user
            } catch (error) {
               if (error instanceof ZodError) {
                  console.log('ZodError:', error.errors)
               }
               console.error('Authorization error:', error)
            }
         },
      }),
   ],
})
