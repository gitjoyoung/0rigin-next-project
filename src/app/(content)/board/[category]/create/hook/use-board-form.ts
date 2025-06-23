import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
   authenticatedBoardSchema,
   boardSchema,
   type BoardFormType,
} from '../schema/board-schema'

interface UseBoardFormProps {
   userData: any
}

export const useBoardForm = ({ userData }: UseBoardFormProps) => {
   const [showPassword, setShowPassword] = useState(false)
   const [isAuthenticated, setIsAuthenticated] = useState(false)

   // 사용자 상태에 따라 다른 스키마 사용
   const schema = userData?.user ? authenticatedBoardSchema : boardSchema

   const form = useForm<BoardFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
         nickname: '',
         password: '',
         title: '',
         content: '',
         summary: '',
         thumbnail: '',
      },
   })

   // 사용자 데이터가 있을 때 인증 상태 설정
   useEffect(() => {
      if (userData?.user) {
         setIsAuthenticated(true)
         // 로그인된 사용자의 경우 닉네임과 비밀번호를 자동 설정하지 않음
         // 실제 프로필 정보를 사용하거나 빈 값으로 유지
      }
   }, [userData])

   // 이미지 업로드 성공 시 썸네일 설정
   const setThumbnail = (url: string) => {
      form.setValue('thumbnail', url)
   }

   return {
      form,
      showPassword,
      setShowPassword,
      isAuthenticated,
      setThumbnail,
   }
}
