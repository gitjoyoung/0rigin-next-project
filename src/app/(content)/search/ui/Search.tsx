import SearchResult from './SearchResult'
import SearchBoard from './SearchBoard'
import SearchBox from '@/widgets/SearchBox'

interface Props {
   keyword: string
}

export default function Search({ keyword }: Props) {
   return (
      <section>
         <div className="py-2 px-2 flex-col gap-3">
            <SearchResult keyword={keyword} />
            <SearchBoard keyword={keyword} />
         </div>
         <div className="m-3 justify-end flex">
            <SearchBox />
         </div>
      </section>
   )
}
