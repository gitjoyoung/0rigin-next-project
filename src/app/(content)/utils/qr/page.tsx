import QRCodeGenerator from "@/feature/util-widget/qr-code";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR 코드 생성기 - 0rigin",
  description: "0rigin.space를 위한 QR 코드를 생성하고 다운로드할 수 있습니다.",
  keywords: ["QR코드", "생성기", "0rigin", "다운로드"],
};

export default function QRCodePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">QR 코드 생성기</h1>
          <p className="text-muted-foreground">
            0rigin.space를 위한 QR 코드를 쉽게 생성하고 다운로드하세요
          </p>
        </div>

        <QRCodeGenerator />
      </div>
    </div>
  );
}
