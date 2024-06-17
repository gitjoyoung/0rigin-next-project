import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import saltAndHashPassword from './utils/password'

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
      Credentials({
         // You can specify which fields should be submitted, by adding keys to the `credentials` object.
         // e.g. domain, username, password, 2FA token, etc.
         // 너는 `credentials` 객체에 키를 추가하여 어떤 필드가 제출되어야 하는지 지정할 수 있어.
         // 예를 들어, 도메인, 사용자 이름, 비밀번호, 2FA 토큰 등이 있어.
         credentials: {
            id: { label: 'id', type: 'text', placeholder: 'id' },
            password: { label: 'password', type: 'password' },
         },
         authorize: async (credentials: any) => {
            let user = null
            // logic to salt and hash password
            // 비밀번호를 소금화하고 해싱하는 로직
            const pwHash = saltAndHashPassword(credentials.password)
            // logic to verify if user exists
            // 사용자가 존재하는지 확인하는 로직
            if (!user) {
               // No user found, so this is their first attempt to login
               // meaning this is also the place you could do registration
               throw new Error('User not found.')
            }

            // return user object with the their profile data
            // 프로필 데이터를 가진 사용자 객체를 반환해
            return user
         },
      }),
   ],
})
