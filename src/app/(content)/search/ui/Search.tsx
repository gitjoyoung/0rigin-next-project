import SearchResult from './SearchResult'
import SearchBoard from './SearchBoard'

interface Props {
   keyword: string
}

export default function Search({ keyword }: Props) {
   return (
      <section>
         <div className="py-2 px-2 flex-col gap-3">
            {/* <SearchResult keyword={keyword} /> */}
            <SearchBoard keyword={keyword} />
         </div>
      </section>
   )
}
