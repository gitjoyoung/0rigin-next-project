export default function BannerSlide({
   currentIndex,
   isPaused,
   togglePlayPause,
}: {
   currentIndex: number
   isPaused: boolean
   togglePlayPause: () => void
}) {
   return (
      <div className="flex items-center">
         <div
            onClick={togglePlayPause}
            key={`${currentIndex}-${isPaused}`}
            aria-label="게시물 슬라이드 프로그레스바"
            className="relative flex-1 h-2 bg-white overflow-hidden cursor-pointer"
         >
            {!isPaused && (
               <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 z-10 bg-gradient-to-r bg-black animate-progress-bar" />
            )}
         </div>
      </div>
   )
}
