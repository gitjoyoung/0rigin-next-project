// src/server/services/profile.service.ts
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import type { Tables, TablesInsert, TablesUpdate } from "@/shared/types";
import "server-only";

type Profile = Tables<"profile">;
type CreateProfileRequest = TablesInsert<"profile">;
type UpdateProfileRequest = TablesUpdate<"profile">;

async function requireUserId() {
  const supabase = await SupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  if (!user) throw new Error("Unauthorized");
  return { supabase, userId: user.id };
}

// 조회
export async function getProfile(): Promise<Profile | null> {
  const { supabase, userId } = await requireUserId();
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .maybeSingle(); // 없을 수도 있으면 maybeSingle 권장
  if (error) throw new Error(error.message);
  return data;
}

// 업데이트
export async function updateProfile(
  updateData: UpdateProfileRequest,
): Promise<Profile> {
  const { supabase, userId } = await requireUserId();
  const { data, error } = await supabase
    .from("profile")
    .update({ ...updateData, signup_complete: true })
    .eq("id", userId)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// 생성
export async function createProfile(
  profileData: CreateProfileRequest,
): Promise<Profile> {
  const supabase = await SupabaseServerClient();
  const { data, error } = await supabase
    .from("profile")
    .insert(profileData)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// 삭제
export async function deleteProfile(): Promise<void> {
  const { supabase, userId } = await requireUserId();
  const { error } = await supabase.from("profile").delete().eq("id", userId);
  if (error) throw new Error(error.message);
}
