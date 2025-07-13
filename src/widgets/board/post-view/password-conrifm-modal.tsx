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
import { useState } from 'react'

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

   const handleConfirm = async () => {
      await onConfirm(password)
   }

   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent className="max-h-[80vh] overflow-y-auto pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
            <DialogHeader>
               <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
               <DialogDescription>비밀번호를 입력하세요</DialogDescription>
            </DialogHeader>
            <Input
               type="password"
               placeholder="비밀번호를 입력하세요"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               disabled={loading}
            />
            {error && (
               <div className="text-destructive text-sm mt-2">{error}</div>
            )}
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
