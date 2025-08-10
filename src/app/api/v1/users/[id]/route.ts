import { getUser } from "@/entities/auth/api/get-user";
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { NextRequest, NextResponse } from "next/server";

// 관리자 권한 확인 함수
async function checkAdminPermission() {
  const user = await getUser();

  if (!user) {
    return { error: "로그인이 필요합니다.", status: 401 };
  }

  // 관리자 권한 확인 (실제 구현에서는 role 필드 또는 권한 테이블 확인)
  const isAdmin =
    user.user_metadata?.role === "admin" || user.email?.includes("admin");

  if (!isAdmin) {
    return { error: "관리자 권한이 필요합니다.", status: 403 };
  }

  return { user };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const permissionCheck = await checkAdminPermission();
    if (permissionCheck.error) {
      return NextResponse.json(
        { error: permissionCheck.error },
        { status: permissionCheck.status },
      );
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "사용자 ID가 필요합니다." },
        { status: 400 },
      );
    }

    const supabase = await SupabaseServerClient();

    // 관리자용 사용자 조회 (더 상세한 정보 포함)
    const { data: userData, error } = await supabase.auth.admin.getUserById(id);

    if (error) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: userData.user?.id,
      email: userData.user?.email,
      email_confirmed_at: userData.user?.email_confirmed_at,
      created_at: userData.user?.created_at,
      updated_at: userData.user?.updated_at,
      last_sign_in_at: userData.user?.last_sign_in_at,
      user_metadata: userData.user?.user_metadata,
      app_metadata: userData.user?.app_metadata,
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    return NextResponse.json(
      { error: "사용자 정보를 가져올 수 없습니다." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const permissionCheck = await checkAdminPermission();
    if (permissionCheck.error) {
      return NextResponse.json(
        { error: permissionCheck.error },
        { status: permissionCheck.status },
      );
    }

    const { id } = params;
    const body = await request.json();
    const { email, user_metadata, app_metadata, email_confirm } = body;

    if (!id) {
      return NextResponse.json(
        { error: "사용자 ID가 필요합니다." },
        { status: 400 },
      );
    }

    const supabase = await SupabaseServerClient();

    const updateData: any = {};
    if (email) updateData.email = email;
    if (user_metadata) updateData.user_metadata = user_metadata;
    if (app_metadata) updateData.app_metadata = app_metadata;
    if (typeof email_confirm === "boolean")
      updateData.email_confirm = email_confirm;

    const { data, error } = await supabase.auth.admin.updateUserById(
      id,
      updateData,
    );

    if (error) {
      return NextResponse.json(
        { error: "사용자 정보 업데이트에 실패했습니다." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "사용자 정보가 업데이트되었습니다.",
      user: data.user,
    });
  } catch (error) {
    console.error("Update user by ID error:", error);
    return NextResponse.json(
      { error: "사용자 정보 업데이트 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const permissionCheck = await checkAdminPermission();
    if (permissionCheck.error) {
      return NextResponse.json(
        { error: permissionCheck.error },
        { status: permissionCheck.status },
      );
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "사용자 ID가 필요합니다." },
        { status: 400 },
      );
    }

    const supabase = await SupabaseServerClient();

    const { error } = await supabase.auth.admin.deleteUser(id);

    if (error) {
      return NextResponse.json(
        { error: "사용자 삭제에 실패했습니다." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "사용자가 삭제되었습니다.",
    });
  } catch (error) {
    console.error("Delete user by ID error:", error);
    return NextResponse.json(
      { error: "사용자 삭제 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
