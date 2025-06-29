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
   initialData?: Partial<BoardFormType>
}

export const useBoardForm = ({ userData, initialData }: UseBoardFormProps) => {
   const [showPassword, setShowPassword] = useState(false)
   const [isAuthenticated, setIsAuthenticated] = useState(false)

   // 사용자 상태에 따라 다른 스키마 사용
   const schema = userData ? authenticatedBoardSchema : boardSchema

   const form = useForm<BoardFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
         nickname: initialData?.nickname || userData?.nickname || '',
         password: initialData?.password || '',
         title: initialData?.title || '',
         content: initialData?.content || '',
         summary: initialData?.summary || '',
         thumbnail: initialData?.thumbnail || '',
      },
   })

   // 사용자 데이터가 있을 때 인증 상태 설정
   useEffect(() => {
      if (userData) {
         setIsAuthenticated(true)
         // 로그인된 사용자의 닉네임을 폼에 설정
         if (!initialData?.nickname && userData.nickname) {
            form.setValue('nickname', userData.nickname)
         }
      }
   }, [userData, form, initialData?.nickname])

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
