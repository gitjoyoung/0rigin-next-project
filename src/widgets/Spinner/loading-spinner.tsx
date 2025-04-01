import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
   className?: string
   text?: string
}

export const LoadingSpinner = ({
   className,
   text = '로딩중...',
}: LoadingSpinnerProps) => {
   return (
      <div
         className={cn(
            'inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
            className,
         )}
         role="status"
      >
         <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            {text}
         </span>
      </div>
   )
}
