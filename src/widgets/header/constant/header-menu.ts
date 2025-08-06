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

import { ROUTE_QUIZ, ROUTE_UTILS } from "@/constants/pathname";

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
    url: "/board/latest",
    icon: Newspaper,
  },
  { id: "latest", title: "철학 게시판", url: "/board/philosophy", icon: Code },
  {
    id: "philosophy",
    title: "철학 게시판",
    url: "/board/philosophy",
    icon: Code,
  },
  {
    id: "technology",
    title: "기술 게시판",
    url: "/board/technology",
    icon: MessageSquare,
  },
  {
    id: "science",
    title: "과학 게시판",
    url: "/board/science",
    icon: FlaskConical,
  },
  {
    id: "mathematics",
    title: "수학 게시판",
    url: "/board/mathematics",
    icon: Calculator,
  },
];

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
    url: "/quiz/create",
    icon: PlusSquare,
  },
];

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
    url: "/utils/image-converter",
    icon: ImageIcon,
  },
  {
    id: "memo",
    title: "메모장",
    url: "/utils/memo",
    icon: ImageIcon,
  },
];

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
