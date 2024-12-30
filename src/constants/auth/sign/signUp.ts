import { passwordSchema, userEmailSchema } from '@/schema/signFormSchema'
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
