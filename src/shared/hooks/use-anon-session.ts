import {
  getCookie,
  getJsonCookie,
  setCookie,
  setJsonCookie,
} from "@/shared/utils/cookie-utils";
import { useCallback, useEffect, useState } from "react";

interface AnonUserInfo {
  nickname: string;
  password: string;
}

const ANON_KEY_COOKIE = "anonKey";
const ANON_USER_INFO_COOKIE = "anonUserInfo";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1일

function getOrCreateAnonKey(): string {
  if (typeof window === "undefined") return "";

  // 먼저 쿠키에서 확인
  let anonKey = getCookie(ANON_KEY_COOKIE);

  // 쿠키에 없으면 localStorage에서 마이그레이션 시도
  if (!anonKey) {
    anonKey = localStorage.getItem("anonKey");
    if (anonKey) {
      // localStorage에서 쿠키로 마이그레이션
      setCookie(ANON_KEY_COOKIE, anonKey, { maxAge: COOKIE_MAX_AGE });
      localStorage.removeItem("anonKey");
    }
  }

  // 둘 다 없으면 새로 생성
  if (!anonKey) {
    anonKey =
      self.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
    setCookie(ANON_KEY_COOKIE, anonKey, { maxAge: COOKIE_MAX_AGE });
  }

  return anonKey;
}

function getAnonUserInfo(anonKey: string): AnonUserInfo {
  if (typeof window === "undefined") return { nickname: "", password: "" };

  // 먼저 쿠키에서 확인
  let userInfo = getJsonCookie<AnonUserInfo>(ANON_USER_INFO_COOKIE);

  // 쿠키에 없으면 localStorage에서 마이그레이션 시도
  if (!userInfo) {
    const raw = localStorage.getItem(`anonUserInfo_${anonKey}`);
    if (raw) {
      try {
        userInfo = JSON.parse(raw);
        if (userInfo) {
          // localStorage에서 쿠키로 마이그레이션
          setJsonCookie(ANON_USER_INFO_COOKIE, userInfo, {
            maxAge: COOKIE_MAX_AGE,
          });
          localStorage.removeItem(`anonUserInfo_${anonKey}`);
        }
      } catch {
        // 파싱 실패시 무시
      }
    }
  }

  return userInfo || { nickname: "", password: "" };
}

export function useAnonSession() {
  const [anonKey, setAnonKey] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const key = getOrCreateAnonKey();
    setAnonKey(key);
    const { nickname, password } = getAnonUserInfo(key);
    setNickname(nickname);
    setPassword(password);
  }, []);

  const setAnonSession = useCallback(
    (nickname: string, password: string) => {
      setNickname(nickname);
      setPassword(password);
      if (typeof window !== "undefined") {
        setJsonCookie(
          ANON_USER_INFO_COOKIE,
          { nickname, password },
          {
            maxAge: COOKIE_MAX_AGE,
          },
        );
      }
    },
    [], // anonKey에 의존하지 않음 (쿠키 이름이 고정이므로)
  );

  return {
    anonKey,
    anonNickname: nickname,
    anonPassword: password,
    setAnonSession,
  };
}
