// 자동 생성된 경로 상수 - 수정하지 마세요
// 생성 시간: 2025-10-28 15:04:34
export const ROUTE_FORGET_PASSWORD = "/forget/password";
export const ROUTE_LOGIN = "/login";
export const ROUTE_RESET_PASSWORD = "/reset/password";
export const ROUTE_SIGN_COMPLETE_PROFILE = "/sign/complete-profile";
export const ROUTE_SIGN_FORM = "/sign/form";
export const ROUTE_SIGN = "/sign";
export const ROUTE_SIGN_WELCOME = "/sign/welcome";
export const ROUTE_BOARD = "/board";
export const ROUTE_QUESTION = "/question";
export const ROUTE_QUIZ_CREATE = "/quiz/create";
export const ROUTE_QUIZ = "/quiz";
export const ROUTE_UTILS_IMAGE_CONVERTER = "/utils/image-converter";
export const ROUTE_UTILS_MEMO = "/utils/memo";
export const ROUTE_UTILS = "/utils";
export const ROUTE_UTILS_QR = "/utils/qr";
export const ROUTE_HELP = "/help";
export const ROUTE_INQUIRY = "/inquiry";
export const ROUTE_INTRODUCE = "/introduce";
export const ROUTE_SITE_MAP = "/site-map";
export const ROUTE_MY_PAGE = "/my-page";

// 동적 라우트 헬퍼 함수
export const getProfileRoute = (userId: string) => `/profile/${userId}`;
