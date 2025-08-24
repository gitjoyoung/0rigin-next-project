import {
  ROUTE_BOARD,
  ROUTE_FORGET_PASSWORD,
  ROUTE_HELP,
  ROUTE_INQUIRY,
  ROUTE_INTRODUCE,
  ROUTE_LOGIN,
  ROUTE_MY_PAGE,
  ROUTE_QUIZ,
  ROUTE_QUIZ_CREATE,
  ROUTE_RESET_PASSWORD,
  ROUTE_SIGN,
  ROUTE_UTILS,
  ROUTE_UTILS_IMAGE_CONVERTER,
} from "./pathname";

export const SITEMAP = [
  {
    category: "게시판",
    links: [
      { name: "전체 게시판", href: ROUTE_BOARD },
      { name: "자유게시판", href: `${ROUTE_BOARD}/free` },
      { name: "철학", href: `${ROUTE_BOARD}/philosophy` },
      { name: "기술", href: `${ROUTE_BOARD}/technology` },
      { name: "과학", href: `${ROUTE_BOARD}/science` },
      { name: "수학", href: `${ROUTE_BOARD}/mathematics` },
    ],
  },
  {
    category: "퀴즈",
    links: [
      { name: "퀴즈 메인", href: ROUTE_QUIZ },
      { name: "프로그래밍 퀴즈", href: `${ROUTE_QUIZ}/programming` },
      { name: "과학 퀴즈", href: `${ROUTE_QUIZ}/science` },
      { name: "철학 퀴즈", href: `${ROUTE_QUIZ}/philosophy` },
      { name: "퀴즈 만들기", href: ROUTE_QUIZ_CREATE },
    ],
  },
  {
    category: "유틸리티",
    links: [
      { name: "유틸리티 메인", href: ROUTE_UTILS },
      { name: "이미지 변환기", href: ROUTE_UTILS_IMAGE_CONVERTER },
    ],
  },
  {
    category: "계정/사용자",
    links: [
      { name: "로그인", href: ROUTE_LOGIN },
      { name: "회원가입", href: ROUTE_SIGN },
      { name: "비밀번호 찾기", href: ROUTE_FORGET_PASSWORD },
      { name: "비밀번호 재설정", href: ROUTE_RESET_PASSWORD },
      { name: "마이페이지", href: ROUTE_MY_PAGE },
    ],
  },
  {
    category: "정보/고객지원",
    links: [
      { name: "소개", href: ROUTE_INTRODUCE },
      { name: "도움말", href: ROUTE_HELP },
      { name: "문의하기", href: ROUTE_INQUIRY },
      { name: "이용약관", href: `${ROUTE_SIGN}/term` },
    ],
  },
] as const;
