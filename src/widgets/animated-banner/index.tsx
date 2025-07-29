import { QUOTES } from './\bconstants/quotes'
import Particles from './ui/particles'

export default function AnimatedBanner() {
   const currentQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]

   return (
      <div className="relative w-full sm:h-[400px] h-[300px]">
         <Particles />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-4 w-[90%] ">
            <div className="relative">
               <p className="absolute inset-0 text-base sm:text-xl text-white italic whitespace-pre-wrap blur-sm">
                  &ldquo;{currentQuote.text}&rdquo;
               </p>
               <p className="relative text-base sm:text-xl text-black dark:text-white italic whitespace-pre-wrap">
                  &ldquo;{currentQuote.text}&rdquo;
               </p>
            </div>

            <div className="relative">
               <p className="absolute inset-0 text-xs sm:text-sm text-white italic whitespace-pre-wrap blur-sm">
                  {currentQuote.author}
               </p>
               <p className="relative text-xs sm:text-sm text-black dark:text-white italic whitespace-pre-wrap">
                  {currentQuote.author}
               </p>
            </div>
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
