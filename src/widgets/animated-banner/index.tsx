import { QUOTES } from "./constants/quotes";
import Particles from "./ui/particles";

export default function AnimatedBanner() {
  const currentQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <div className="relative w-full sm:h-[350px] h-[250px]">
      <Particles />

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
  );
}
