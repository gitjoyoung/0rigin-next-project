import BoardSearchResult from './board-search-result'
import QuizSearchResult from './quiz-search-result'

interface SearchBoardProps {
   postSearchResult: any[]
   quizSearchResult: any[]
   keyword: string
   postCount: number
   quizCount: number
   totalCount: number
}

export default async function SearchBoard({
   postSearchResult,
   quizSearchResult,
   keyword,
   postCount,
   quizCount,
   totalCount,
}: SearchBoardProps) {
   return (
      <article className="space-y-4">
         <QuizSearchResult
            searchResult={quizSearchResult}
            keyword={keyword}
            totalCount={quizCount}
         />
         <BoardSearchResult
            searchResult={postSearchResult}
            keyword={keyword}
            totalCount={postCount}
         />
      </article>
   )
}
