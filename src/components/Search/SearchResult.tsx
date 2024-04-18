interface Props {
   result: string
   title: string
}

export default function SearchResult({ result, title }: Props) {
   return (
      <div className=" flex-col gap-2 py-2">
         <h2 className="p-1 font-bold text-xl ">{title}</h2>
         <div className=" p-2 whitespace-pre-line border-dotted rounded-lg border-black border">
            <p>{result}</p>
         </div>
      </div>
   )
}
