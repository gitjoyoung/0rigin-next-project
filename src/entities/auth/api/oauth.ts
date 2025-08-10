"use server";

import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { redirect } from "next/navigation";
import type { OAuthProvider } from "../model/dto";

export async function signInWithOAuth({
  provider,
  redirectTo,
}: {
  provider: OAuthProvider;
  redirectTo?: string;
}) {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo || `${process.env.NEXT_PUBLIC_API_URL}/`,
      queryParams: provider === "google" ? { prompt: "select_account" } : {},
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.url) {
    redirect(data.url);
  }

  return data;
}

export async function signInWithGoogle({ next }: { next: string }) {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_API_URL}${next}`,
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

export async function handleOAuthCallback(code: string) {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) throw new Error(error.message);

  return data;
}
