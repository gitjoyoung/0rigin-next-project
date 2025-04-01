import Image from 'next/image'

export default function AdBanner() {
   return (
      <div className="relative w-full h-[200px]">
         <Image
            src="/image/newYear.jpg"
            alt="지수랑 첫해"
            fill
            sizes="100vw"
            className="object-cover"
            priority
         />
         {/* 반투명 오버레이 */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/50 " />
         <div className="absolute inset-0 flex items-center justify-center z-20">
            <h2 className="text-white text-xl font-bold drop-shadow-md">
               새해 복 많이 받으세요! 🎉
            </h2>
         </div>
      </div>
   )
}
