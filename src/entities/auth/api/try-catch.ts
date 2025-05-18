'use server'

import type { AuthResponse } from '../types/common'

// 트라이 캐치 래퍼
export const handleTryCatch = async (
   actionFn: () => Promise<AuthResponse>,
   errorMessage: string,
): Promise<AuthResponse> => {
   try {
      return await actionFn()
   } catch (error) {
      return {
         success: false,
         message: error instanceof Error ? error.message : errorMessage,
      }
   }
}
