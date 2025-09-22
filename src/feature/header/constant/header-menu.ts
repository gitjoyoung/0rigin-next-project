import {
  Blocks,
  ImageIcon,
  LayoutGrid,
  LucideIcon,
  PlusSquare,
} from "lucide-react";

import {
  ROUTE_QUIZ,
  ROUTE_QUIZ_CREATE,
  ROUTE_UTILS,
  ROUTE_UTILS_IMAGE_CONVERTER,
  ROUTE_UTILS_MEMO,
} from "@/constants/pathname";

export interface SubMenuItem {
  id: string;
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface MenuItem {
  id: string;
  title: string;
  url?: string;
  submenuItems?: SubMenuItem[];
}

// 통합 카테고리 상수 사용
import { getHeaderMenuCategories } from "@/shared/constants/categories";

export const BOARD_MENU_LIST: SubMenuItem[] = getHeaderMenuCategories().map(
  (category) => ({
    id: category.id,
    title: category.title,
    url: category.url,
    icon: category.icon,
  }),
);

export const QUIZ_MENU_LIST: SubMenuItem[] = [
  {
    id: "all-quiz",
    title: "전체 퀴즈",
    url: ROUTE_QUIZ,
    icon: LayoutGrid,
  },
  {
    id: "create-quiz",
    title: "퀴즈 만들기",
    url: ROUTE_QUIZ_CREATE,
    icon: PlusSquare,
  },
] as const;

export const UTILS_MENU_LIST: SubMenuItem[] = [
  {
    id: "all-utils",
    title: "전체 유틸리티",
    url: ROUTE_UTILS,
    icon: Blocks,
  },
  {
    id: "image-converter",
    title: "이미지 변환기",
    url: ROUTE_UTILS_IMAGE_CONVERTER,
    icon: ImageIcon,
  },
  {
    id: "memo",
    title: "메모장",
    url: ROUTE_UTILS_MEMO,
    icon: ImageIcon,
  },
] as const;

export const HEADER_NAV_LIST: MenuItem[] = [
  {
    id: "board",
    title: "게시판",
    submenuItems: [...BOARD_MENU_LIST],
  },
  {
    id: "quiz",
    title: "퀴즈",
    submenuItems: [...QUIZ_MENU_LIST],
  },
  {
    id: "utils",
    title: "유틸리티",
    submenuItems: [...UTILS_MENU_LIST],
  },
];
