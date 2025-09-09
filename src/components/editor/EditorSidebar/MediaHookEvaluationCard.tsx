// To Do
//mediaHookEvaluation.improve_examples.mapのkeyにidを入れる

"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MediaHookEvaluation } from "@/types/api";

interface IssueCardProps {
  mediaHookEvaluation: MediaHookEvaluation;
  onClick: () => void;
}

export default function MediaHookEvaluationCard({ mediaHookEvaluation, onClick }: IssueCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-all duration-150 hover:bg-accent/50 hover:shadow-md active:scale-[0.98]"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          {mediaHookEvaluation.hook_name_ja}
          <span>{mediaHookEvaluation.score}点</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p>{mediaHookEvaluation.description}</p>
        <div className="flex flex-wrap gap-2">
          {mediaHookEvaluation.improve_examples?.map((improve_example, index) => (
            <Badge
              key={`${index}-${improve_example}`}
              className="max-w-full whitespace-normal break-words text-xs"
            >
              {improve_example}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
