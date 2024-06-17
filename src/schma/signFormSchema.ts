import { z } from 'zod'

const genderSchema = z
   .string()
   .regex(/^(남성|여성|기타)$/, '성별을 선택 해주세요')

const userEmailSchema = z
   .string()
   .min(4, '아이디 4자 이상이어야 합니다.')
   .max(11, '아이디는 12자 미만이어야 합니다.')
   .regex(/^[a-z0-9]+$/, '영어 소문자와 숫자만 허용됩니다.')

const passwordSchema = z
   .string()
   .min(8, '비밀번호는 8자 이상이어야 합니다.')
   .max(12, '비밀번호는 12자 이하이어야 합니다.')
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
   }).passthrough()
   .refine((data) => data.password === data.confirmPassword, {
      message: '비밀번호와 확인 비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
   })

export { userEmailSchema, passwordSchema, signUpSchema }
