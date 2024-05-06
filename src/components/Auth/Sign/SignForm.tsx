import { useState, useTransition } from 'react'
import { fetchSignUp } from '@/app/api/auth/signUp'
import { updateIncrementCount } from '@/app/api/board/tickerApi'
import { useModalStore } from '@/store/modal'
import { useRouter } from 'next/navigation'
import { signUpSchema } from './schemas/signFormSchema'
import InputAndCheck from './InputAndCheck'

export default function SignForm() {
   const router = useRouter()
   const open = useModalStore((state) => state.open)
   const [isPending, startTransition] = useTransition()
   const [inputState, setInputState] = useState({
      gender: { hasError: false, message: '* 성별을 선택해 주세요' },
      userId: { hasError: false, message: '* 영어 4~12자 소문자+숫자 가능' },
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
         userId: e.currentTarget.userId.value,
         password: e.currentTarget.password.value,
         confirmPassword: e.currentTarget.confirmPassword.value,
      }
      const result = signUpSchema.safeParse(formData)
      if (result.success === false) {
         const newState = { ...inputState }
         Object.keys(newState).forEach((key) => {
            newState[key].hasError = false
         })
         result.error.issues.forEach((issue) => {
            const fieldName = issue.path[0]
            if (fieldName in newState) {
               newState[fieldName].hasError = true
            }
         })
         setInputState(newState)
         return
      }

      startTransition(() => {})

      await fetchSignUp({
         ...formData,
         userId: `${formData.userId}@0rigin.com`,
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
         <div className="border p-10 flex items-center flex-col gap-6 m-3 w-full max-w-[500px]">
            <h1 className="font-bold text-2xl">회원가입</h1>
            <h3 className="text-lg">
               회원가입시 다양한 혜택을 받을 수 있습니다.
            </h3>

            <form
               className="flex flex-col gap-2 text-sm w-full max-w-[300px]"
               onSubmit={handleSignUpSubmit}
            >
               <ul className="flex gap-3 my-1 ">
                  <li>
                     <label htmlFor="gender-man">
                        <input
                           type="radio"
                           className="m-1"
                           name="gender"
                           value="man"
                           id="gender-man"
                        />
                        남성
                     </label>
                  </li>
                  <li>
                     <label htmlFor="gender-girl">
                        <input
                           id="gender-girl"
                           type="radio"
                           className="m-1"
                           name="gender"
                           value="girl"
                        />
                        여성
                     </label>
                  </li>
                  <li>
                     <label htmlFor="gender-other">
                        <input
                           type="radio"
                           className="m-1"
                           name="gender"
                           value="other"
                           id="gender-other"
                        />
                        기타
                     </label>
                  </li>
               </ul>
               <p
                  className={`${inputState.gender.hasError ? 'text-xs text-red-500' : 'text-xs '}`}
               >
                  {inputState.gender.message}
               </p>
               <InputAndCheck
                  placeholder="아이디"
                  name="userId"
                  errorMsg={inputState.userId.message}
                  pending={isPending}
                  hasError={inputState.userId.hasError}
                  type="text"
               />
               <InputAndCheck
                  placeholder="비밀번호"
                  name="password"
                  errorMsg={inputState.password.message}
                  pending={isPending}
                  hasError={inputState.password.hasError}
                  type="password"
               />
               <InputAndCheck
                  placeholder="비밀번호 재확인"
                  name="confirmPassword"
                  errorMsg={inputState.confirmPassword.message}
                  pending={isPending}
                  hasError={inputState.confirmPassword.hasError}
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
