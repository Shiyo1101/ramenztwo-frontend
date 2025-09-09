export type HeadingLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingOption {
  label: string;
  value: HeadingLevel;
  fontSize: string;
}

export interface IssuePosition {
  start: number;
  end: number;
}

// リクエストID
export interface RequestId {
  request_id: string;
}

// 分析日時
export interface AnalyzedAt {
  analyzed_at: string; // ISO 8601 形式
}

// 各フック評価
export interface MediaHookEvaluation {
  hook_type: string;
  hook_name_ja: string;
  score: number;
  description: string;
  improve_examples?: string[];
  current_elements?: string[];
}

// 段落改善
export interface ParagraphImprovement {
  paragraph_index: number;
  original_text: string;
  improved_text: string | null;
  improvements: string[];
  priority: "high" | "medium" | "low" | "critical";
  applicable_hooks: string[];
}

// 全体評価
export interface OverallAssessment {
  total_score: number;
  strengths: string[];
  weaknesses: string[];
  top_recommendations: string[];
  estimated_impact: string;
}

// 処理時間
export interface ProcessingTime {
  processing_time_ms: number;
}

// 使用モデル
export interface AiModelUsed {
  ai_model_used: string;
}

// メインのレスポンス型
export interface AnalysisResponse extends RequestId, AnalyzedAt, ProcessingTime, AiModelUsed {
  media_hook_evaluations: MediaHookEvaluation[];
  paragraph_improvements: ParagraphImprovement[];
  overall_assessment: OverallAssessment;
}

export interface FileOperationsState {
  isUploadOpen: boolean;
  isDownloadOpen: boolean;
  content: string;
}

export interface EditorState {
  isBold: boolean;
  isOrdered: boolean;
  isBullet: boolean;
  currentHeading: HeadingLevel;
}
