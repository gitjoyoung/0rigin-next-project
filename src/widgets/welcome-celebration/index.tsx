"use client";
import { ROUTE_LOGIN } from "@/constants/pathname";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface WelcomeCelebrationProps {
  userEmail: string | null;
  title?: string;
  description?: string;
  buttonText?: string;
  redirectPath?: string;
}

export default function WelcomeCelebration({
  userEmail,
  title = "회원가입을 축하합니다! 🎉",
  description = "이제 0RIGIN(제로리진)의 모든 기능을 사용하실 수 있습니다.",
}: WelcomeCelebrationProps) {
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiPieces, setConfettiPieces] = useState(300);

  useEffect(() => {
    // 윈도우 크기 설정
    const updateWindowDimensions = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    // 3초 후부터 점진적으로 콘페티 개수 감소
    const reduceTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setConfettiPieces((prev) => {
          const newCount = prev - 20;
          if (newCount <= 0) {
            clearInterval(interval);
            setShowConfetti(false);
            return 0;
          }
          return newCount;
        });
      }, 200); // 200ms마다 20개씩 감소
    }, 3000);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
      clearTimeout(reduceTimer);
    };
  }, []);

  return (
    <div className="min-h-72 flex flex-col items-center justify-center px-2">
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={confettiPieces}
          gravity={0.3}
          wind={0.01}
        />
      )}
      <div className="max-w-md w-full space-y-8 p-8 rounded-lg">
        <div className=" flex flex-col items-center gap-4">
          {userEmail && (
            <h2 className="text-2xl font-bold tracking-tight">
              {userEmail} 님!
            </h2>
          )}
          <h2 className="text-3xl font-extrabold">{title}</h2>
          <p className="text-sm">{description}</p>
          {!userEmail && (
            <p className="mt-2 text-sm">다시 로그인을 해주세요.</p>
          )}
        </div>

        <div className="mt-8 space-y-4">
          {userEmail && (
            <Button asChild className="w-full">
              <Link href={"/"}>홈으로 가기</Link>
            </Button>
          )}
          {!userEmail && (
            <Button asChild className="w-full">
              <Link href={ROUTE_LOGIN}>로그인하기</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
