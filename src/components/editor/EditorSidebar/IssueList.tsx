"use client";

import type { Editor } from "@tiptap/react";
import { InfoIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
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
  const handleMHEClick = (_mediaHookEvaluation: MediaHookEvaluation) => {
    // メディアフック評価は全体的な評価なので、エディタ内の特定位置にジャンプしない
  };

  const handlePIClick = (paragraphImprovement: ParagraphImprovement) => {
    jumpToPosition(editor, paragraphImprovement.original_text);
  };

  if (!analysisResponse) {
    return null;
  }

  const hasMediaHooks = analysisResponse.media_hook_evaluations?.length > 0;
  const hasParagraphImprovements = analysisResponse.paragraph_improvements?.length > 0;

  if (!hasMediaHooks && !hasParagraphImprovements) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <p className="text-sm">改善提案はありません</p>
      </div>
    );
  }

  // 優先度でソート（高優先度を上に表示）
  const sortedParagraphImprovements = [...(analysisResponse.paragraph_improvements || [])].sort(
    (a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return (
        (priorityOrder[a.priority as keyof typeof priorityOrder] || 2) -
        (priorityOrder[b.priority as keyof typeof priorityOrder] || 2)
      );
    },
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      {hasMediaHooks && (
        <>
          <div className="sticky top-0 z-10 flex items-center gap-1 bg-background pb-2">
            <h3 className="font-medium text-muted-foreground text-sm">
              メディアフック評価（9つの観点）
            </h3>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="インフォメーション"
                  className="flex items-center rounded p-2"
                >
                  <InfoIcon className="h-5 w-5 text-blue-600" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={8}
                className="w-80 rounded-md border bg-white p-3 shadow-md sm:w-96"
              >
                <div className="space-y-2 text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <InfoIcon className="h-4 w-4 text-blue-600" />
                    <p className="font-semibold text-gray-900">メディアの視点：9つのフック</p>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    メディアフックは、メディアがニュースとして取り上げたくなる
                    「ニュース価値」を指します。次の9要素を意識しましょう。
                  </p>
                  <ol className="grid list-decimal grid-cols-1 gap-x-4 gap-y-1 pl-5 text-[13px] sm:grid-cols-2">
                    <li>時流・季節性</li> <li>意外性</li> <li>逆説・対立</li> <li>地域性</li>
                    <li>話題性</li> <li>社会性・公益性</li> <li>新規性・独自性</li>
                    <li>最上級・希少性</li> <li>画像・映像</li>
                  </ol>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-3">
            {analysisResponse.media_hook_evaluations?.map((mediaHookEvaluation) => (
              <MediaHookEvaluationCard
                key={mediaHookEvaluation.id}
                mediaHookEvaluation={mediaHookEvaluation}
                onClick={() => handleMHEClick(mediaHookEvaluation)}
              />
            ))}
          </div>
        </>
      )}

      {hasMediaHooks && hasParagraphImprovements && <Separator className="my-2" />}

      {hasParagraphImprovements && (
        <>
          <div className="sticky top-0 z-10 bg-background pb-2">
            <h3 className="font-medium text-muted-foreground text-sm">
              文章の改善提案（{sortedParagraphImprovements.length}件）
            </h3>
          </div>
          <div className="grid gap-3">
            {sortedParagraphImprovements.map((paragraphImprovement) => (
              <ParagraphImprovementCard
                key={paragraphImprovement.paragraph_index}
                paragraphImprovement={paragraphImprovement}
                onClick={() => handlePIClick(paragraphImprovement)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
