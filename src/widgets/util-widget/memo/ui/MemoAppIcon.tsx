export function MemoAppIcon({ onClick }: { onClick: () => void }) {
   // 더블클릭 감지 로직 제거, 단일 클릭/탭만으로 동작
   return (
      <div
         className="flex flex-col items-center cursor-pointer select-none w-12"
         onClick={onClick}
         tabIndex={0}
      >
         <div className="w-8 h-8 bg-white border border-gray-300 rounded shadow flex items-center justify-center">
            <span role="img" aria-label="메모장" className="text-lg">
               📝
            </span>
         </div>
         <span className="text-[10px] mt-1 text-center">메모장</span>
      </div>
   )
}
