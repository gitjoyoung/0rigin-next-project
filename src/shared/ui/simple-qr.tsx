"use client";

import QRCode from "qrcode";
import { useEffect, useRef } from "react";

interface SimpleQRProps {
  value: string;
  size?: number;
  className?: string;
}

/**
 * 간단한 QR 코드 컴포넌트
 * 최소한의 설정으로 QR 코드를 생성합니다.
 */
export default function SimpleQR({
  value,
  size = 150,
  className = "",
}: SimpleQRProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;

    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 2,
      errorCorrectionLevel: "M",
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    }).catch(console.error);
  }, [value, size]);

  return (
    <div className={`inline-block ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
}

/**
 * 사용 예시:
 *
 * <SimpleQR value="https://0rigin.space" size={200} />
 * <SimpleQR value="https://0rigin.space/board" />
 * <SimpleQR value="연락처 정보나 기타 텍스트" className="border rounded" />
 */
