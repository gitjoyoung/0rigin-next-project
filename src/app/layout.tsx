import { inter } from '@/app/ui/fonts'
import './ui/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import RootLayoutClient from '@/widgets/layouts/RootLayout/ui/RootLayoutClient'

export const metadata = {
   title: {
      default: 'HOME | 0rigin project',
      template: '%s | 0rigin project',
   },
   description: '제로리진 프로젝트',
   keywords: ['origin', '0rigin'],
   icon: '/favicon.ico',
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en" className="dark">
         <body>
            <div id="modal-root" />
            <RootLayoutClient>{children}</RootLayoutClient>
            <SpeedInsights />
         </body>
      </html>
   )
}
