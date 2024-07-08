
export default function StockSummary() {
   return (
      <div>
         {/* 타이틀 */}
         <h1>애널 리스트 분석 의견</h1>
         {/* 애널리스트 카드 */}
         <div>
            {/* 애널리스트 카드 헤더 */}
            <div>
               <h2>보통</h2>
               <sub>2024.06.05</sub>
            </div>
            {/* 채트 및 개요 */}
            <div className="flex">
               <div>그래프</div>
               <div className="">
                  <div>
                     <h1>성장도</h1>
                     <p>40%</p>
                  </div>
                  <div>
                     <h1>영업이익률</h1>
                     <p>30.74%</p>
                  </div>
                  <div>
                     <h1>부채비율</h1>
                     <p>180.40%</p>
                  </div>
               </div>
            </div>
            <div>
               <h1>
                  스마트 기기를 넘어서 다양한 콘텐츠를 제공하고자 하는 애플은
               </h1>
            </div>
         </div>
      </div>
   )
}
