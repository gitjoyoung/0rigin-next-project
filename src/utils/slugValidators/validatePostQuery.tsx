import { z } from 'zod'

export const validatePostQuery = z
   .string()
   .regex(/^\d+$/, '슬러그는 숫자여야 합니다.') // 정규식을 이용해 숫자만 포함된 문자열인지 확인
