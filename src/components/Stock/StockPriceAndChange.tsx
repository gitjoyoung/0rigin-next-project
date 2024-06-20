import React from 'react'

export default function StockPriceAndChange({
   price,
   fluctuation,
   changeRate,
}) {
   return (
      <div className="flex gap-0.5 text-sm">
         <p className="font-bold">{price}</p>
         <p
            className={`${fluctuation > 0 ? 'text-red-500 ' : 'text-blue-500'} font-semibold`}
         >
            {fluctuation > 0 ? '▲' : '▼'}
            {fluctuation.toString()}
         </p>
         <p
            className={`${changeRate > 0 ? 'text-red-500 ' : 'text-blue-500'} font-semibold`}
         >
            {changeRate > 0 ? '+' + changeRate : '-' + changeRate}%
         </p>
      </div>
   )
}
