// 서비스워커 등록 스크립트
;(function () {
   'use strict'

   // 서비스워커 지원 확인
   if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
         registerServiceWorker()
      })
   } else {
      console.log('🚫 Service Worker는 지원되지 않습니다.')
   }

   async function registerServiceWorker() {
      try {
         // 기존 서비스워커 등록 해제
         const registrations = await navigator.serviceWorker.getRegistrations()
         for (let registration of registrations) {
            await registration.unregister()
            console.log('🗑️ 기존 Service Worker 등록 해제:', registration.scope)
         }

         // 새 서비스워커 등록
         const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
         })

         console.log('✅ Service Worker 등록 성공:', registration.scope)

         // 업데이트 확인
         registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            console.log('🔄 Service Worker 업데이트 발견')

            newWorker.addEventListener('statechange', () => {
               if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
               ) {
                  console.log(
                     '🔄 새로운 콘텐츠를 사용할 수 있습니다. 페이지를 새로고침하세요.',
                  )

                  // 자동 새로고침 (선택사항)
                  if (
                     confirm(
                        '새로운 버전이 있습니다. 지금 새로고침하시겠습니까?',
                     )
                  ) {
                     window.location.reload()
                  }
               }
            })
         })

         // 서비스워커 제어 확인
         if (registration.active && !navigator.serviceWorker.controller) {
            console.log('🔄 Service Worker 활성화됨. 페이지를 새로고침하세요.')
         }
      } catch (error) {
         console.error('❌ Service Worker 등록 실패:', error)
      }
   }

   // PWA 설치 프롬프트 처리
   let deferredPrompt

   window.addEventListener('beforeinstallprompt', (event) => {
      console.log('📱 PWA 설치 프롬프트 준비됨')

      // 기본 설치 프롬프트 방지
      event.preventDefault()

      // 나중에 사용하기 위해 이벤트 저장
      deferredPrompt = event

      // 커스텀 설치 버튼 표시
      showInstallButton()

      // React 컴포넌트에서 사용할 수 있도록 사용자 정의 이벤트 발송
      window.dispatchEvent(new CustomEvent('pwa-install-available'))
   })

   // PWA 설치 함수
   window.installPWA = async function () {
      if (!deferredPrompt) {
         console.log('📱 설치 프롬프트를 사용할 수 없습니다.')
         return
      }

      try {
         // 설치 프롬프트 표시
         deferredPrompt.prompt()

         // 사용자의 응답 대기
         const { outcome } = await deferredPrompt.userChoice

         if (outcome === 'accepted') {
            console.log('✅ PWA 설치 승인됨')
         } else {
            console.log('❌ PWA 설치 거부됨')
         }

         // 프롬프트 초기화
         deferredPrompt = null
         hideInstallButton()
      } catch (error) {
         console.error('❌ PWA 설치 오류:', error)
      }
   }

   // 설치 버튼 표시/숨김 (필요시 구현)
   function showInstallButton() {
      const installButton = document.getElementById('pwa-install-button')
      if (installButton) {
         installButton.style.display = 'block'
      }
   }

   function hideInstallButton() {
      const installButton = document.getElementById('pwa-install-button')
      if (installButton) {
         installButton.style.display = 'none'
      }
   }

   // 앱 설치 완료 감지
   window.addEventListener('appinstalled', (event) => {
      console.log('🎉 PWA 설치 완료!')
      hideInstallButton()

      // 설치 완료 알림 (선택사항)
      if ('Notification' in window && Notification.permission === 'granted') {
         new Notification('0RIGIN SPACE', {
            body: '앱이 성공적으로 설치되었습니다!',
            icon: '/images/introduce/logo.png',
         })
      }
   })

   console.log('🚀 0RIGIN SPACE PWA 등록 스크립트 로드됨')
})()
