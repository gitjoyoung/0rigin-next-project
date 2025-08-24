import {
  Blocks,
  Calculator,
  Code,
  FlaskConical,
  ImageIcon,
  LayoutGrid,
  LucideIcon,
  MessageSquare,
  Newspaper,
  PlusSquare,
} from "lucide-react";

import {
  ROUTE_BOARD,
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

export const BOARD_MENU_LIST: SubMenuItem[] = [
  {
    id: "latest",
    title: "최신글",
    url: `${ROUTE_BOARD}/latest`,
    icon: Newspaper,
  },
  {
    id: "philosophy",
    title: "철학 게시판",
    url: `${ROUTE_BOARD}/philosophy`,
    icon: Code,
  },
  {
    id: "technology",
    title: "기술 게시판",
    url: `${ROUTE_BOARD}/technology`,
    icon: MessageSquare,
  },
  {
    id: "science",
    title: "과학 게시판",
    url: `${ROUTE_BOARD}/science`,
    icon: FlaskConical,
  },
  {
    id: "mathematics",
    title: "수학 게시판",
    url: `${ROUTE_BOARD}/mathematics`,
    icon: Calculator,
  },
] as const;

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
