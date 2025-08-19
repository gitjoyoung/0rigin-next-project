"use client";
import { Button } from "@/shared/shadcn/ui/button";
import { Checkbox } from "@/shared/shadcn/ui/checkbox";
import { ScrollArea } from "@/shared/shadcn/ui/scroll-area";
import { useState } from "react";
import { TERMS_CONTENT } from "../constance";

interface StepTermsOfServiceProps {
  onAccept: () => void;
}

export default function StepTermsOfService({
  onAccept,
}: StepTermsOfServiceProps) {
  // 이용약관 및 개인정보처리방침 동의 체크박스
  const [checkTerms, setCheckTerms] = useState<boolean>(false);
  const [checkPrivacy, setCheckPrivacy] = useState<boolean>(false);

  const handleAccept = (): void => {
    if (checkTerms && checkPrivacy) {
      onAccept();
    } else {
      alert("이용약관 및 개인정보처리방침에 모두 동의해주세요.");
    }
  };

  const allAgreed = checkTerms && checkPrivacy;

  return (
    <section className="w-full sm:w-[400px] flex flex-col m-auto items-center mt-10 gap-2">
      <div className="space-y-2">
        <h2 className="font-bold text-lg">{TERMS_CONTENT.title}</h2>
        <ScrollArea className="h-80 w-full rounded-lg border">
          <div className="p-3">
            <p className="mb-4 leading-6 whitespace-pre-line text-sm">
              {TERMS_CONTENT.terms}
            </p>
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col p-1 gap-3 w-full justify-start">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={checkTerms}
            onCheckedChange={(checked) => {
              setCheckTerms(!!checked);
            }}
            id="agree-terms"
          />
          <label htmlFor="agree-terms" className="text-sm">
            {TERMS_CONTENT.agreeTerms}
          </label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={checkPrivacy}
            onCheckedChange={(checked) => {
              setCheckPrivacy(!!checked);
            }}
            id="agree-privacy"
          />
          <label htmlFor="agree-privacy" className="text-sm">
            {TERMS_CONTENT.agreePrivacy}
          </label>
        </div>

        <div className="flex justify-center">
          <Button
            className="px-16 py-4"
            size="lg"
            type="button"
            onClick={handleAccept}
            disabled={!allAgreed}
          >
            확인
          </Button>
        </div>
      </div>
    </section>
  );
}
