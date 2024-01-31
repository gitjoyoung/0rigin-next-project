import Banner from '@/components/Banner/Banner'
import BoardContent from '@/components/Board/BoardContent'

export default async function Home() {
   return (
      <>
         <Banner />
         <div className="flex flex-wrap justify-between border my-3 border-black p-1 ">
            <BoardContent tap="normal" page={0} />
            <BoardContent tap="special" page={0} />
         </div>
      </>
   )
}
