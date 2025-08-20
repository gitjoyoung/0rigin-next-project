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
} as const;
