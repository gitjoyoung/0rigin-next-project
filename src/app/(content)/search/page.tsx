import Search from './ui/Search'

interface SearchParams {
   searchParams: {
      keyword: string
   }
}

export default function page({ searchParams }: SearchParams) {
   const { keyword } = searchParams
   return <Search keyword={keyword} />
}
