import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import type { User } from "@supabase/supabase-js";

export async function getUser(): Promise<User | null> {
  const supabase = await SupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

export async function checkSignupCompleteServer(): Promise<{
  status: "unauth" | "authed" | "needsProfile";
  user: User | null;
  profile?: any;
}> {
  const supabase = await SupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profile").select("*").eq("id", user.id).maybeSingle()
    : { data: null };

  const initial = !user
    ? { status: "unauth" as const, user: null }
    : profile?.is_active
      ? { status: "authed" as const, user, profile }
      : { status: "needsProfile" as const, user, profile };

  return initial;
}
