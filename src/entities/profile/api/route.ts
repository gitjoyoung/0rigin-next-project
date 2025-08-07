import { getUser } from "@/entities/auth/api/get-user";
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { CreateProfileRequest, Profile, UpdateProfileRequest } from "../types";

// 프로필 조회
export async function getProfile(): Promise<Profile | null> {
  const user = await getUser();

  if (!user) {
    throw new Error("사용자 정보를 불러올 수 없습니다.");
  }

  const supabase = await SupabaseServerClient();
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// 프로필 업데이트
export async function updateProfile(
  updateData: UpdateProfileRequest,
): Promise<Profile> {
  const user = await getUser();

  if (!user) {
    throw new Error("사용자 정보를 불러올 수 없습니다.");
  }

  const supabase = await SupabaseServerClient();
  const { data, error } = await supabase
    .from("profile")
    .update({
      ...updateData,
      signup_complete: true, // 구글 프로필 완성 시 회원가입 완료 처리
    })
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// 프로필 생성
export async function createProfile(
  profileData: CreateProfileRequest,
): Promise<Profile> {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase
    .from("profile")
    .insert(profileData)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile;
}

// 프로필 검색

// 프로필 삭제 (필요시)
export async function deleteProfile(): Promise<void> {
  const user = await getUser();

  if (!user) {
    throw new Error("사용자 정보를 불러올 수 없습니다.");
  }
  const supabase = await SupabaseServerClient();
  const { error } = await supabase.from("profile").delete().eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }
}
