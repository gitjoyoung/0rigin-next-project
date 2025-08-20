import { gemini } from "@/shared/lib/gemini";
import {
  HarmBlockThreshold,
  HarmCategory,
  SchemaType,
} from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { category, question } = await request.json();
    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: "질문을 입력해주세요." },
        { status: 400 },
      );
    }
    const trimmedQuestion = question.trim();
    const prompt = `당신은 ${category} 분야의 전문가입니다. 다음 고민에 대해 ${category} 분야의 **3명**의 다양한 인물 관점에서 답변해주세요.

고민: ${trimmedQuestion}
카테고리: ${category}

각 인물의 답변은 최소 200자 이상으로 상세하고 의미있게 작성해주세요.
모든 내용은 반드시 한글로 작성해주세요.
모든 필드는 실제 값으로 채워주세요.`;

    const model = gemini.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            results: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  philosopher: {
                    type: SchemaType.OBJECT,
                    properties: {
                      id: { type: SchemaType.STRING },
                      name: { type: SchemaType.STRING },
                      era: { type: SchemaType.STRING },
                      nationality: { type: SchemaType.STRING },
                      mainPhilosophy: { type: SchemaType.STRING },
                      concerns: {
                        type: SchemaType.ARRAY,
                        items: { type: SchemaType.STRING },
                      },
                      answers: {
                        type: SchemaType.ARRAY,
                        items: { type: SchemaType.STRING },
                      },
                      keywords: {
                        type: SchemaType.ARRAY,
                        items: { type: SchemaType.STRING },
                      },
                      description: { type: SchemaType.STRING },
                    },
                    required: [
                      "id",
                      "name",
                      "era",
                      "nationality",
                      "mainPhilosophy",
                      "concerns",
                      "answers",
                      "keywords",
                      "description",
                    ],
                  },
                  relevanceScore: { type: SchemaType.NUMBER },
                  matchedKeywords: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING },
                  },
                  suggestedAnswer: { type: SchemaType.STRING },
                },
                required: [
                  "philosopher",
                  "relevanceScore",
                  "matchedKeywords",
                  "suggestedAnswer",
                ],
              },
            },
          },
          required: ["results"],
        },
      },
    });

    const response = await result.response;
    const text = response.text();

    if (!text) {
      console.error("❌ Gemini 응답 없음");
      throw new Error("Gemini 응답을 받지 못했습니다.");
    }

    // JSON 응답 파싱
    let parsedResponse;
    try {
      // JSON 파싱 전, 마크다운 코드 블록 제거
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : text;

      parsedResponse = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("❌ JSON 파싱 오류:", parseError);
      throw new Error("응답을 JSON으로 파싱할 수 없습니다.");
    }

    if (!parsedResponse.results || !Array.isArray(parsedResponse.results)) {
      console.error("❌ 잘못된 응답 구조:", parsedResponse);
      throw new Error("응답 구조가 올바르지 않습니다.");
    }

    return NextResponse.json({ results: parsedResponse.results });
  } catch (error) {
    console.error("❌ Gemini API 오류:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "답변 생성 중 오류가 발생했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
