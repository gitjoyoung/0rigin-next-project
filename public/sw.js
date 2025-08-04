// 서비스워커 버전
const CACHE_NAME = '0rigin-space-v1.0.0'
const STATIC_CACHE_NAME = '0rigin-static-v1.0.0'
const DYNAMIC_CACHE_NAME = '0rigin-dynamic-v1.0.0'

// 캐시할 정적 리소스
const STATIC_ASSETS = [
   '/',
   '/board',
   '/quiz',
   '/introduce',
   '/manifest.json',
   '/favicon.ico',
   '/images/introduce/logo.png',
   '/images/introduce/logo2.png',
   '/images/introduce/logo3.png',
   '/fonts/modern_dos/ModernDOS8x14.ttf',
   '/fonts/modern_dos/ModernDOS8x16.ttf',
]

// 캐시하지 않을 URL 패턴
const SKIP_CACHE_PATTERNS = [
   /\/api\//,
   /\/_next\/static\/chunks\/pages/,
   /\/_next\/static\/.*\.hot-update\./,
   /\/admin/,
   /\/callback/,
]

// 서비스워커 설치
self.addEventListener('install', (event) => {
   console.log('🔧 Service Worker: Installing...')

   event.waitUntil(
      caches
         .open(STATIC_CACHE_NAME)
         .then((cache) => {
            console.log('📦 Service Worker: Caching static assets')
            return cache.addAll(STATIC_ASSETS)
         })
         .then(() => {
            console.log('✅ Service Worker: Installation completed')
            return self.skipWaiting()
         })
         .catch((error) => {
            console.error('❌ Service Worker: Installation failed', error)
         }),
   )
})

// 서비스워커 활성화
self.addEventListener('activate', (event) => {
   console.log('🚀 Service Worker: Activating...')

   event.waitUntil(
      caches
         .keys()
         .then((cacheNames) => {
            return Promise.all(
               cacheNames.map((cacheName) => {
                  if (
                     cacheName !== STATIC_CACHE_NAME &&
                     cacheName !== DYNAMIC_CACHE_NAME
                  ) {
                     console.log(
                        '🗑️ Service Worker: Deleting old cache',
                        cacheName,
                     )
                     return caches.delete(cacheName)
                  }
               }),
            )
         })
         .then(() => {
            console.log('✅ Service Worker: Activation completed')
            return self.clients.claim()
         }),
   )
})

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
   const { request } = event
   const url = new URL(request.url)

   // 지원하지 않는 스킴 스킵 (chrome-extension, moz-extension 등)
   if (!url.protocol.startsWith('http')) {
      return
   }

   // 캐시하지 않을 요청들 스킵
   if (SKIP_CACHE_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
      return
   }

   // GET 요청만 캐싱
   if (request.method !== 'GET') {
      return
   }

   event.respondWith(handleRequest(request))
})

// 요청 처리 함수
async function handleRequest(request) {
   const url = new URL(request.url)

   try {
      // 정적 리소스 처리 (Cache First)
      if (isStaticAsset(url)) {
         return await cacheFirst(request)
      }

      // 이미지 처리 (Cache First)
      if (isImage(url)) {
         return await cacheFirst(request, DYNAMIC_CACHE_NAME)
      }

      // 폰트 처리 (Cache First)
      if (isFont(url)) {
         return await cacheFirst(request, DYNAMIC_CACHE_NAME)
      }

      // API 요청 처리 (Network First)
      if (isApiRequest(url)) {
         return await networkFirst(request)
      }

      // HTML 페이지 처리 (Network First with Cache Fallback)
      if (isHtmlPage(request)) {
         return await networkFirstWithFallback(request)
      }

      // 기본: 네트워크 우선
      return await fetch(request)
   } catch (error) {
      console.error('Service Worker: Request failed', error)

      // 오프라인 폴백
      if (isHtmlPage(request)) {
         const cache = await caches.open(STATIC_CACHE_NAME)
         return (
            (await cache.match('/')) ||
            new Response('오프라인 상태입니다.', {
               status: 503,
               headers: { 'Content-Type': 'text/html; charset=utf-8' },
            })
         )
      }

      throw error
   }
}

// Cache First 전략
async function cacheFirst(request, cacheName = STATIC_CACHE_NAME) {
   const cache = await caches.open(cacheName)
   const cached = await cache.match(request)

   if (cached) {
      return cached
   }

   try {
      const response = await fetch(request)
      if (response.status === 200 && response.url.startsWith('http')) {
         cache.put(request, response.clone())
      }
      return response
   } catch (error) {
      console.warn('Cache First fetch failed:', error)
      throw error
   }
}

// Network First 전략
async function networkFirst(request, cacheName = DYNAMIC_CACHE_NAME) {
   const cache = await caches.open(cacheName)

   try {
      const response = await fetch(request)
      if (response.status === 200) {
         cache.put(request, response.clone())
      }
      return response
   } catch (error) {
      const cached = await cache.match(request)
      if (cached) {
         return cached
      }
      throw error
   }
}

// Network First with Fallback
async function networkFirstWithFallback(request) {
   try {
      const response = await fetch(request)
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, response.clone())
      return response
   } catch (error) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      const cached = await cache.match(request)
      if (cached) {
         return cached
      }

      // 기본 페이지로 폴백
      const staticCache = await caches.open(STATIC_CACHE_NAME)
      return await staticCache.match('/')
   }
}

// 헬퍼 함수들
function isStaticAsset(url) {
   return (
      STATIC_ASSETS.some((asset) => url.pathname === asset) ||
      url.pathname.startsWith('/_next/static/') ||
      url.pathname.includes('.css') ||
      url.pathname.includes('.js')
   )
}

function isImage(url) {
   return /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(url.pathname)
}

function isFont(url) {
   return (
      /\.(woff|woff2|ttf|eot|otf)$/i.test(url.pathname) ||
      url.hostname === 'fonts.googleapis.com' ||
      url.hostname === 'fonts.gstatic.com'
   )
}

function isApiRequest(url) {
   return url.pathname.startsWith('/api/')
}

function isHtmlPage(request) {
   return request.headers.get('accept')?.includes('text/html')
}

// 푸시 알림 처리 (향후 구현)
self.addEventListener('push', (event) => {
   console.log('📨 Service Worker: Push message received')

   if (event.data) {
      const data = event.data.json()
      const options = {
         body: data.body,
         icon: '/images/introduce/logo.png',
         badge: '/images/introduce/logo.png',
         vibrate: [200, 100, 200],
         data: data,
      }

      event.waitUntil(self.registration.showNotification(data.title, options))
   }
})

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
   console.log('🔔 Service Worker: Notification clicked')

   event.notification.close()

   event.waitUntil(clients.openWindow(event.notification.data?.url || '/'))
})

console.log('🚀 0RIGIN SPACE Service Worker loaded')
