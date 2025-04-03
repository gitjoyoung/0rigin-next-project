import Spinner from '@/shared/ui/spinner/loader-sppiner'

export default function loading() {
   return (
      <section className="flex justify-center items-center w-full h-[300px]">
         <Spinner />
      </section>
   )
}
