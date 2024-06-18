import React from 'react'

export default function StockCard() {
   return (
      <div>
         {/* 카드 헤더 */}
         <div>
            {/* 심볼 */}
            <div>
               <h1>애플</h1>
               <h2>심볼</h2>
            </div>
            {/* 주가 */}
            <div>
               <h1>
                  주가 <sub>USD 화폐기호</sub>
               </h1>
               <h2>
                  0.32 등락 <sub>0.16퍼센트</sub>
               </h2>
            </div>
            <div>버튼</div>
         </div>
         {/* 주식 정보 */}
         <div className="flex gap-2">
            <p>1일 기준</p>
            <p>+62.192</p>
            <p>우량주</p>
            <p>관심급등</p>
         </div>
         {/* 카드 푸터 */}
         <div>
            <h1>1000명의 사람이 애플 주식에 관심이 있어요</h1>
            <p>지금 바로 관심 주식으로 등록 해보세요!</p>
         </div>
      </div>
   )
}
