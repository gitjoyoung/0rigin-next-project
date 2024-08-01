import { validate } from 'uuid'

export const GENDER_LIST = [
   {
      id: 'man',
      name: 'gender',
      value: '남성',
   },
   {
      id: 'girl',
      name: 'gender',
      value: '여성',
   },
   {
      id: 'other',
      name: 'gender',
      value: '기타',
   },
]
export const INPUT_LIST = [
   {
      placeholder: '아이디',
      name: 'email',
      errorMsg: '영어 4~12자 소문자+숫자 가능',
      type: 'text',

      validate: (value: string) => {
         if (!/^[a-zA-Z0-9]{4,12}$/.test(value)) {
            return '영어 4~12자 소문자+숫자 가능'
         }
      },
   },
   {
      placeholder: '비밀번호',
      name: 'password',
      errorMsg: '8~12자 대 소문자+숫자+특수문자 포함',
      type: 'password',
      validate: (value: string) => {
         if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}$/.test(
               value,
            )
         ) {
            return '8~12자 대 소문자+숫자+특수문자 포함'
         }
      },
   },
   {
      placeholder: '비밀번호 재확인',
      name: 'confirmPassword',
      errorMsg: '비밀번호를 재입력해 주세요',
      type: 'password',
      validate: (value: string) => {
         if (value !== 'password') {
            return '비밀번호가 일치하지 않습니다.'
         }
      },
   },
]
