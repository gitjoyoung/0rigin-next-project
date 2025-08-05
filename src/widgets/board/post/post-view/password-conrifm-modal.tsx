'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/shared/shadcn/ui/dialog'
import { Input } from '@/shared/shadcn/ui/input'
import { cn } from '@/shared/utils/cn'
import { useEffect, useState } from 'react'

interface PasswordConfirmModalProps {
   open: boolean
   onClose: () => void
   onConfirm: (password: string) => Promise<void>
   loading?: boolean
   error?: string
   title?: string
}

export default function PasswordConfirmModal({
   open,
   onClose,
   onConfirm,
   loading,
   error,
   title,
}: PasswordConfirmModalProps) {
   const [password, setPassword] = useState('')
   useEffect(() => {
      if (open) {
         setPassword('')
      }
   }, [open])
   const handleConfirm = async () => {
      if (!password) return
      await onConfirm(password)
   }

   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent
            className={cn(
               'fixed inset-x-0 top-0 left-0 right-0 bottom-auto',
               'translate-x-0 translate-y-0 rounded-b-2xl',
               'max-h-[calc(100dvh-32px)] overflow-y-auto',
               'pt-[calc(env(safe-area-inset-top,0px)+16px)]',
               'sm:inset-auto sm:top-1/2 sm:left-1/2',
               'sm:-translate-x-1/2 sm:-translate-y-1/2',
               'sm:rounded-lg',
            )}
         >
            <DialogHeader>
               <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
               <DialogDescription>비밀번호를 입력하세요</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col ">
               <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' && password) {
                        handleConfirm()
                     }
                  }}
               />
               {error && (
                  <p className="text-destructive text-xs mt-2">{error}</p>
               )}
            </div>

            <DialogFooter className="sticky bottom-0 bg-inherit z-10 pb-[env(safe-area-inset-bottom,0px)]">
               <Button variant="outline" onClick={onClose} disabled={loading}>
                  취소
               </Button>
               <Button onClick={handleConfirm} disabled={loading || !password}>
                  확인
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
