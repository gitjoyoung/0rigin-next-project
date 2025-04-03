import { AuthProvider } from '@/providers/auth-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
         <AuthProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
         </AuthProvider>
         <SpeedInsights />
      </ThemeProvider>
   )
}
