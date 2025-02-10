import Image from 'next/image'

export default function AdBanner() {
   return (
      <div className="relative w-full h-[200px] overflow-hidden shadow-lg shadow-black/30">
         {/* 반투명 오버레이 */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-10" />
         <Image
            src="/image/newYear.jpg"
            alt="지수랑 첫해"
            fill
            style={{ objectFit: 'cover', objectPosition: '0% 40%' }}
            priority
         />

         <div className="absolute inset-0 flex items-center justify-center z-20">
            <h2 className="text-white text-xl font-bold drop-shadow-md">
               새해 복 많이 받으세요! 🎉
            </h2>
         </div>
      </div>
   )
}
