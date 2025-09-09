"use server";

import type z from "zod";
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

    console.log(JSON.stringify(data, null, 2));

    return {
      data,
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
