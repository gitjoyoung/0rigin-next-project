import { LoadingSpinner } from '@/shared/ui/spinner/loading-spinner'

export default function loading() {
   return (
      <div className="flex justify-center items-center">
         <LoadingSpinner />
      </div>
   )
}
