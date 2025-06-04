import { ROUTE_LOGIN } from '@/constants/pathname'
import { getUserServer } from '@/entities/auth/api/get-user-server'
import {
   checkIsGoogleUserServer,
   checkUserProfileExistsServer,
} from '@/entities/auth/api/google'
import { redirect } from 'next/navigation'
import GoogleProfileForm from './ui/google-profile-form'
import NormalSignUpForm from './ui/normal-signup-form'

export default async function SignFormPage() {
   const user = await getUserServer()

   if (!user) {
      redirect(ROUTE_LOGIN)
   }

   // 구글 사용자인지 확인
   const isGoogleUser = await checkIsGoogleUserServer()

   // 사용자 타입에 따른 처리
   if (isGoogleUser) {
      // 구글 사용자의 경우 profiles 테이블에 정보가 있는지 확인
      const hasProfile = await checkUserProfileExistsServer()

      if (hasProfile) {
         // 이미 프로필이 있다면 홈으로 리다이렉트
         redirect('/')
      }

      // 프로필이 없다면 구글 폼 표시
      return <GoogleProfileForm email={user.email} />
   }

   // 일반 사용자는 일반 회원가입 폼 표시
   return <NormalSignUpForm />
}
