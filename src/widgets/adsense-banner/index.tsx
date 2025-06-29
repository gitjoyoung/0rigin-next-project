import Image from 'next/image'

type BackgroundType = 'image' | 'video'

// 배너 설정 상수 객체
const BANNER_CONFIG = {
   type: 'video' as BackgroundType,
   image: {
      src: '/images/mascot/new_logo.webp',
      alt: '0rigin 로고',
   },
   video: {
      src: '/videos/sample-logo-video.mp4',
   },
   text: {
      title: '0rigin에 오신 것을 환영합니다!',
      description:
         '여러분의 일상을 더 특별하게 만들어드릴 0rigin과 함께하세요. 지금 바로 시작해보세요!',
   },
} as const

export default function AdSenseBanner() {
   return (
      <div className="relative w-full h-[300px]">
         {BANNER_CONFIG.type === 'image' ? (
            <Image
               src={BANNER_CONFIG.image.src}
               alt={BANNER_CONFIG.image.alt}
               fill
               sizes="100vw"
               className="object-cover"
               priority
            />
         ) : (
            <video
               autoPlay
               muted
               loop
               playsInline
               className="absolute inset-0 w-full h-full object-cover"
            >
               <source src={BANNER_CONFIG.video.src} type="video/mp4" />
               브라우저가 비디오를 지원하지 않습니다.
            </video>
         )}
         {/* 반투명 오버레이 */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
         <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
            <h2 className="text-white text-3xl font-bold drop-shadow-lg mb-2 sr-only">
               {BANNER_CONFIG.text.title}
            </h2>
            <p className="text-white/90 text-lg drop-shadow-md sr-only">
               {BANNER_CONFIG.text.description}
            </p>
         </div>
      </div>
   )
}
