import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const ImageData = z
  .object({
    url: z.union([z.string(), z.null()]),
    base64_data: z.union([z.string(), z.null()]),
    mime_type: z.union([z.string(), z.null()]),
    alt_text: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();

const PressReleaseInput = z
  .object({
    title: z.string().min(1).max(200),
    top_image: z.union([ImageData, z.null()]).optional(),
    content_markdown: z.string().min(1),
    metadata: z.union([z.object({}).partial().passthrough(), z.null()]).optional(),
  })
  .passthrough();

const MediaHookType = z.enum([
  "trending_seasonal",
  "unexpectedness",
  "paradox_conflict",
  "regional",
  "topicality",
  "social_public",
  "novelty_uniqueness",
  "superlative_rarity",
  "visual_impact",
]);

const EvaluationScore = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

const MediaHookEvaluation = z
  .object({
    hook_type: MediaHookType,
    hook_name_ja: z.string(),
    score: EvaluationScore,
    description: z.string(),
    improve_examples: z.array(z.string()).optional(),
    current_elements: z.array(z.string()).optional(),
  })
  .passthrough();

const ImprovementPriority = z.enum(["low", "medium", "high", "critical"]);

const ParagraphImprovement = z
  .object({
    paragraph_index: z.number().int().gte(0),
    original_text: z.string(),
    improved_text: z.union([z.string(), z.null()]).optional(),
    improvements: z.array(z.string()).optional(),
    priority: ImprovementPriority,
    applicable_hooks: z.array(MediaHookType).optional(),
  })
  .passthrough();

const OverallAssessment = z
  .object({
    total_score: z.number().gte(0).lte(5),
    strengths: z.array(z.string()).optional(),
    weaknesses: z.array(z.string()).optional(),
    top_recommendations: z.array(z.string()).optional(),
    estimated_impact: z.string(),
  })
  .passthrough();

const PressReleaseAnalysisResponse = z
  .object({
    request_id: z.string(),
    analyzed_at: z.string().datetime({ offset: true }).optional(),
    media_hook_evaluations: z.array(MediaHookEvaluation).min(9).max(9),
    paragraph_improvements: z.array(ParagraphImprovement),
    overall_assessment: OverallAssessment,
    processing_time_ms: z.union([z.number(), z.null()]).optional(),
    ai_model_used: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();

const ValidationError = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();

const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();

export const schemas = {
  ImageData,
  PressReleaseInput,
  MediaHookType,
  EvaluationScore,
  MediaHookEvaluation,
  ImprovementPriority,
  ParagraphImprovement,
  OverallAssessment,
  PressReleaseAnalysisResponse,
  ValidationError,
  HTTPValidationError,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/analyze",
    alias: "analyze_press_release_analyze_post",
    description: `プレスリリースをメディアフックの観点から分析し、評価と改善点を構造化JSONで返すエンドポイント`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PressReleaseInput,
      },
    ],
    response: PressReleaseAnalysisResponse,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
