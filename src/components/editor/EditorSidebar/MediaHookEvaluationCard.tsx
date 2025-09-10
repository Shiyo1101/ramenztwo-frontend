"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MediaHookEvaluation } from "@/types/api";

interface IssueCardProps {
  mediaHookEvaluation: MediaHookEvaluation;
  onClick: () => void;
}

// スコアに応じた色を返す関数
function getScoreColor(score: number): string {
  switch (score) {
    case 5:
      return "text-green-600 dark:text-green-400";
    case 4:
      return "text-blue-600 dark:text-blue-400";
    case 3:
      return "text-yellow-600 dark:text-yellow-400";
    case 2:
      return "text-orange-600 dark:text-orange-400";
    case 1:
      return "text-red-600 dark:text-red-400";
    default:
      return "text-muted-foreground";
  }
}

// スコアに応じたバッジの色を返す関数
function getScoreBadgeVariant(score: number): "default" | "secondary" | "destructive" | "outline" {
  if (score >= 4) return "default";
  if (score === 3) return "secondary";
  if (score <= 2) return "destructive";
  return "outline";
}

export default function MediaHookEvaluationCard({ mediaHookEvaluation, onClick }: IssueCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-all duration-150 hover:bg-accent/50 hover:shadow-md active:scale-[0.98]"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex-1">{mediaHookEvaluation.hook_name_ja}</span>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${
                    star <= mediaHookEvaluation.score
                      ? getScoreColor(mediaHookEvaluation.score)
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <Badge
              variant={getScoreBadgeVariant(mediaHookEvaluation.score)}
              className="min-w-[3rem] justify-center"
            >
              {mediaHookEvaluation.score}/5
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-muted-foreground text-sm">{mediaHookEvaluation.description}</p>

        {mediaHookEvaluation.current_elements &&
          mediaHookEvaluation.current_elements.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="font-medium text-muted-foreground text-xs">評価ポイント:</p>
              <div className="flex flex-wrap gap-1">
                {mediaHookEvaluation.current_elements.map((element, index) => (
                  <Badge
                    key={`${index}-${element}`}
                    variant="default"
                    className="bg-green-50 text-muted-foreground text-xs"
                  >
                    {element}
                  </Badge>
                ))}
              </div>
            </div>
          )}

        {mediaHookEvaluation.improve_examples &&
          mediaHookEvaluation.improve_examples.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="font-medium text-muted-foreground text-xs">改善提案:</p>
              <div className="flex flex-wrap gap-1">
                {mediaHookEvaluation.improve_examples.map((example, index) => (
                  <Badge
                    key={`${index}-${example}`}
                    variant="secondary"
                    className="max-w-full whitespace-normal break-words text-xs"
                  >
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
