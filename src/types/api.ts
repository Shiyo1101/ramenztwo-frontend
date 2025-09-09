import type z from "zod";
import type { schemas } from "./zod-schemas";

// zod schemaから使用する型を定義
export interface Company extends z.infer<typeof schemas.Company> {}

export interface PressRelease extends z.infer<typeof schemas.PressRelease> {}

export interface PressReleaseInput extends z.infer<typeof schemas.PressReleaseInput> {}

export type MediaHookType = z.infer<typeof schemas.MediaHookType>;

export type EvaluationScore = z.infer<typeof schemas.EvaluationScore>;

export interface MediaHookEvaluation extends z.infer<typeof schemas.MediaHookEvaluation> {}

export interface ParagraphImprovement extends z.infer<typeof schemas.ParagraphImprovement> {}

export interface OverallAssessment extends z.infer<typeof schemas.OverallAssessment> {}

export interface PressReleaseAnalysisResponse
  extends z.infer<typeof schemas.PressReleaseAnalysisResponse> {}
