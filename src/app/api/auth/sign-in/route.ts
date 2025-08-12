import { signIn } from "@/entities/auth";
import { decryptObject } from "@/shared/utils/crypto-helper";
import type { LoginSchema } from "@/widgets/login/types/schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const decryptedBody = decryptObject<z.infer<typeof LoginSchema>>(body);
  const { password, email } = decryptedBody;
  const result = await signIn({ password, email });
  if (result.error) {
    return NextResponse.json(
      {
        error: result.error.message,
      },
      { status: 401 },
    );
  }
  return NextResponse.json(result);
}
