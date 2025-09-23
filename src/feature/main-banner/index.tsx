import Image from "next/image";

export default function MainBanner() {
  return (
    <div className="relative w-full sm:h-[350px] h-[250px] text-black dark:text-white ">
      <div className="flex absolute inset-0 items-center justify-center px-8">
        <div className="flex items-start ">
          <Image
            src="/0rigin-qr.png"
            alt="QR Code"
            width={173}
            height={173}
            className="object-contain flex-shrink-0"
          />
          <div className="flex flex-col font-dos font-bold antialiased mt-5">
            <h1 className="text-xl ">0RIGIN.SPACE</h1>
            <h2 className="text-xl">VERSION</h2>
            <h2 className="text-xl">1.7.3</h2>
          </div>
        </div>
      </div>

      <span className="absolute top-0 left-0 text-[5px] select-none pointer-events-none">
        CARBON
      </span>
      <span className="absolute top-0 right-0 text-[5px] select-none pointer-events-none">
        HYDROGEN
      </span>
      <span className="absolute bottom-0 left-0 text-[5px] select-none pointer-events-none">
        OXYGEN
      </span>
      <span className="absolute bottom-0 right-0 text-[5px] select-none pointer-events-none">
        NITROGEN
      </span>
    </div>
  );
}
