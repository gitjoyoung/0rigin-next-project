export function MemoAppIcon({ onClick }: { onClick: () => void }) {
   // 더블클릭 감지 로직 제거, 단일 클릭/탭만으로 동작
   return (
      <div
         className="flex flex-col items-center cursor-pointer select-none "
         onClick={onClick}
         tabIndex={0}
      >
         <div className="bg-transparent flex items-center justify-center">
            <span
               role="img"
               aria-label="메모장"
               className="text-2xl text-gray-700 dark:text-gray-300"
            >
               📝
            </span>
         </div>
         <span className="text-[11px] mt-1 text-center">메모장</span>
      </div>
   )
}
