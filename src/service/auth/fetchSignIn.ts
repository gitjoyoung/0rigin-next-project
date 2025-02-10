import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const fetchSignIn = async (
   email: string,
   password: string,
): Promise<any> => {
   return await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
         const user = userCredential.user
         if (!user) {
            throw new Error('User not found.')
         }
         const loginResult = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
         }
         return loginResult
      })
      .catch((error) => {
         return {
            error: error.code,
            message: error.message,
         }
      })
}
