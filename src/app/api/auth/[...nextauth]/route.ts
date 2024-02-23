import NextAuth from 'next-auth'
import { getProviders } from 'next-auth/react'

const handler = NextAuth({
   providers: [
      getProviders.Firebase({
         clientId: process.env.FIREBASE_CLIENT_ID,
         clientSecret: process.env.FIREBASE_CLIENT_SECRET,
      }),
   ],
})

export { handler as GET, handler as POST }
