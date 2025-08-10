import { getUser } from "@/entities/auth/api/get-user";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUser();
  return NextResponse.json(user);
}
