import './ui/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import RootLayoutClient from '@/widgets/layouts/RootLayout/ui/RootLayoutClient'
import { ThemeProvider } from 'next-themes'
import { Roboto } from 'next/font/google'
import { cn } from '@/shared/utils/cn'
import { SessionProvider } from 'next-auth/react'

const roboto = Roboto({
   weight: '400',
   subsets: ['latin'],
})

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en" className={cn('dark', roboto.className)}>
         <body>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <div id="modal-root" />
               <SessionProvider>
                  <RootLayoutClient>{children}</RootLayoutClient>
               </SessionProvider>
               <SpeedInsights />
            </ThemeProvider>
         </body>
      </html>
   )
}
