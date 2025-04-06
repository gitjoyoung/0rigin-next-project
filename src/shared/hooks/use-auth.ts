import { useEffect, useState } from 'react'

interface User {
   nickname: string
   // 필요한 다른 사용자 정보들...
}

interface AuthState {
   user: User | null
   isAuthenticated: boolean
}

export function useAuth() {
   const [authState, setAuthState] = useState<AuthState>({
      user: null,
      isAuthenticated: false,
   })

   useEffect(() => {
      // 여기서 쿠키나 로컬 스토리지에서 사용자 정보를 가져옵니다
      const checkAuth = async () => {
         try {
            // 예시: API 호출이나 쿠키 확인 로직
            const userData = localStorage.getItem('user')
            if (userData) {
               setAuthState({
                  user: JSON.parse(userData),
                  isAuthenticated: true,
               })
            }
         } catch (error) {
            console.error('인증 상태 확인 중 오류 발생:', error)
         }
      }

      checkAuth()
   }, [])

   return authState
}
