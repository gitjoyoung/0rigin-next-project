import { useTransition } from 'react'
import { fetchSignUp } from '@/app/api/auth/signUp'
import { ROUTES } from '@/constants/route'
import { updateIncrementCount } from '@/app/api/board/tickerApi'
import { useModalStore } from '@/store/modal'
import Modal from '@/components/Modal/Modal'
import { signUpSchema } from './schemas/signFormSchema'

export default function SignForm() {
   const open = useModalStore((state) => state.open)
   const [isPending, startTransition] = useTransition()

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
         const errorMessage = result.error.errors
            .map((error) => `${error.path.join('.')}: ${error.message}`)
            .join(', ')

         alert(errorMessage)
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
         }
      })
   }

   return (
      <section className="w-full flex justify-center">
         <Modal
            title="회원가입 완료"
            content="회원 가입을 완료 하였습니다! 로그인 페이지로 이동합니다."
            path={ROUTES.LOGIN}
         />
         <div className="border p-10 flex items-center flex-col gap-6 m-3 w-full max-w-[500px]">
            <h1 className="font-bold text-2xl">회원가입</h1>
            <h3 className="text-xl">
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
               <p className="text-xs ">* 성별을 선택해 주세요</p>

               <input
                  disabled={isPending}
                  name="userId"
                  key="userId"
                  type="text"
                  placeholder="아이디"
                  className="border border-gray-300 p-2"
               />
               <p className="text-xs mb-2">* 영어 4~12자 소문자+숫자 가능</p>

               <input
                  disabled={isPending}
                  name="password"
                  key="password"
                  type="password"
                  placeholder="비밀번호"
                  className="border border-gray-300 p-2"
               />
               <p className="text-xs mb-2">
                  * 8~12자 대 소문자+숫자+특수문자 포함
               </p>
               <input
                  disabled={isPending}
                  name="confirmPassword"
                  key="confirmPassword"
                  type="password"
                  placeholder="비밀번호 재확인"
                  className="border border-gray-300 p-2"
               />
               <p className="text-xs">* 비밀번호를 재입력해 주세요</p>

               <button
                  className=" my-4 p-2 "
                  type="submit"
                  disabled={isPending}
               >
                  회원가입
               </button>
            </form>
         </div>
      </section>
   )
}
