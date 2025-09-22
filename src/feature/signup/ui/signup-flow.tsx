"use client";

import { useState } from "react";
import NormalSignUpForm from "./normal-signup-form";
import SignUpProgressHeader from "./signup-progress-header";
import StepTermsOfService from "./step-terms-of-service";

export default function SignUpFlow() {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const secondStepLabel = "회원가입";
  if (!isTermsAccepted) {
    return (
      <div className="w-full">
        <SignUpProgressHeader
          isTermsAccepted={false}
          secondStepLabel={secondStepLabel}
        />
        <StepTermsOfService onAccept={() => setIsTermsAccepted(true)} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <SignUpProgressHeader
        isTermsAccepted={true}
        secondStepLabel={secondStepLabel}
      />
      <NormalSignUpForm />
    </div>
  );
}
