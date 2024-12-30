import './ui/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import RootLayoutClient from '@/widgets/layouts/RootLayout/ui/RootLayoutClient'
import { ThemeProvider } from 'next-themes'
import { Roboto } from 'next/font/google'
import { cn } from '@/shared/utils/cn'

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
               <RootLayoutClient>{children}</RootLayoutClient>
               <SpeedInsights />
            </ThemeProvider>
         </body>
      </html>
   )
}
