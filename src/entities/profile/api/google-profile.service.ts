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
    .upsert(
      {
        id: userId,
        email,
        nickname,
        gender,
        signup_complete: true,
        is_email_verified: true,
      },
      { onConflict: "id" },
    )
    .select()
    .single();

  return response;
};
