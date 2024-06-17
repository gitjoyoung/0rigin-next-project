import { object, string } from 'zod'

const signInSchema = object({
   id: string({ required_error: 'Email is required' }).min(1, 'id is required'),
   password: string({ required_error: 'Password is required' })
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
})

const signOutSchema = object({
   id: string({ required_error: 'Email is required' }).min(1, 'id is required'),
   password: string({ required_error: 'Password is required' })
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
})

export { signInSchema, signOutSchema }
