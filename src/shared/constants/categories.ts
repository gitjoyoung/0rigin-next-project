import {
  Calculator,
  Code,
  FlaskConical,
  MessageSquare,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

import { ROUTE_BOARD } from "@/constants/pathname";

export interface CategoryItem {
  id: string;
  title: string;
  slug: string;
  url: string;
  icon: LucideIcon;
  description?: string;
}

// 통합 카테고리 상수
export const CATEGORIES: CategoryItem[] = [
  {
    id: "latest",
    title: "최신글",
    slug: "latest",
    url: `${ROUTE_BOARD}/latest`,
    icon: Newspaper,
    description: "모든 게시판의 최신 게시글",
  },
  {
    id: "philosophy",
    title: "철학 게시판",
    slug: "philosophy",
    url: `${ROUTE_BOARD}/philosophy`,
    icon: Code,
    description: "철학적 사고와 토론",
  },
  {
    id: "technology",
    title: "기술 게시판",
    slug: "technology",
    url: `${ROUTE_BOARD}/technology`,
    icon: MessageSquare,
    description: "기술 관련 정보와 토론",
  },
  {
    id: "science",
    title: "과학 게시판",
    slug: "science",
    url: `${ROUTE_BOARD}/science`,
    icon: FlaskConical,
    description: "과학 지식과 연구",
  },
  {
    id: "mathematics",
    title: "수학 게시판",
    slug: "mathematics",
    url: `${ROUTE_BOARD}/mathematics`,
    icon: Calculator,
    description: "수학 문제와 이론",
  },
] as const;

// 유틸리티 함수들
export const getCategoryBySlug = (slug: string): CategoryItem | undefined => {
  return CATEGORIES.find((category) => category.slug === slug);
};

export const getCategoryById = (id: string): CategoryItem | undefined => {
  return CATEGORIES.find((category) => category.id === id);
};

// 글쓰기 가능한 카테고리 (latest 제외)
export const getWritableCategories = (): CategoryItem[] => {
  return CATEGORIES.filter((category) => category.id !== "latest");
};

// 헤더 메뉴용 카테고리 (모든 카테고리)
export const getHeaderMenuCategories = (): CategoryItem[] => {
  return [...CATEGORIES];
};
