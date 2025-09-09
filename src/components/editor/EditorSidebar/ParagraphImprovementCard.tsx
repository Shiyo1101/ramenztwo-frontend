// To Do
// paragraphImprovement.improvements.mapのkeyにidを入れる

"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ParagraphImprovement } from "@/types/api";

interface IssueCardProps {
  paragraphImprovement: ParagraphImprovement;
  onClick: () => void;
}

export default function ParagraphImprovementCard({
  paragraphImprovement,
  onClick,
}: IssueCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-all duration-150 hover:bg-accent/50 hover:shadow-md active:scale-[0.98]"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          文章の改善案<span> 0</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 py-0">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[16px]">元の文章</p>
            <p className="text-[12px]">{paragraphImprovement.original_text}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[16px]">修正後の文章</p>
            <p className="text-[12px]">{paragraphImprovement.improved_text}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {paragraphImprovement.improvements?.map((improvement, index) => (
            <Badge
              key={`${index}-${improvement}`}
              className="max-w-full whitespace-normal break-words text-xs"
            >
              {improvement}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
