import { z } from 'zod'

const genderSchema = z
   .string()
   .regex(/^(man|woman|etc)$/, '성별을 선택 해주세요')

const userEmailSchema = z.string().email('이메일 형식이 아닙니다.')

const passwordSchema = z
   .string()
   .min(8, '비밀번호는 대소문자 특수문자 포함 8자 이상')
   .max(15, '비밀번호는 대소문자 특수문자 포함 15자 이하')
   .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/,
      '비밀번호는 영어 대소문자, 숫자, 특수문자를 포함.',
   )

const confirmPasswordSchema = z.string().min(1, '비밀번호가 같지않습니다.')

const signUpSchema = z
   .object({
      gender: genderSchema,
      email: userEmailSchema,
      password: passwordSchema,
      confirmPassword: confirmPasswordSchema,
   })
   .passthrough()
   .refine((data) => data.password === data.confirmPassword, {
      message: '입력하신 비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
   })

export { confirmPasswordSchema, passwordSchema, signUpSchema, userEmailSchema }
