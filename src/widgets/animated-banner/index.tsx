import Particles from './particles'

// 명언 10개 JSON 형식 상수
const QUOTES = [
   {
      text: '삶은 당신이 만드는 것이다. 과거에도 그랬고, 앞으로도 그럴 것이다.',
      author: '에이브러햄 링컨',
   },
   {
      text: '성공의 비밀은 단순하다. 당신이 하는 일을 사랑하라.',
      author: '마하트마 간디',
   },
   {
      text: '가장 큰 영광은 한 번도 넘어지지 않는 것이 아니라, 매번 일어나는 데에 있다.',
      author: '공자',
   },
   {
      text: '미래는 현재 우리가 무엇을 하는가에 달려있다.',
      author: '마하트마 간디',
   },
   {
      text: '행동은 꿈을 현실로 만드는 유일한 방법이다.',
      author: '스티브 잡스',
   },
   {
      text: '실패는 성공의 어머니이다. 실패에서 배우라.',
      author: '빌 게이츠',
   },
   {
      text: '시간은 가장 귀중한 자원이다. 그것을 현명하게 사용하라.',
      author: '워렌 버핏',
   },
   {
      text: '지식은 힘이다. 배움은 평생의 여정이다.',
      author: '프랜시스 베이컨',
   },
   {
      text: '창의성은 지능을 재미있게 만드는 것이다.',
      author: '알버트 아인슈타인',
   },
   {
      text: '진정한 리더는 다른 사람들이 성장할 수 있도록 돕는 사람이다.',
      author: '존 맥스웰',
   },
]

export default function AnimatedBanner() {
   const currentQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]

   return (
      <div className="relative w-full sm:h-[400px] h-[300px]">
         <Particles />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-4 w-[90%] ">
            <p className="text-base sm:text-xl text-black dark:text-white italic whitespace-pre-wrap ">
               &ldquo;{currentQuote.text}&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
               {currentQuote.author}
            </p>
         </div>

         <span className="absolute top-0 left-0 text-[5px] text-black select-none pointer-events-none">
            CARBON
         </span>
         <span className="absolute top-0 right-0 text-[5px] text-black select-none pointer-events-none">
            HYDROGEN
         </span>
         <span className="absolute bottom-0 left-0 text-[5px] text-black select-none pointer-events-none">
            OXYGEN
         </span>
         <span className="absolute bottom-0 right-0 text-[5px] text-black select-none pointer-events-none">
            NITROGEN
         </span>
      </div>
   )
}
