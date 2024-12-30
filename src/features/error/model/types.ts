// features/error/model/types.ts
export interface ErrorProps {
   error: Error & { digest?: string }
   reset: () => void
   customMessage?: string
}
