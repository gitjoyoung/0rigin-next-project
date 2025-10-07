import Link from "next/link";
import { SIGN_UP_TERMS } from "./constance";

export default function SignUpLanding() {
  return (
    <div className="min-h-screen flex flex-col items-center py-4 px-4">
      <div className="max-w-xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="font-bold text-3xl leading-relaxed">
            {SIGN_UP_TERMS.welcomeMessage}
          </h1>
          <h3 className="text-lg whitespace-pre-line">
            {SIGN_UP_TERMS.registration.question}
          </h3>
        </div>

        <div className="flex items-center justify-between w-full">
          <Link
            href={SIGN_UP_TERMS.login.href}
            className="w-full sm:w-auto px-6 py-3 border border-black dark:border-white flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <p className="truncate">{SIGN_UP_TERMS.login.buttonText}</p>
          </Link>
          <Link
            href={SIGN_UP_TERMS.signup.href}
            className="w-full sm:w-auto px-6 py-3 border border-black dark:border-white flex items-center justify-center bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            <p className="truncate font-bold">
              {SIGN_UP_TERMS.signup.buttonText}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
