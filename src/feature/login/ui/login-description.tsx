const LOGIN_TERMS = {
  welcomeMessage: `SIGN-IN`,
  registration: {
    question: "로그인 하고 0RIGIN(제로리진) 서비스를 이용해보세요.",
  },
};

export default function LoginDescription() {
  return (
    <div className="text-center space-y-2">
      <div className="space-y-4">
        <h1 className="font-bold text-3xl leading-relaxed">
          {LOGIN_TERMS.welcomeMessage}
        </h1>
        <h3 className="text-lg whitespace-pre-line">
          {LOGIN_TERMS.registration.question}
        </h3>
      </div>
    </div>
  );
}
