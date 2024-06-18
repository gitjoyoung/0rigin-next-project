import React from 'react'
import StockHeader from './StockHeader'
import StockCard from './StockCard'
import StockChart from './StockChart'
import StockReport from './StockReport'
import StockSummary from './StockSummary'

export default function StockMain() {
   return (
      <div>
         {/* 헤더 영역 */}
         <StockHeader />
         <div className="flex">
            <div className="flex col">
               <StockCard />
               <StockSummary />
            </div>
            <StockChart />
         </div>
         <div className='flex'>
            <StockReport />
            <StockChart />
         </div>
      </div>
   )
}
