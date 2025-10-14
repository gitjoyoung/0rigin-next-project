import Image from "next/image";

interface IntroHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export default function IntroHeader({
  title,
  subtitle,
  description,
  image,
}: IntroHeaderProps) {
  return (
    <div className="text-center mb-16 space-y-8">
      {/* 로고 */}
      <div className="flex justify-center">
        <div className="relative group">
          <Image
            src={image}
            alt="0RIGIN 로고"
            width={160}
            height={160}
            className="rounded-2xl transition-transform duration-300 group-hover:scale-105"
            style={{ objectFit: "cover" }}
            priority
          />
          {/* 로고 뒤 그라디언트 효과 */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {/* 메인 타이틀 - 임팩트 강조 */}
        <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {title}
        </h1>

        {/* 서브타이틀 - 브랜드 정체성 */}
        <p className="text-base sm:text-xl font-semibold text-foreground/90">
          {subtitle}
        </p>

        {/* 디스크립션 - 간결한 설명 */}
        <p className="text-sm sm:text-base leading-relaxed break-keep text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
