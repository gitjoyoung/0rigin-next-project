import { useState, useTransition } from 'react'
import { fetchSignUp } from '@/app/api/auth/signUp'
import { updateIncrementCount } from '@/app/api/board/tickerApi'
import { useModalStore } from '@/store/modal'
import { useRouter } from 'next/navigation'
import { signUpSchema } from './schemas/signFormSchema'
import InputAndCheck from './InputAndCheck'
import GenderRadioGroup from './GenderRadioGroup'

export default function SignForm() {
   const router = useRouter()
   const open = useModalStore((state) => state.open)
   const [isPending, startTransition] = useTransition()
   const [inputState, setInputState] = useState({
      gender: { hasError: false, message: '* 성별을 선택해 주세요' },
      email: { hasError: false, message: '* 영어 4~12자 소문자+숫자 가능' },
      password: {
         hasError: false,
         message: '* 8~12자 대 소문자+숫자+특수문자 포함',
      },
      confirmPassword: {
         hasError: false,
         message: '* 비밀번호를 재입력해 주세요',
      },
   })

   const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = {
         gender: e.currentTarget.gender.value,
         email: e.currentTarget.email.value,
         password: e.currentTarget.password.value,
         confirmPassword: e.currentTarget.confirmPassword.value,
      }
      const result = signUpSchema.safeParse(formData)
      if (result.success === false) {
         // 상태 초기화
         const newState = { ...inputState }
         Object.keys(newState).forEach((key) => {
            newState[key].hasError = false
         })
         // 에러가 있는 필드에만 hasError를 true로 변경
         result.error.issues.forEach((issue) => {
            const fieldName = issue.path[0]
            if (fieldName in newState) {
               newState[fieldName].hasError = true
            }
         })
         setInputState(newState)
         return
      }

      // 로딩 시작 로직
      startTransition(() => {})

      await fetchSignUp({
         ...formData,
         email: `${formData.email}@0rigin.com`,
      }).then((credential) => {
         if (credential instanceof Error) {
            alert(credential.message) // 오류 메시지를 alert로 보여줌
         } else {
            alert(`회원가입 성공! UID: ${credential}`)
            updateIncrementCount('user')
            open()
            router.push('/login') // 로그인 페이지로 이동
         }
      })
   }

   return (
      <section className="w-full flex justify-center">
         <div className="border p-10 flex items-center flex-col gap-6 m-3 w-full max-w-[350px]">
            <h1 className="font-bold text-2xl">회원가입</h1>
            <h3 className="text-lg">
               회원가입시 다양한 혜택을 받을 수 있습니다.
            </h3>

            <form
               className="flex flex-col gap-2  w-full max-w-[300px]"
               onSubmit={handleSignUpSubmit}
            >
               <GenderRadioGroup />
               <InputAndCheck
                  placeholder="아이디"
                  name="email"
                  pending={isPending}
                  errorMsg={'영어 4~12자 소문자+숫자 가능'}
                  type="text"
               />
               <InputAndCheck
                  placeholder="비밀번호"
                  name="password"
                  pending={isPending}
                  errorMsg={'8~12자 대 소문자+숫자+특수문자 포함'}
                  type="password"
               />
               <InputAndCheck
                  placeholder="비밀번호 재확인"
                  name="confirmPassword"
                  pending={isPending}
                  errorMsg={'비밀번호를 재입력해 주세요'}
                  type="password"
               />
               <button className="my-4 p-2" type="submit" disabled={isPending}>
                  회원가입
               </button>
            </form>
         </div>
      </section>
   )
}
