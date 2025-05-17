'use client'

import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UserInfo() {
   const [user, setUser] = useState<any>(null)
   const [loading, setLoading] = useState(true)
   const router = useRouter()

   useEffect(() => {
      const getUser = async () => {
         try {
            const supabase = SupabaseBrowserClient()
            const {
               data: { user },
            } = await supabase.auth.getUser()

            if (user) {
               // 사용자 정보 세팅
               setUser(user)

               // OAuth로 처음 가입한 사용자 감지 (비밀번호가 없는 경우)
               const isNewOAuthUser = checkIfNewOAuthUser(user)

               if (isNewOAuthUser) {
                  console.log(
                     '새로운 OAuth 사용자 감지: 회원가입 페이지로 리디렉션',
                  )
                  router.push('/signup/complete-profile') // 추가 정보 입력 페이지로 리디렉션
                  return
               }
            }
         } catch (error) {
            console.error('사용자 정보 가져오기 오류:', error)
         } finally {
            setLoading(false)
         }
      }

      getUser()
   }, [router])

   // OAuth로 처음 가입한 사용자인지 확인하는 함수
   const checkIfNewOAuthUser = (user: any): boolean => {
      // 1. 비밀번호가 설정되어 있지 않은지 확인
      // (OAuth 사용자는 일반적으로 비밀번호가 없음)
      const isOAuthUser =
         user.app_metadata?.provider && user.app_metadata.provider !== 'email'

      // 2. 생성 시간과 마지막 로그인 시간이 매우 가까운지 확인
      // (처음 가입한 사용자의 경우 두 시간이 거의 동일)
      const createdAt = new Date(user.created_at).getTime()
      const lastSignIn = new Date(user.last_sign_in_at).getTime()
      const isFirstLogin = Math.abs(createdAt - lastSignIn) < 5000 // 5초 이내

      // 3. 사용자 메타데이터에 추가 정보가 없는지 확인
      const hasNoProfile = !user.user_metadata?.profile_completed

      return isOAuthUser && (isFirstLogin || hasNoProfile)
   }

   if (loading) {
      return <div>로딩 중...</div>
   }

   if (!user) {
      return <div>로그인이 필요합니다.</div>
   }

   console.log('사용자 정보:', user)

   return (
      <div className="p-4">
         <h1 className="text-xl font-bold mb-4">서버에서 가져온 유저 정보</h1>

         <div className="space-y-2 mb-4">
            <p>
               <strong>ID:</strong> {user.id}
            </p>
            <p>
               <strong>이메일:</strong> {user.email}
            </p>
            <p>
               <strong>닉네임:</strong> {user.user_metadata?.name}
            </p>
            <p>
               <strong>인증 방식:</strong>{' '}
               {user.app_metadata?.provider || '이메일/비밀번호'}
            </p>
            <p>
               <strong>생성 시간:</strong>{' '}
               {new Date(user.created_at).toLocaleString()}
            </p>
            <p>
               <strong>마지막 로그인:</strong>{' '}
               {new Date(user.last_sign_in_at).toLocaleString()}
            </p>
         </div>

         {user.user_metadata?.avatar_url && (
            <img
               src={user.user_metadata.avatar_url}
               alt="프로필"
               className="w-20 h-20 rounded-full mt-2"
            />
         )}

         <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">모든 사용자 정보 (JSON)</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">
               {JSON.stringify(user, null, 2)}
            </pre>
         </div>
      </div>
   )
}
