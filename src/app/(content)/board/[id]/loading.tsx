import Spinner from '@/components/common/loading/Spinner'

export default function loading() {
   return (
      <section className="flex justify-center items-center w-full h-[300px]">
         <Spinner />
      </section>
   )
}
