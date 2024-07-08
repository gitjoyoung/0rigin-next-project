import React from 'react'
import StockHeader from './StockHeader'
import StockChart from './StockChart'
import StockReportList from './StockReportList'
import StockAnalyst from './StockAnalyst'
import StockPriceChart from './StockPriceChart'
import StockIconAndTitle from './common/StockIconAndTitle'
import StockIntro from './StockIntro'
import { StockPrice } from '@/service/stock/stockApi'

interface Props {
   data: StockPrice[]
}

export default function StockMain({ data }: Props) {
   return (
      <div className=" bg-black flex flex-col gap-3 p-2">
         {/* 헤더 영역 */}
         <div className="bg-white rounded-3xl flex">
            <StockIconAndTitle title={'애플'} stock={'AAPL'} />
         </div>

         {/* 첫번째 라인  */}
         <div className="flex gap-2">
            {/* 주식 정보  */}
            <div className="bg-white rounded-3xl">
               <StockIntro />
            </div>
            {/* 차트 */}
            <div className=" bg-white rounded-[32px] ">
               <StockPriceChart />
            </div>
         </div>
         {/* 두번째 라인 */}
         <div className="flex gap-2">
            <div className=" rounded-[32px] bg-white w-[387px] flex flex-col p-8 gap-6 h-[304] border">
               <StockHeader />
               <div className="flex  w-[330px] h-[168] items-center justify-between ">
                  <StockChart />
                  <StockReportList />
               </div>
            </div>
            <div className="bg-white rounded-[32px] p-8">
               <StockAnalyst />
            </div>
         </div>
      </div>
   )
}
