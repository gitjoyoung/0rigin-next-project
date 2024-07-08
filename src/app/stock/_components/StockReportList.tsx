
export default function StockReportList() {
   const data = {
      주식: 10.1,
      투자지수: 20.0,
      수익성: -30.0,
      성장성: 40.0,
      관심도: 50.0,
   }

   const width = 168
   const height = 168
   return (
      <div
         className={`flex flex-col w-[${width}] h-[${height}] justify-center rounded-2xl bg-[#F9F9F9] py-3 px-4  `}
      >
         {Object.entries(data).map(([key, value]) => (
            <div className="flex gap-3 justify-between m-1 text-sm" key={key}>
               <p className="">{key}</p>
               <h1 className={`${value > 0 ? 'text-red-600' : 'text-sky-600'}`}>
                  {value > 0 ? '▲' : '▼'}
                  {value}%
               </h1>
            </div>
         ))}
      </div>
   )
}
