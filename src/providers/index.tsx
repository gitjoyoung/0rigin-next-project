import { AuthProvider } from '@/providers/auth-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import ReactQueryProvider from './react-query-provider'

interface AppProvidersProps {
   children: React.ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
   return (
      <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
      >
         <SessionProvider>
            <AuthProvider>
               <ReactQueryProvider>{children}</ReactQueryProvider>
            </AuthProvider>
         </SessionProvider>
         <SpeedInsights />
      </ThemeProvider>
   )
}
