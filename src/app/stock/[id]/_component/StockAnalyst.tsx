import React from 'react'
import StockPriceAndChange from './common/StockPriceAndChange'
import StockIconAndTitle from './common/StockIconAndTitle'

export default function StockAnalyst() {
   const title = '애플'
   const stock = 'AAPL'
   const price = 1000
   const fluctuation = 1.75
   const changeRate = 0.82
   const content =
      '급격한 금리 인상에도 견조한 자동차 수요를 반영하여 테슬라의 목표주가를 340달러로 26% 상향 조정하고 Top Pick으로 유지한다. 단기 상승에 따른 숨 고르기가 예상되지만, 중기적으로 동사의 경쟁우위는 더 강해지고 있다. 기존 OEM의 전기차 전환이 더디고 중국 신생 업체들의 현금 흐름이 약화되고있는 가운데, 테슬라의 멕시코 공장이 가동되면 전기차 제조 경쟁력 격차는 더 벌어질 것으로 예상된다.'
   return (
      <div className="flex flex-col gap-3">
         <h1 className=" text-3xl font-bold">0rigin AI 애널리스트 리포트</h1>
         <div className="flex  mt-8 items-center gap-2">
            <StockIconAndTitle title={title} stock={stock} />
            <StockPriceAndChange
               price={price}
               fluctuation={fluctuation}
               changeRate={changeRate}
            />
         </div>
         <p>{content}</p>
      </div>
   )
}
