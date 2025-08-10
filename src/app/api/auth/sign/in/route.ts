import { signIn } from "@/entities/auth/api/sign";
import { decryptObject } from "@/shared/utils/crypto-helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password, email } = decryptObject(body) as {
    email: string;
    password: string;
  };
  const result = await signIn({ password, email });
  return NextResponse.json(result);
}
