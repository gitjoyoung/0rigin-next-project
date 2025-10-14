const KEYWORDS = [
  "💭 질문하기",
  "💬 토론하기",
  "✨ 퀴즈",
  "🌱 학습",
  "🎯 깊이 있는 대화",
  "🚀 지적 호기심",
];

export default function InfinityScroll() {
  const once = KEYWORDS.map((keyword, index) => (
    <div
      key={index}
      className="px-6 py-2 h-10 rounded-full border border-border bg-muted/50 flex items-center justify-center font-semibold shrink-0 text-sm sm:text-base transition-all hover:scale-105 hover:bg-muted"
    >
      {keyword}
    </div>
  ));

  // 경계 문제 피하려고 '그룹 div' 없이 아이템을 평평하게 2번 이어 붙임
  const strip = [...once, ...once];

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-background to-transparent" />

      <ul
        className="
          flex min-w-max items-center   
          animate-infinite-scroll
          will-change-transform transform-gpu
          [backface-visibility:hidden]
          
        "
      >
        {strip.map((node, i) => (
          <li key={i} className="shrink-0 px-3 ">
            {node}
          </li>
        ))}
      </ul>
    </div>
  );
}
