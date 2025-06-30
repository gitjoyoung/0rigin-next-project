import AppProviders from '@/shared/providers'
import { Toaster } from '@/shared/shadcn/ui/toaster'
import Footer from '@/widgets/footer'
import Header from '@/widgets/header'
import Ticker from '@/widgets/ticker'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Loading from './loading'

const notoSansKR = Noto_Sans_KR({
   weight: ['400', '500', '700'],
   subsets: ['latin'],
   display: 'swap',
})

export const metadata: Metadata = {
   title: {
      template: '%s | 0RIGIN(제로리진)',
      default: '0RIGIN(제로리진) - 무, 공, 허무 그리고 아포리아',
   },
   description:
      '0RIGIN(제로리진)은 철학, 기술, 과학, 수학에 대한 깊이 있는 토론과 퀴즈를 제공하는 커뮤니티 플랫폼입니다.',
   keywords: [
      '제로리진',
      '0RIGIN',
      '0rigin',
      '철학',
      '기술',
      '과학',
      '수학',
      '커뮤니티',
      '토론',
      '퀴즈',
      '지식 공유',
   ],
   authors: [{ name: '0RIGIN(제로리진) 팀' }],
   creator: '0RIGIN(제로리진)',
   publisher: '0RIGIN(제로리진)',
   formatDetection: {
      email: false,
      address: false,
      telephone: false,
   },
   metadataBase: new URL('https://0rigin.space'),
   alternates: {
      canonical: '/',
   },
   openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: 'https://0rigin.space',
      title: '0RIGIN(제로리진) - 무, 공, 허무 그리고 아포리아',
      description:
         '0RIGIN(제로리진)은 철학, 기술, 과학, 수학에 대한 깊이 있는 토론과 퀴즈를 제공하는 커뮤니티 플랫폼입니다.',
      siteName: '0RIGIN(제로리진)',
      images: [
         {
            url: '/images/introduce/logo.png',
            width: 1200,
            height: 630,
            alt: '0RIGIN(제로리진) 로고',
         },
      ],
   },
   twitter: {
      card: 'summary_large_image',
      title: '0RIGIN(제로리진) - 무, 공, 허무 그리고 아포리아',
      description:
         '0RIGIN(제로리진)은 철학, 기술, 과학, 수학에 대한 깊이 있는 토론과 퀴즈를 제공하는 커뮤니티 플랫폼입니다.',
      images: ['/images/introduce/logo.png'],
   },
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
         className={`${notoSansKR.className}`}
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
            <AppProviders>
               <div id="modal-root" />
               <div className="flex min-h-screen flex-col items-center w-full bg-background">
                  <div className="w-full max-w-[1280px] px-auto flex flex-col flex-1">
                     <Ticker />
                     <Header />
                     <main className="flex-1 w-full min-h-screen font-dos">
                        <Suspense fallback={<Loading />}>{children}</Suspense>
                     </main>
                     <Footer />
                  </div>
               </div>
               <Toaster />
            </AppProviders>
         </body>
      </html>
   )
}
