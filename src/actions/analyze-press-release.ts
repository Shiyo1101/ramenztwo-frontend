"use server";

import type z from "zod";
import type { AnalysisResponse } from "@/types/editor";
import { schemas } from "@/types/zod-schemas";

export async function analyzePressReleaseAction(value: z.infer<typeof schemas.PressReleaseInput>) {
  const validatedFields = schemas.PressReleaseInput.safeParse(value);

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error.errors);
    return { error: "入力データの検証に失敗しました。" };
  }

  try {
    const apiUrl = process.env.API_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${apiUrl}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`APIエラー: ${response.status} - ${JSON.stringify(errorData.detail)}`);
    }

    const data: z.infer<typeof schemas.PressReleaseAnalysisResponse> = await response.json();

    const convertDataToAnalysisResponse: AnalysisResponse = {
      request_id: data.request_id,
      analyzed_at: data.analyzed_at || "",
      processing_time_ms: data.processing_time_ms ?? 0,
      ai_model_used: data.ai_model_used || "",
      media_hook_evaluations: data.media_hook_evaluations,
      paragraph_improvements: data.paragraph_improvements.map((improvement) => ({
        ...improvement,
        improved_text: improvement.improved_text || null, // Ensure null compatibility
        improvements: improvement.improvements || [], // Ensure empty array
        applicable_hooks: improvement.applicable_hooks || [], // Ensure empty array
      })),
      overall_assessment: {
        ...data.overall_assessment,
        strengths: data.overall_assessment.strengths || [],
        weaknesses: data.overall_assessment.weaknesses || [],
        top_recommendations: data.overall_assessment.top_recommendations || [],
      },
    };

    return {
      ...convertDataToAnalysisResponse,
      success: "解析に成功しました",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("通信エラー:", error.message);
      return { error: error.message };
    }

    console.error("予期せぬエラー:", error);
    return { error: "分析中に予期せぬエラーが発生しました。" };
  }
}
