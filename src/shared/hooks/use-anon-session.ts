import { useCallback, useEffect, useState } from 'react'

function getOrCreateAnonKey() {
   if (typeof window === 'undefined') return ''
   let anonKey = localStorage.getItem('anonKey')
   if (!anonKey) {
      anonKey =
         self.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)
      localStorage.setItem('anonKey', anonKey)
   }
   return anonKey
}

function getAnonUserInfo(anonKey: string) {
   if (typeof window === 'undefined') return { nickname: '', password: '' }
   const raw = localStorage.getItem(`anonUserInfo_${anonKey}`)
   if (!raw) return { nickname: '', password: '' }
   try {
      const { nickname, password } = JSON.parse(raw)
      return { nickname, password }
   } catch {
      return { nickname: '', password: '' }
   }
}

export function useAnonSession() {
   const [anonKey, setAnonKey] = useState<string>('')
   const [nickname, setNickname] = useState<string>('')
   const [password, setPassword] = useState<string>('')

   useEffect(() => {
      const key = getOrCreateAnonKey()
      setAnonKey(key)
      const { nickname, password } = getAnonUserInfo(key)
      setNickname(nickname)
      setPassword(password)
   }, [typeof window !== 'undefined' ? window.location.pathname : ''])

   const setAnonSession = useCallback(
      (nickname: string, password: string) => {
         setNickname(nickname)
         setPassword(password)
         if (typeof window !== 'undefined') {
            localStorage.setItem(
               `anonUserInfo_${anonKey}`,
               JSON.stringify({ nickname, password }),
            )
         }
      },
      [anonKey],
   )

   return {
      anonKey,
      anonNickname: nickname,
      anonPassword: password,
      setAnonSession,
   }
}
