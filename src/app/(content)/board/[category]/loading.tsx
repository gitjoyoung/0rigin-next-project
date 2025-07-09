import { LoadingSpinner } from '@/shared/ui/loading-spinner'

export default function loading() {
   return (
      <section className="flex justify-center items-center w-full h-[300px]">
         <LoadingSpinner />
      </section>
   )
}
