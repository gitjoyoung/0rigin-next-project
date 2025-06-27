import { getUserServer } from '@/entities/auth/api/get-user-server'
import GoogleProfileForm from './ui/google-profile-form'
import NormalSignUpForm from './ui/normal-signup-form'

export default async function SignFormPage() {
   const user = await getUserServer()

   if (user) {
      // 프로필이 없다면 구글 폼 표시
      return <GoogleProfileForm email={user.email} />
   }

   // 일반 사용자는 일반 회원가입 폼 표시
   return <NormalSignUpForm />
}
