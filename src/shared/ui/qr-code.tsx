"use client";

import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

interface QRCodeComponentProps {
  value: string;
  size?: number;
  className?: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export default function QRCodeComponent({
  value,
  size = 200,
  className = "",
  errorCorrectionLevel = "M",
  margin = 4,
  color = {
    dark: "#000000",
    light: "#FFFFFF",
  },
}: QRCodeComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current || !value) return;

      try {
        await QRCode.toCanvas(canvasRef.current, value, {
          width: size,
          margin,
          errorCorrectionLevel,
          color,
        });
        setError(null);
      } catch (err) {
        console.error("QR 코드 생성 실패:", err);
        setError("QR 코드 생성에 실패했습니다.");
      }
    };

    generateQR();
  }, [value, size, margin, errorCorrectionLevel, color]);

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`inline-block ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
}

// 문자열로 QR 코드 생성하는 유틸리티 함수
export async function generateQRCodeDataURL(
  value: string,
  options?: {
    width?: number;
    margin?: number;
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    color?: {
      dark?: string;
      light?: string;
    };
  },
): Promise<string> {
  try {
    return await QRCode.toDataURL(value, {
      width: options?.width || 200,
      margin: options?.margin || 4,
      errorCorrectionLevel: options?.errorCorrectionLevel || "M",
      color: options?.color || {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
  } catch (error) {
    console.error("QR 코드 생성 실패:", error);
    throw new Error("QR 코드 생성에 실패했습니다.");
  }
}
