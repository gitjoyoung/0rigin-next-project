import { gemini } from "@/shared/lib/gemini";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { AIRequest, AIResponse, AI_RESPONSE_SCHEMA } from "../types";

/**
 * AI 프롬프트 생성
 */
function createPrompt(category: string, question: string): string {
  return `당신은 ${category} 분야의 전문가입니다. 다음 고민에 대해 ${category} 분야의 **3명**의 다양한 인물 관점에서 답변해주세요.

고민: ${question}
카테고리: ${category}

각 인물의 답변은 최소 200자 이상으로 상세하고 의미있게 작성해주세요.
모든 내용은 반드시 한글로 작성해주세요.
모든 필드는 실제 값으로 채워주세요.`;
}

/**
 * Gemini 모델 인스턴스 생성
 */
function createGeminiModel() {
  return gemini.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  });
}

/**
 * JSON 응답 파싱 및 정리
 */
function parseAIResponse(text: string): AIResponse {
  if (!text) {
    throw new Error("Gemini 응답을 받지 못했습니다.");
  }

  // 마크다운 코드 블록 제거하여 순수 JSON 추출
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const jsonText = jsonMatch ? jsonMatch[0] : text;

  let parsedResponse: AIResponse;
  try {
    parsedResponse = JSON.parse(jsonText);
  } catch {
    throw new Error("응답을 JSON으로 파싱할 수 없습니다.");
  }

  if (!parsedResponse.results || !Array.isArray(parsedResponse.results)) {
    throw new Error("응답 구조가 올바르지 않습니다.");
  }

  return parsedResponse;
}

/**
 * AI 응답 생성 메인 함수
 */
export async function generateAIResponse(
  request: AIRequest,
): Promise<AIResponse> {
  const { category, question } = request;

  const prompt = createPrompt(category, question.trim());
  const model = createGeminiModel();

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: AI_RESPONSE_SCHEMA,
    },
  });

  const response = await result.response;
  const text = response.text();

  return parseAIResponse(text);
}

/**
 * 요청 검증
 */
export function validateAIRequest(data: any): {
  isValid: boolean;
  error?: string;
} {
  if (
    !data.question ||
    typeof data.question !== "string" ||
    data.question.trim().length === 0
  ) {
    return { isValid: false, error: "질문을 입력해주세요." };
  }

  if (!data.category || typeof data.category !== "string") {
    return { isValid: false, error: "카테고리를 선택해주세요." };
  }

  return { isValid: true };
}
