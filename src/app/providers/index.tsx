import { Toaster } from '@/shared/shadcn/ui/toaster'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'
import AuthServerProvider from './auth-server-provider'
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
         <AuthServerProvider>
            <ReactQueryProvider>
               <Toaster />
               {children}
            </ReactQueryProvider>

            <SpeedInsights />
         </AuthServerProvider>
      </ThemeProvider>
   )
}
