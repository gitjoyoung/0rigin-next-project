import { createPost as createPostEntity } from "@/entities/post/api";
import type { PostCreate } from "@/entities/post/types";
import { gemini } from "@/shared/lib/gemini";
import {
  HarmBlockThreshold,
  HarmCategory,
  SchemaType,
} from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// 기존 게시글에서 철학자 관련 글 검색
async function searchExistingPosts(
  philosopherName: string,
  request: NextRequest,
) {
  try {
    const { origin } = new URL(request.url);
    // 실제 구현에서는 데이터베이스 검색 로직 사용
    const response = await fetch(
      `${origin}/api/board?search=${encodeURIComponent(philosopherName)}`,
    );
    const data = await response.json();
    return (
      data.postData?.filter(
        (post: any) =>
          post.title.includes(philosopherName) ||
          post.content.includes(philosopherName),
      ) || []
    );
  } catch (error) {
    console.error("기존 게시글 검색 오류:", error);
    return [];
  }
}

// 새로운 게시글 생성
async function createPost(
  philosopherData: any,
  question: string,
  category: string,
) {
  try {
    const postData: PostCreate = {
      title: `${question} - ${philosopherData.name}`,
      content: `${philosopherData.answers?.join("\n\n")}`,
      category: category,
      tags: philosopherData.keywords,
      status: "published",
      nickname: philosopherData.name + " AI",
      password: "ai1234",
    };

    const result = await createPostEntity(postData);
    return result;
  } catch (error) {
    console.error("게시글 생성 오류:", error);
  }
  return null;
}

export async function POST(request: NextRequest) {
  console.log("🚀 API 엔드포인트 호출됨");

  try {
    const { category, question } = await request.json();
    console.log("📝 받은 데이터:", { category, question });

    if (!question?.trim()) {
      console.log("❌ 질문이 비어있음");
      return NextResponse.json(
        { error: "질문을 입력해주세요." },
        { status: 400 },
      );
    }

    // 카테고리 ID를 표시명으로 변환
    const categoryDisplayNames = {
      philosophy: "철학",
      science: "과학",
      technology: "기술",
      mathematics: "수학",
    };

    const selectedCategory = category || "philosophy";
    const displayName =
      categoryDisplayNames[
        selectedCategory as keyof typeof categoryDisplayNames
      ] || "철학";

    console.log(`🎯 선택된 카테고리: ${selectedCategory} (${displayName})`);

    const prompt = `당신은 ${displayName} 분야의 전문가입니다. 다음 고민에 대해 ${displayName} 분야의 최대 10명의 다양한 인물 관점에서 답변해주세요.

고민: ${question}
카테고리: ${displayName}

중요: 반드시 아래 JSON 형식으로만 응답하세요. 다른 설명이나 텍스트는 절대 포함하지 마세요. 최소 5명, 최대 10명의 ${displayName} 분야 인물을 포함하세요. 해당 분야에서 가장 적절하고 유명한 인물들을 자유롭게 선택하세요.

모든 텍스트는 반드시 한글로 작성하세요. 인물 이름, 시대, 국적, 설명, 답변 등 모든 내용을 한글로 작성해주세요.

각 인물의 답변은 최소 200자 이상으로 상세하고 의미있게 작성해주세요. 단순한 한 줄 답변이 아닌, 해당 인물의 사상과 철학을 반영한 깊이 있는 답변을 제공해주세요.

모든 필드는 반드시 실제 값으로 채워주세요. undefined나 null 값을 사용하지 마세요.

{
  "results": [
    {
      "philosopher": {
        "id": "unique-id-1",
        "name": "실제 인물 이름",
        "era": "실제 시대",
        "nationality": "실제 국적",
        "mainPhilosophy": "실제 주요 사상",
        "concerns": ["실제 관심사1", "실제 관심사2", "실제 관심사3"],
        "answers": ["실제 인물의 관점에서 한 답변"],
        "keywords": ["실제 키워드1", "실제 키워드2", "실제 키워드3"],
        "description": "실제 인물에 대한 설명"
      },
      "relevanceScore": 95,
      "matchedKeywords": ["실제 매칭된 키워드들"],
      "suggestedAnswer": "실제 인물의 관점에서 한 답변"
    }
  ]
}

위 예시처럼 정확히 JSON 형식으로만 응답하세요. 각 인물의 정보는 실제 역사적 사실에 기반하여 작성하세요. ${displayName} 분야의 다양한 시대와 문화권의 인물들을 포함하여 다양한 관점을 제공하세요. 모든 내용은 반드시 한글로 작성해주세요. 모든 필드는 실제 값으로 채워주세요.`;

    console.log("🤖 Gemini API 호출 시작");

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

    // 응답에서 JSON 부분만 추출 (마크다운 코드 블록 제거)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : text;

    console.log("🤖 Gemini 응답:", text);

    if (!text) {
      console.error("❌ Gemini 응답 없음");
      throw new Error("Gemini 응답을 받지 못했습니다.");
    }

    // JSON 응답 파싱
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonText);
      console.log("📊 파싱된 JSON:", parsedResponse);
    } catch (parseError) {
      console.error("❌ JSON 파싱 오류:", parseError);
      console.error("❌ 파싱 시도한 텍스트:", jsonText);
      throw new Error("응답을 JSON으로 파싱할 수 없습니다.");
    }

    if (!parsedResponse.results || !Array.isArray(parsedResponse.results)) {
      console.error("❌ 잘못된 응답 구조:", parsedResponse);
      throw new Error("응답 구조가 올바르지 않습니다.");
    }

    // 가장 유사한 답변 하나만 게시글로 생성
    const sortedResults = parsedResponse.results.sort(
      (a: any, b: any) => b.relevanceScore - a.relevanceScore,
    );
    const bestMatch = sortedResults[0];

    console.log(
      `🔍 가장 유사한 인물:`,
      bestMatch.philosopher.name,
      `(유사도: ${bestMatch.relevanceScore})`,
    );

    const existingPosts = await searchExistingPosts(
      bestMatch.philosopher.name,
      request,
    );

    if (existingPosts.length === 0) {
      console.log(
        `📝 ${bestMatch.philosopher.name} 관련 게시글이 없어 새 글을 생성합니다.`,
      );
      const newPost = await createPost(
        bestMatch.philosopher,
        question,
        selectedCategory,
      );
      if (newPost) {
        bestMatch.relatedPosts = [newPost];
      }
    } else {
      console.log(
        `📚 ${bestMatch.philosopher.name} 관련 기존 게시글 ${existingPosts.length}개 발견`,
      );
      bestMatch.relatedPosts = existingPosts.slice(0, 2); // 최대 2개만
    }

    // 모든 결과에 대해 기존 게시글만 검색 (새 글 생성은 하지 않음)
    for (let i = 1; i < parsedResponse.results.length; i++) {
      const result = parsedResponse.results[i];
      const existingPosts = await searchExistingPosts(
        result.philosopher.name,
        request,
      );
      if (existingPosts.length > 0) {
        result.relatedPosts = existingPosts.slice(0, 2);
      }
    }

    console.log("✅ API 응답 전송");
    return NextResponse.json({ results: parsedResponse.results });
  } catch (error) {
    console.error("❌ Gemini API 오류:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "답변 생성 중 오류가 발생했습니다.";
    console.log("🚨 에러 응답 전송:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
