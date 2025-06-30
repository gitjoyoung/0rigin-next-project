import { Icons } from '@/shared/ui/icons'
import { cn } from '@/shared/utils/cn'

interface SignUpProgressHeaderProps {
   isTermsAccepted: boolean
   secondStepLabel: string
}

export default function SignUpProgressHeader({
   isTermsAccepted,
   secondStepLabel,
}: SignUpProgressHeaderProps) {
   return (
      <div className="w-full max-w-xs mx-auto mb-8 flex items-center justify-between">
         {/* Step 1 */}
         <div className="flex flex-col items-center flex-1">
            <div
               className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium',
                  isTermsAccepted
                     ? 'bg-primary text-primary-foreground'
                     : 'bg-primary text-primary-foreground',
               )}
            >
               {isTermsAccepted ? <Icons.check className="w-4 h-4" /> : 1}
            </div>
            <span className={cn('mt-1 text-xs', 'text-foreground')}>
               약관동의
            </span>
         </div>

         {/* 진행선 */}
         <div className="flex-1 h-px bg-border mx-2" />

         {/* Step 2 */}
         <div className="flex flex-col items-center flex-1">
            <div
               className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium',
                  isTermsAccepted
                     ? 'bg-primary text-primary-foreground'
                     : 'bg-muted text-muted-foreground',
               )}
            >
               2
            </div>
            <span
               className={cn(
                  'mt-1 text-xs',
                  isTermsAccepted ? 'text-foreground' : 'text-muted-foreground',
               )}
            >
               {secondStepLabel}
            </span>
         </div>
      </div>
   )
}
