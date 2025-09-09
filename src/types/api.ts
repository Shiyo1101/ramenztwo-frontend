// API関連の型定義
export interface Company {
  company_id: number;
  company_name: string;
  president_name?: string | null;
  address?: string | null;
  phone?: string | null;
  description?: string | null;
  industry?: string | null;
  ipo_type?: string | null;
  capital?: number | null;
  foundation_date?: string | null;
  url?: string | null;
  twitter_screen_name?: string | null;
}

export interface PressRelease {
  company_name: string;
  company_id: number;
  release_id: number;
  title: string;
  subtitle?: string | null;
  url: string;
  lead_paragraph?: string | null;
  body?: string | null;
  main_image?: string | null;
  main_image_fastly?: string | null;
  main_category_id?: number | null;
  main_category_name?: string | null;
  sub_category_id?: number | null;
  sub_category_name?: string | null;
  release_type?: string | null;
  created_at: string;
  like?: number | null;
}

export interface ImageData {
  url?: string | null;
}

export interface MetadataInput {
  persona?: string;
}

export interface PressReleaseInput {
  title: string;
  top_image?: ImageData | null;
  content_markdown: string;
  metadata: MetadataInput;
}

export type MediaHookType =
  | "trending_seasonal"
  | "unexpectedness"
  | "paradox_conflict"
  | "regional"
  | "topicality"
  | "social_public"
  | "novelty_uniqueness"
  | "superlative_rarity"
  | "visual_impact";

export type EvaluationScore = 1 | 2 | 3 | 4 | 5;

export interface MediaHookEvaluation {
  hook_type: MediaHookType;
  hook_name_ja: string;
  score: EvaluationScore;
  description: string;
  improve_examples?: string[];
  current_elements?: string[];
}

export type ImprovementPriority = "low" | "medium" | "high" | "critical";

export interface ParagraphImprovement {
  paragraph_index: number;
  original_text: string;
  improved_text?: string | null;
  improvements?: string[];
  priority: ImprovementPriority;
  applicable_hooks?: MediaHookType[];
}

export interface OverallAssessment {
  total_score: number;
  strengths?: string[];
  weaknesses?: string[];
  top_recommendations?: string[];
  estimated_impact: string;
}

export interface PressReleaseAnalysisResponse {
  request_id: string;
  analyzed_at?: string;
  media_hook_evaluations: MediaHookEvaluation[];
  paragraph_improvements: ParagraphImprovement[];
  overall_assessment: OverallAssessment;
  processing_time_ms?: number | null;
  ai_model_used?: string | null;
}
