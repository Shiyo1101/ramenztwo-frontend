"use client";

import type { Editor } from "@tiptap/react";
import { jumpToPosition } from "@/lib/editor-utils";
import type {
  MediaHookEvaluation,
  ParagraphImprovement,
  PressReleaseAnalysisResponse,
} from "@/types/api";
import MediaHookEvaluationCard from "./MediaHookEvaluationCard";
import ParagraphImprovementCard from "./ParagraphImprovementCard";

interface IssueListProps {
  editor: Editor | null;
  analysisResponse: PressReleaseAnalysisResponse | undefined;
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
          key={mediaHookEvaluation.id}
          mediaHookEvaluation={mediaHookEvaluation}
          onClick={() => handleMHEClick(mediaHookEvaluation)}
        />
      ))}
      {analysisResponse?.paragraph_improvements?.map((paragraphImprovement) => (
        <ParagraphImprovementCard
          key={paragraphImprovement.paragraph_index}
          paragraphImprovement={paragraphImprovement}
          onClick={() => handlePIClick(paragraphImprovement)}
        />
      ))}
    </div>
  );
}
