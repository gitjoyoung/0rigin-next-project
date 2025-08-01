import { LoadingSpinner } from '@/shared/ui/loading-spinner'

interface LoadingModalProps {
   isOpen: boolean
}

export default function LoadingModal({ isOpen }: LoadingModalProps) {
   if (!isOpen) return null

   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <LoadingSpinner />
         </div>
      </div>
   )
}
