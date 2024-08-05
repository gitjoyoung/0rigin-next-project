import { z } from 'zod'

const genderSchema = z
   .string()
   .regex(/^(남성|여성|기타)$/, '성별을 선택 해주세요')

const userEmailSchema = z.string().email('이메일 형식이 아닙니다.')

const passwordSchema = z
   .string()
   .min(8, '비밀번호는 대소문자 특수문자 포함 8자 이상이어야 합니다.')
   .max(15, '비밀번호는 대소문자 특수문자 포함 15자 이하이어야 합니다.')
   .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/,
      '비밀번호는 영어 대소문자, 숫자, 특수문자를 포함해야 합니다.',
   )

const signUpSchema = z
   .object({
      gender: genderSchema,
      email: userEmailSchema,
      password: passwordSchema,
      confirmPassword: passwordSchema,
   })
   .passthrough()
   .refine((data) => data.password === data.confirmPassword, {
      message: '비밀번호 재확인이 일치하지 않습니다.',
      path: ['confirmPassword'],
   })

export { userEmailSchema, passwordSchema, signUpSchema }
