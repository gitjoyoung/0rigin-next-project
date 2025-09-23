import { generateQRCodeDataURL } from "@/shared/ui/qr-code";

/**
 * 0rigin.space 도메인용 QR 코드 생성 유틸리티
 */

// 기본 도메인
const BASE_DOMAIN = "https://0rigin.space";

// 자주 사용되는 경로들
export const ORIGIN_PATHS = {
  HOME: "",
  BOARD: "/board",
  QUIZ: "/quiz",
  INTRODUCE: "/introduce",
  HELP: "/help",
  UTILS: "/utils",
  QR: "/utils/qr",
} as const;

/**
 * 0rigin.space의 특정 경로에 대한 QR 코드를 생성합니다.
 */
export async function generateOriginQR(
  path: string = "",
  options?: {
    size?: number;
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  },
): Promise<string> {
  const fullUrl = path.startsWith("http") ? path : `${BASE_DOMAIN}${path}`;

  return generateQRCodeDataURL(fullUrl, {
    width: options?.size || 200,
    errorCorrectionLevel: options?.errorCorrectionLevel || "M",
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });
}

/**
 * 0rigin.space 홈페이지 QR 코드 생성
 */
export function generateHomeQR(size?: number): Promise<string> {
  return generateOriginQR(ORIGIN_PATHS.HOME, { size });
}

/**
 * 0rigin.space 게시판 QR 코드 생성
 */
export function generateBoardQR(
  category?: string,
  size?: number,
): Promise<string> {
  const path = category
    ? `${ORIGIN_PATHS.BOARD}/${category}`
    : ORIGIN_PATHS.BOARD;
  return generateOriginQR(path, { size });
}

/**
 * 0rigin.space 퀴즈 QR 코드 생성
 */
export function generateQuizQR(size?: number): Promise<string> {
  return generateOriginQR(ORIGIN_PATHS.QUIZ, { size });
}

/**
 * QR 코드를 파일로 다운로드합니다.
 */
export async function downloadQR(
  url: string,
  filename?: string,
  size?: number,
): Promise<void> {
  try {
    const dataURL = await generateOriginQR(url, { size });

    const link = document.createElement("a");
    link.download = filename || `qr-code-${Date.now()}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("QR 코드 다운로드 실패:", error);
    throw error;
  }
}

/**
 * QR 코드를 클립보드에 복사합니다.
 */
export async function copyQRToClipboard(
  url: string,
  size?: number,
): Promise<void> {
  try {
    const dataURL = await generateOriginQR(url, { size });

    const response = await fetch(dataURL);
    const blob = await response.blob();

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
  } catch (error) {
    console.error("QR 코드 클립보드 복사 실패:", error);
    throw error;
  }
}

/**
 * 사용 예시:
 *
 * // 홈페이지 QR 코드
 * const homeQR = await generateHomeQR(200);
 *
 * // 특정 게시판 카테고리 QR 코드
 * const boardQR = await generateBoardQR("tech", 150);
 *
 * // QR 코드 다운로드
 * await downloadQR("/quiz", "quiz-qr-code.png", 300);
 *
 * // QR 코드 클립보드 복사
 * await copyQRToClipboard("/introduce");
 */
