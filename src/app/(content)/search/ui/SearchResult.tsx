interface Props {
   keyword: string
}

export default async function SearchResult({ keyword }: Props) {
   const gptResult = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/search/gpt/`,
      {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ keyword }),
      },
   )
   const resultJson = await gptResult.json()

   return (
      <div className=" flex-col gap-2 py-2">
         <h2 className="p-1 font-bold text-xl ">GPT-3.5 답변</h2>
         <div className=" p-2 whitespace-pre-line border-dotted rounded-lg border-black border">
            <p>{resultJson.data}</p>
         </div>
      </div>
   )
}
