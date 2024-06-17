import { z } from 'zod'

export const validatePostQuery = z
   .string()
   .regex(/^\d+$/, 'Must be a numeric string')
   .transform((n) => parseInt(n, 10))
   .optional()
