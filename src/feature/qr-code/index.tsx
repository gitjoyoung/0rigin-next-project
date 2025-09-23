"use client";

import { Button } from "@/shared/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/ui/card";
import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import QRCodeComponent, { generateQRCodeDataURL } from "@/shared/ui/qr-code";
import { Copy, Download } from "lucide-react";
import { useState } from "react";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("https://0rigin.space");
  const [size, setSize] = useState(200);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    try {
      const dataURL = await generateQRCodeDataURL(url, { width: size });

      // 다운로드 링크 생성
      const link = document.createElement("a");
      link.download = `qr-code-${url.replace(/[^a-zA-Z0-9]/g, "-")}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("다운로드 실패:", error);
    }
  };

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("복사 실패:", error);
    }
  };

  const handleCopyQRCode = async () => {
    try {
      const dataURL = await generateQRCodeDataURL(url, { width: size });

      // Data URL을 Blob으로 변환
      const response = await fetch(dataURL);
      const blob = await response.blob();

      // 클립보드에 이미지 복사
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("QR 코드 복사 실패:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Label htmlFor="url">URL 또는 텍스트</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://0rigin.space"
                className="flex-1"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* URL 입력 */}

          {/* 크기 조절 */}
          <div className="space-y-2">
            <Label htmlFor="size">크기: {size}px</Label>
            <Input
              id="size"
              type="range"
              min="100"
              max="400"
              step="5"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* QR 코드 표시 */}
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <QRCodeComponent
                value={url}
                size={size}
                errorCorrectionLevel="M"
              />
            </div>

            {/* 액션 버튼들 */}
            <div className="flex gap-2">
              <Button onClick={handleDownload} variant="default">
                <Download className="h-4 w-4 mr-2" />
                다운로드
              </Button>
              <Button onClick={handleCopyQRCode} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                이미지 복사
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 사용법 안내 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">사용법</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• URL이나 텍스트를 입력하면 자동으로 QR 코드가 생성됩니다</p>
          <p>• 크기 슬라이더로 QR 코드 크기를 조절할 수 있습니다</p>
          <p>• 다운로드 버튼으로 PNG 파일로 저장할 수 있습니다</p>
          <p>• 이미지 복사 버튼으로 클립보드에 복사할 수 있습니다</p>
        </CardContent>
      </Card>
    </div>
  );
}
