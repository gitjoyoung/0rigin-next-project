import { SupabaseBrowserClient } from "@/shared/lib/supabase/supabase-browser-client";

export const oauthClient = async () => {
  const supabase = await SupabaseBrowserClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/callback`,
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
