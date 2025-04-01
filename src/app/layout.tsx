import { AuthProvider } from '@/providers/AuthProvider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Fira_Code, Roboto } from 'next/font/google'
import { Suspense } from 'react'
import GlobalLayoutClient from './global-layout-client'
import './globals.css'
import Loading from './loading'
import ReactQueryProviders from './ReactQueryProvider'

const roboto = Roboto({
   weight: '400',
   subsets: ['latin'],
})

const firaCode = Fira_Code({
   subsets: ['latin'],
   weight: ['400', '500', '700'],
   display: 'swap',
   variable: '--font-fira-code',
})

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html
         lang="ko"
         suppressHydrationWarning
         className={`${roboto.className} ${firaCode.variable}`}
      >
         <body>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <div id="modal-root" />
               <SessionProvider>
                  <AuthProvider>
                     <ReactQueryProviders>
                        <Suspense fallback={<Loading />}>
                           <GlobalLayoutClient>{children}</GlobalLayoutClient>
                        </Suspense>
                     </ReactQueryProviders>
                  </AuthProvider>
               </SessionProvider>
               <SpeedInsights />
            </ThemeProvider>
         </body>
      </html>
   )
}
