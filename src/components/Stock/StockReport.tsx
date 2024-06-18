import React from 'react'

export default function StockReport() {
   return (
      <div>
         {/* AI 리포트 타이틀 */}
         <h1>AI 리포트</h1>
         {/* AI 카드 */}
         <div>
            <div className="flex justify-between">
               <div>
                  <h1>애플</h1>
                  <p>AAPL (애플 기호)</p>
               </div>
               <button> icon 버튼 더보기</button>
            </div>
         </div>
         {/* AI 리포트 */}
         <div className="flex">
            {/* 오각 차트 */}
            <div>오각 차트</div>
            {/* 다양한 분석 프로그레스 바 */}
            <div>
               <div className="flex">
                  <div>
                     <h1>주식시장 전망</h1>
                     <p>동종업계간</p>
                  </div>
                  <div> 프로그레스 바</div>
               </div>
               <div className="flex">
                  <div>
                     <h1>시세 및 거래량</h1>
                     <p>동종업계간</p>
                  </div>
                  <div> 프로그레스 바</div>
               </div>
               <div className="flex">
                  <div>
                     <h1>주가 상승률</h1>
                     <p>동종업계간</p>
                  </div>

                  <div> 프로그레스 바</div>
               </div>
               <div className="flex">
                  {' '}
                  <div>
                     <h1>순이익</h1>
                     <p>동종업계간</p>
                  </div>
                  <div> 프로그레스 바</div>
               </div>
               <div className="flex">
                  {' '}
                  <div>
                     <h1>배당 수익률</h1>
                     <p>동종업계간</p>
                  </div>
                  <div> 프로그레스 바</div>
               </div>
            </div>
         </div>
      </div>
   )
}
