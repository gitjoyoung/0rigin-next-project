"use client";
// pages/sign/[[...slug]].js

import Sign from "@/components/Auth/Sign/Sign";
import TermsOfService from "@/components/Auth/Sign/TermsOfService";
import { useState } from "react";

export default function Page() {
  const [changePage, setChangePage] = useState(false);

  const handleAcceptTerms = () => {
    setChangePage(true);
  };
  if (changePage) {
    return <Sign />;
  } else {
    return <TermsOfService onTermsAgreed={handleAcceptTerms} />;
  }
}
