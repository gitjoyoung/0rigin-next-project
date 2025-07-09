import Particles from './particles'

export default function LogoParticle() {
   return (
      <div className="relative w-full sm:h-[300px] h-[200px]">
         <Particles />
         <h1 className="font-dos sm:text-2xl text-xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black dark:text-white">
            0RIGIN
         </h1>
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
