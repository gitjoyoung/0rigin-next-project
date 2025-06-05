import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { findPasswordSchema } from '../types/find-password-scheme'

const STORAGE_KEYS = {
   TIMER: 'passwordResetTimer',
   EMAIL: 'passwordResetEmail',
} as const

const useTimer = () => {
   const timerRef = React.useRef<number | null>(null)
   const [timer, setTimer] = React.useState<number | null>(null)
   const [savedEmail, setSavedEmail] = React.useState<string>('')

   const clearStorage = () => {
      localStorage.removeItem(STORAGE_KEYS.TIMER)
      localStorage.removeItem(STORAGE_KEYS.EMAIL)
   }

   const startTimer = (email: string) => {
      timerRef.current = 60
      setTimer(60)
      setSavedEmail(email)
      localStorage.setItem(
         STORAGE_KEYS.TIMER,
         dayjs().format('YYYY-MM-DD HH:mm:ss'),
      )
      localStorage.setItem(STORAGE_KEYS.EMAIL, email)
   }

   React.useEffect(() => {
      const savedTimer = localStorage.getItem(STORAGE_KEYS.TIMER)
      const savedEmail = localStorage.getItem(STORAGE_KEYS.EMAIL)

      if (savedTimer && savedEmail) {
         const elapsedSeconds = Math.floor(
            dayjs().diff(dayjs(savedTimer), 'seconds'),
         )
         const remainingTime = Math.max(0, 60 - elapsedSeconds)

         if (remainingTime > 0) {
            timerRef.current = remainingTime
            setTimer(remainingTime)
            setSavedEmail(savedEmail)
         } else {
            clearStorage()
         }
      }
   }, [])

   React.useEffect(() => {
      if (timerRef.current === null || timerRef.current <= 0) {
         clearStorage()
         timerRef.current = null
         setTimer(null)
         setSavedEmail('')
         return
      }

      const interval = setInterval(() => {
         if (timerRef.current !== null) {
            timerRef.current -= 1
            setTimer(timerRef.current)

            if (timerRef.current <= 0) {
               clearStorage()
               timerRef.current = null
               setTimer(null)
               setSavedEmail('')
            }
         }
      }, 1000)

      return () => clearInterval(interval)
   }, [])

   return { timer, savedEmail, startTimer }
}

export const usePasswordResetForm = () => {
   const { timer, savedEmail, startTimer } = useTimer()
   const [emailStatus, setEmailStatus] = React.useState<
      'idle' | 'success' | 'error'
   >('idle')
   const [isSubmitted, setIsSubmitted] = React.useState(false)
   const supabase = SupabaseBrowserClient()

   const form = useForm({
      resolver: zodResolver(findPasswordSchema),
      defaultValues: {
         email: savedEmail || '',
      },
   })

   React.useEffect(() => {
      if (savedEmail) {
         form.setValue('email', savedEmail)
         setEmailStatus('success')
      }
   }, [savedEmail, form])

   const onFindPassword = async (data: z.infer<typeof findPasswordSchema>) => {
      if (timer !== null && timer > 0) {
         return
      }
      try {
         const { data: resetData, error } =
            await supabase.auth.resetPasswordForEmail(data.email, {
               redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/reset/password`,
            })

         console.log('resetData ', resetData)
         if (error) {
            throw error
         }

         startTimer(data.email)
         setEmailStatus('success')
         setIsSubmitted(true)
      } catch (error) {
         setEmailStatus('error')
         setIsSubmitted(true)
      }
   }

   return {
      form,
      timer,
      emailStatus,
      isSubmitted,
      onFindPassword,
   }
}
