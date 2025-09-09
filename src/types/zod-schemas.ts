import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Company = z
  .object({
    company_id: z.number().int(),
    company_name: z.string(),
    president_name: z.union([z.string(), z.null()]).optional(),
    address: z.union([z.string(), z.null()]).optional(),
    phone: z.union([z.string(), z.null()]).optional(),
    description: z.union([z.string(), z.null()]).optional(),
    industry: z.union([z.string(), z.null()]).optional(),
    ipo_type: z.union([z.string(), z.null()]).optional(),
    capital: z.union([z.number(), z.null()]).optional(),
    foundation_date: z.union([z.string(), z.null()]).optional(),
    url: z.union([z.string(), z.null()]).optional(),
    twitter_screen_name: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();
const from_date = z.union([z.string(), z.null()]).optional();
const PressRelease = z
  .object({
    company_name: z.string(),
    company_id: z.number().int(),
    release_id: z.number().int(),
    title: z.string(),
    subtitle: z.union([z.string(), z.null()]).optional(),
    url: z.string(),
    lead_paragraph: z.union([z.string(), z.null()]).optional(),
    body: z.union([z.string(), z.null()]).optional(),
    main_image: z.union([z.string(), z.null()]).optional(),
    main_image_fastly: z.union([z.string(), z.null()]).optional(),
    main_category_id: z.union([z.number(), z.null()]).optional(),
    main_category_name: z.union([z.string(), z.null()]).optional(),
    sub_category_id: z.union([z.number(), z.null()]).optional(),
    sub_category_name: z.union([z.string(), z.null()]).optional(),
    release_type: z.union([z.string(), z.null()]).optional(),
    created_at: z.string(),
    like: z.union([z.number(), z.null()]).optional(),
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
const ImageData = z
  .object({
    url: z.union([z.string(), z.null()]),
    base64_data: z.union([z.string(), z.null()]),
    mime_type: z.union([z.string(), z.null()]),
    alt_text: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const MetadataInput = z
  .object({ persona: z.string().default("指定なし") })
  .partial()
  .passthrough();
const PressReleaseInput = z
  .object({
    title: z.string().min(1).max(200),
    top_image: z.union([ImageData, z.null()]).optional(),
    content_markdown: z.string().min(1),
    metadata: MetadataInput,
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

export const schemas = {
  Company,
  from_date,
  PressRelease,
  ValidationError,
  HTTPValidationError,
  ImageData,
  MetadataInput,
  PressReleaseInput,
  MediaHookType,
  EvaluationScore,
  MediaHookEvaluation,
  ImprovementPriority,
  ParagraphImprovement,
  OverallAssessment,
  PressReleaseAnalysisResponse,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/analyze",
    alias: "analyze_press_release_analyze_post",
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
  {
    method: "get",
    path: "/companies",
    alias: "get_companies_companies_get",
    requestFormat: "json",
    response: z.array(Company),
  },
  {
    method: "get",
    path: "/companies/:company_id/releases",
    alias: "get_company_releases_companies__company_id__releases_get",
    requestFormat: "json",
    parameters: [
      {
        name: "company_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "from_date",
        type: "Query",
        schema: from_date,
      },
      {
        name: "to_date",
        type: "Query",
        schema: from_date,
      },
    ],
    response: z.array(PressRelease),
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
