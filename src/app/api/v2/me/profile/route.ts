import { getUser } from "@/entities/auth/api/user";
import {
  getProfile,
  updateProfile,
} from "@/entities/profile/api/profile.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const profile = await getProfile();
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "프로필 정보를 가져올 수 없습니다." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { nickname, gender, display_name } = body;

    const updateData: any = {};
    if (nickname) updateData.nickname = nickname;
    if (gender) updateData.gender = gender;
    if (display_name) updateData.display_name = display_name;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "업데이트할 정보가 없습니다." },
        { status: 400 },
      );
    }

    await updateProfile(updateData);

    return NextResponse.json({
      success: true,
      message: "프로필이 업데이트되었습니다.",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "프로필 업데이트에 실패했습니다." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    // 프로필 삭제는 실제로는 계정 삭제를 의미할 수 있음
    // 현재는 단순히 에러 반환 (실제 구현 필요)
    return NextResponse.json(
      { error: "프로필 삭제 기능은 아직 구현되지 않았습니다." },
      { status: 501 },
    );
  } catch (error) {
    console.error("Delete profile error:", error);
    return NextResponse.json(
      { error: "프로필 삭제 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
