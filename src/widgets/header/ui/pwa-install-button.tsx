'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PWAInstallButton() {
   const [showInstall, setShowInstall] = useState(false)

   useEffect(() => {
      // PWA 설치 가능 이벤트 리스너
      const handleInstallAvailable = () => {
         setShowInstall(true)
      }

      const handleAppInstalled = () => {
         setShowInstall(false)
      }

      // 커스텀 이벤트 및 기본 이벤트 리스너 등록
      window.addEventListener('pwa-install-available', handleInstallAvailable)
      window.addEventListener('beforeinstallprompt', handleInstallAvailable)
      window.addEventListener('appinstalled', handleAppInstalled)

      return () => {
         window.removeEventListener(
            'pwa-install-available',
            handleInstallAvailable,
         )
         window.removeEventListener(
            'beforeinstallprompt',
            handleInstallAvailable,
         )
         window.removeEventListener('appinstalled', handleAppInstalled)
      }
   }, [])

   const handleInstall = async () => {
      if (typeof window !== 'undefined' && 'installPWA' in window) {
         try {
            await (window as any).installPWA()
            setShowInstall(false) // 설치 시도 후 버튼 숨김
         } catch (error) {
            console.error('PWA 설치 실패:', error)
         }
      }
   }

   if (!showInstall) {
      return null
   }

   return (
      <Button
         id="pwa-install-button"
         variant="outline"
         size="sm"
         onClick={handleInstall}
         className="flex items-center gap-2 text-xs hidden sm:flex"
         title="앱을 설치하여 더 빠르게 이용하세요"
      >
         <Download size={14} />앱 설치
      </Button>
   )
}
