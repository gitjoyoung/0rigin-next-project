import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";

export const createGoogleProfile = async (
  userId: string,
  email: string,
  nickname: string,
  gender: string,
) => {
  const supabase = await SupabaseServerClient();
  const response = await supabase
    .from("profile")
    .insert({ id: userId, email, nickname, gender, signup_complete: true })
    .select()
    .single();

  return response;
};
