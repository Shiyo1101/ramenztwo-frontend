"use client";

import type { Editor } from "@tiptap/react";
import { jumpToPosition } from "@/lib/editor-utils";
import type { AnalysisResponse, MediaHookEvaluation, ParagraphImprovement } from "@/types/editor";
import MediaHookEvaluationCard from "./MediaHookEvaluationCard";
import ParagraphImprovementCard from "./ParagraphImprovementCard";

interface IssueListProps {
  editor: Editor | null;
  analysisResponse: AnalysisResponse | undefined;
}

export default function IssueList({ editor, analysisResponse }: IssueListProps) {
  const handleMHEClick = (_mediaHookEvaluation: MediaHookEvaluation) => {};
  const handlePIClick = (paragraphImprovement: ParagraphImprovement) => {
    jumpToPosition(editor, paragraphImprovement.original_text);
  };

  if (analysisResponse?.paragraph_improvements.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <p className="text-sm">指摘事項はありません</p>
      </div>
    );
  }

  return (
    <div className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto p-4">
      {analysisResponse?.media_hook_evaluations?.map((mediaHookEvaluation) => (
        <MediaHookEvaluationCard
          key={0}
          mediaHookEvaluation={mediaHookEvaluation}
          onClick={() => handleMHEClick(mediaHookEvaluation)}
        />
      ))}
      {analysisResponse?.paragraph_improvements?.map((paragraphImprovement) => (
        <ParagraphImprovementCard
          key={0}
          paragraphImprovement={paragraphImprovement}
          onClick={() => handlePIClick(paragraphImprovement)}
        />
      ))}
    </div>
  );
}
