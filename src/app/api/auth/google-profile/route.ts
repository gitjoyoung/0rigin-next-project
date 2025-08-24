import { createGoogleProfile } from "@/entities/profile/api/google-profile.service";
import { decryptObject } from "@/shared/utils/crypto-helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const decryptedBody: {
    userId: string;
    email: string;
    nickname: string;
    gender: string;
  } = decryptObject(body);

  const { userId, email, nickname, gender } = decryptedBody;

  // 입력 검증
  if (!userId || !email || !nickname || !gender) {
    return NextResponse.json(
      {
        success: false,
        message: "필수 정보가 누락되었습니다.",
      },
      { status: 400 },
    );
  }

  const { data, error } = await createGoogleProfile(
    userId,
    email,
    nickname,
    gender,
  );

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: `프로필 생성에 실패했습니다: ${error.message}`,
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "프로필이 완성되었습니다.",
    data: data,
  });
}
