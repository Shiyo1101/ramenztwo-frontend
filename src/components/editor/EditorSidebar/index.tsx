"use client";

import type { Editor } from "@tiptap/react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PressReleaseAnalysisResponse } from "@/types/api";
import IssueList from "./IssueList";
import OverallAssessmentCard from "./OverallAssessmentCard";

interface EditorSidebarProps {
  editor: Editor | null;
  analysisResponse: PressReleaseAnalysisResponse | undefined;
}

export default function EditorSidebar({ editor, analysisResponse }: EditorSidebarProps) {
  // 解析が完了していない場合は表示しない
  if (!analysisResponse) {
    return null;
  }

  const totalIssueCount =
    (analysisResponse.media_hook_evaluations?.length || 0) +
    (analysisResponse.paragraph_improvements?.length || 0);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-background p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold text-lg">解析結果</h2>
          <Badge variant="secondary">{totalIssueCount}件の提案</Badge>
        </div>
        {analysisResponse.overall_assessment && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">総合評価:</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => {
                const key = `overall-assessment-star-${analysisResponse.overall_assessment.total_score}-${i}`;
                return (
                  <span
                    key={key}
                    className={`text-lg ${
                      i < analysisResponse.overall_assessment.total_score
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                );
              })}
            </div>
            <span className="font-medium text-sm">
              {analysisResponse.overall_assessment.total_score.toFixed(1)}/5.0
            </span>
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-2 text-muted-foreground text-xs">
          <span>解析時間: {analysisResponse.processing_time_ms}ms</span>
          {analysisResponse.ai_model_used && <span>モデル: {analysisResponse.ai_model_used}</span>}
        </div>
      </div>
      <ScrollArea className="h-full max-h-[80vh]">
        {analysisResponse.overall_assessment && (
          <div className="border-b bg-muted/30 p-4">
            <OverallAssessmentCard assessment={analysisResponse.overall_assessment} />
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          <IssueList editor={editor} analysisResponse={analysisResponse} />
        </div>
      </ScrollArea>
    </div>
  );
}
