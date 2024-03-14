import { useState } from 'react'
import {
   validateGender,
   validatePassword,
   validateUserId,
} from '@/utils/authValidators/validation'
import { fetchSignUp, checkEmailDuplicate } from '@/app/api/auth/signUp'
import { ROUTES } from '@/constants/route'
import { updateIncrementCount } from '@/app/api/board/tickerApi'
import Modal from '@/components/Modal/ModalStore'
import { useModalStore } from '@/store/modal'

export default function SignForm() {
   const [userid, setUserid] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [gender, setGender] = useState('')
   const open = useModalStore((state) => state.open)
   /**
    * 아이디 중복 확인
    * @param userId
    * @returns
    * - 중복이면 false
    */
   const checkDuplicateUserId = async (userId: string): Promise<boolean> => {
      // 아이디 형식 확인
      const idCheck = validateUserId(userId)
      if (!idCheck) {
         return false
      }
      try {
         await checkEmailDuplicate(userId)
      } catch (error) {
         return false
      }

      return true
   }

   /**
    *  폼 제출 함수
    * @param e
    * @returns
    */
   const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (
         !validateGender(gender) ||
         !(await checkDuplicateUserId(userid)) ||
         !validatePassword(password, confirmPassword)
      ) {
         return
      }
      await fetchSignUp({
         userid: `${userid}@0rigin.com`,
         password,
         gender,
      }).then((user) => {
         if (!user) return
         updateIncrementCount('post')
         open()
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
               className="flex flex-col gap-2 text-sm  w-full max-w-[300px]"
               onSubmit={handleSignUpSubmit}
            >
               <ul className="flex gap-3 my-2">
                  <li>
                     <label htmlFor="gender-man">
                        <input
                           type="radio"
                           className="m-1"
                           name="gender"
                           value="man"
                           id="gender-man"
                           onChange={(e) => setGender(e.target.value)}
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
                           onChange={(e) => setGender(e.target.value)}
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
                           onChange={(e) => setGender(e.target.value)}
                        />
                        기타
                     </label>
                  </li>
               </ul>
               <p className="text-xs  ">*성별을 선택해 주세요</p>

               <input
                  name="id"
                  key="id"
                  type="text"
                  placeholder="아이디"
                  className="border border-gray-300 p-2"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
               />
               <p className="text-xs mb-2">*영어 4~12자 소문자+숫자 가능</p>

               <input
                  name="password"
                  key="password"
                  type="password"
                  placeholder="비밀번호"
                  className="border border-gray-300 p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <p className="text-xs mb-2">
                  *8~12자 대 소문자+숫자+특수문자 포함
               </p>
               <input
                  name="confirmPassword"
                  key="confirmPassword"
                  type="password"
                  placeholder="비밀번호 재확인"
                  className="border border-gray-300 p-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
               />
               <p className="text-xs">*비밀번호를 재입력해 주세요</p>

               <button className=" my-4 p-2 " type="submit">
                  회원가입
               </button>
            </form>
         </div>
      </section>
   )
}
