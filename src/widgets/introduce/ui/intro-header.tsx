import Image from "next/image";

interface IntroHeaderProps {
  title: string;
  description: string;
  image: string;
}

export default function IntroHeader({
  title,
  description,
  image,
}: IntroHeaderProps) {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-6">
        <Image
          src={image}
          alt="0RIGIN 로고"
          width={200}
          height={200}
          className="rounded-lg"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-lg sm:text-2xl font-bold">{title}</h1>
        <p className="text-xs sm:text-base leading-relaxed break-keep text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
