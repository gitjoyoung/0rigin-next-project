import { ROUTE_FORGET_PASSWORD, ROUTE_SIGN } from "@/constants/pathname";
import Link from "next/link";

export default function SignButton() {
  return (
    <div className="w-full max-w-md flex gap-3 justify-center items-center text-xs text-muted-foreground">
      <Link href={ROUTE_FORGET_PASSWORD}>비밀번호 찾기</Link>
      <span>|</span>
      <Link href={ROUTE_SIGN}>회원가입</Link>
    </div>
  );
}
