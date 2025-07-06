import AppProviders from '@/app/providers'
import { baseMetadata } from '@/shared/metadata'
import Footer from '@/widgets/footer'
import Header from '@/widgets/header'
import Ticker from '@/widgets/ticker'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import './globals.css'
import Loading from './loading'
import AuthServerProvider from './providers/auth-server-provider'

// 한글 폰트 설정
const notoSansKR = Noto_Sans_KR({
   weight: ['400', '500', '700'],
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-noto-sans-kr',
})

// DOS 폰트 설정 (숫자 전용)
const modernDOS = localFont({
   src: [
      {
         path: '../../public/fonts/modern_dos/ModernDOS8x8.ttf',
         weight: '400',
         style: 'normal',
      },
      {
         path: '../../public/fonts/modern_dos/ModernDOS8x14.ttf',
         weight: '500',
         style: 'normal',
      },
      {
         path: '../../public/fonts/modern_dos/ModernDOS8x16.ttf',
         weight: '700',
         style: 'normal',
      },
   ],
   variable: '--font-dos',
   display: 'swap',
   preload: true,
   // 숫자와 관련 기호만 DOS 폰트 적용
})

// 글로벌 메타데이터 (분리된 모듈 사용)
export const metadata: Metadata = {
   ...baseMetadata,
   // 추가 설정들
   creator: '0RIGIN(제로리진)',
   publisher: '0RIGIN(제로리진)',
   formatDetection: {
      email: false,
      address: false,
      telephone: false,
   },
   metadataBase: new URL('https://0rigin.space'),
   robots: {
      index: true,
      follow: true,
      googleBot: {
         index: true,
         follow: true,
         'max-video-preview': -1,
         'max-image-preview': 'large',
         'max-snippet': -1,
      },
   },
   verification: {
      google: 'your-google-verification-code',
   },
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html
         lang="ko"
         suppressHydrationWarning
         className={`${notoSansKR.variable} ${modernDOS.variable}`}
      >
         <head>
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/images/introduce/logo.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta
               name="naver-site-verification"
               content="f79a49708c95844fd87df7edf84526d803d6f736"
            />
         </head>
         <body>
            <AuthServerProvider>
               <AppProviders>
                  <div id="modal-root" />
                  <div className="flex min-h-screen flex-col items-center w-full bg-background">
                     <div className="w-full max-w-[1280px] px-auto flex flex-col flex-1">
                        <Ticker />
                        <Header />
                        <main className="flex-1 w-full min-h-screen font-mono">
                           <Suspense fallback={<Loading />}>
                              {children}
                           </Suspense>
                        </main>
                        <Footer />
                     </div>
                  </div>
               </AppProviders>
            </AuthServerProvider>
         </body>
      </html>
   )
}
