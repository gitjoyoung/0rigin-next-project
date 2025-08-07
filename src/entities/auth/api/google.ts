"use server";

import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { redirect } from "next/navigation";

export async function signInWithGoogle({ next }: { next: string }) {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${next}`,
      queryParams: { prompt: "select_account" },
    },
  });

  if (error) {
    return null;
  }

  if (data.url) {
    redirect(data.url);
  }

  return null;
}
