export interface Philosopher {
  id: string;
  name: string;
  era: string;
  nationality: string;
  mainPhilosophy: string;
  concerns: string[];
  answers: string[];
  keywords: string[];
  image?: string;
  description: string;
}

export interface MatchingResult {
  philosopher: Philosopher;
  relevanceScore: number;
  matchedKeywords: string[];
  suggestedAnswer: string;
  relatedPosts?: RelatedPost[];
}

export interface RelatedPost {
  id: number;
  title: string;
  content: string;
  category: string;
  url: string;
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: MatchingResult[];
  selectedResult: MatchingResult | null;
}
