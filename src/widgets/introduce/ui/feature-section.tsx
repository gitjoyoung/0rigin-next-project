import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureSectionProps {
  features: Feature[];
}

export default function FeatureSection({ features }: FeatureSectionProps) {
  return (
    <div className="mb-16">
      <h2 className="text-lg sm:text-2xl font-semibold text-center mb-4">
        주요 카테고리
      </h2>
      {/* 데스크톱 그리드 */}
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="text-center hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <div className="text-3xl mb-2">{feature.icon}</div>
              <CardTitle className="text-sm sm:text-lg">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs sm:text-sm">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 모바일/태블릿 슬라이더 */}
      <div className="lg:hidden">
        <div className="flex sm:justify-center gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex-none w-48 text-center hover:shadow-md transition-shadow snap-start"
            >
              <CardHeader>
                <div className="text-2xl sm:text-3xl mb-2">{feature.icon}</div>
                <CardTitle className="text-sm sm:text-lg">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs sm:text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
