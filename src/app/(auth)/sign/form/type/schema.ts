import { z } from 'zod'

const genderSchema = z
   .string()
   .regex(/^(man|woman|etc)$/, '성별을 선택 해주세요')

const userEmailSchema = z.string().email('이메일 형식이 아닙니다.')

const passwordSchema = z
   .string()
   .min(8, '비밀번호는 8자 이상이어야 합니다')
   .max(20, '비밀번호는 20자 이하여야 합니다')
   .regex(
      /^(?=.*[a-z]|.*[A-Z])(?=.*\d|.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/,
      '비밀번호는 영문 대/소문자, 숫자, 특수문자 중 2가지 이상을 조합해야 합니다',
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
