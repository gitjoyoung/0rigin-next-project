import { SchemaType } from "@google/generative-ai";

// AI 응답 관련 타입 정의
export interface PhilosopherData {
  id: string;
  name: string;
  era: string;
  nationality: string;
  mainPhilosophy: string;
  concerns: string[];
  answers: string[];
  keywords: string[];
  description: string;
}

export interface AIResponseItem {
  philosopher: PhilosopherData;
  relevanceScore: number;
  matchedKeywords: string[];
  suggestedAnswer: string;
}

export interface AIResponse {
  results: AIResponseItem[];
}

export interface AIRequest {
  category: string;
  question: string;
}

// Gemini 응답 스키마 상수
export const AI_RESPONSE_SCHEMA = {
  type: SchemaType.OBJECT as const,
  properties: {
    results: {
      type: SchemaType.ARRAY as const,
      items: {
        type: SchemaType.OBJECT as const,
        properties: {
          philosopher: {
            type: SchemaType.OBJECT as const,
            properties: {
              id: { type: SchemaType.STRING as const },
              name: { type: SchemaType.STRING as const },
              era: { type: SchemaType.STRING as const },
              nationality: { type: SchemaType.STRING as const },
              mainPhilosophy: { type: SchemaType.STRING as const },
              concerns: {
                type: SchemaType.ARRAY as const,
                items: { type: SchemaType.STRING as const },
              },
              answers: {
                type: SchemaType.ARRAY as const,
                items: { type: SchemaType.STRING as const },
              },
              keywords: {
                type: SchemaType.ARRAY as const,
                items: { type: SchemaType.STRING as const },
              },
              description: { type: SchemaType.STRING as const },
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
            ] as string[],
          },
          relevanceScore: { type: SchemaType.NUMBER as const },
          matchedKeywords: {
            type: SchemaType.ARRAY as const,
            items: { type: SchemaType.STRING as const },
          },
          suggestedAnswer: { type: SchemaType.STRING as const },
        },
        required: [
          "philosopher",
          "relevanceScore",
          "matchedKeywords",
          "suggestedAnswer",
        ] as string[],
      },
    },
  },
  required: ["results"] as string[],
};
