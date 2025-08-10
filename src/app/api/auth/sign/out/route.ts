import { signOut } from "@/entities/auth/api/sign";
import { NextResponse } from "next/server";

export async function POST() {
  const result = await signOut();
  return NextResponse.json(result);
}
