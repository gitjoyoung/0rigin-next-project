export const RECOMMENDED_KEYWORDS = [
  "취업",
  "연애",
  "결혼",
  "육아",
  "학업",
  "직장생활",
  "인간관계",
  "자기계발",
  "건강",
  "돈",
  "집",
  "취미",
  "여행",
  "미래",
  "꿈",
] as const;

export type RecommendedKeyword = (typeof RECOMMENDED_KEYWORDS)[number];
