"use client";

import { AlertCircle, ArrowDown, CheckCircle2, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ParagraphImprovement } from "@/types/api";

interface IssueCardProps {
  paragraphImprovement: ParagraphImprovement;
  onClick: () => void;
}

// 優先度に応じたアイコンと色を返す関数
function getPriorityInfo(priority: string) {
  switch (priority.toLowerCase()) {
    case "high":
      return {
        icon: AlertCircle,
        color: "text-red-500",
        label: "高優先度",
        variant: "destructive" as const,
      };
    case "medium":
      return {
        icon: Info,
        color: "text-yellow-500",
        label: "中優先度",
        variant: "secondary" as const,
      };
    case "low":
      return {
        icon: CheckCircle2,
        color: "text-blue-500",
        label: "低優先度",
        variant: "outline" as const,
      };
    default:
      return {
        icon: Info,
        color: "text-gray-500",
        label: priority,
        variant: "outline" as const,
      };
  }
}

export default function ParagraphImprovementCard({
  paragraphImprovement,
  onClick,
}: IssueCardProps) {
  const priorityInfo = getPriorityInfo(paragraphImprovement.priority);
  const PriorityIcon = priorityInfo.icon;

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-all duration-150 hover:bg-accent/50 hover:shadow-md active:scale-[0.98]"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <PriorityIcon className={`h-4 w-4 ${priorityInfo.color}`} />
            <span>段落 {paragraphImprovement.paragraph_index + 1} の改善提案</span>
          </div>
          <Badge variant={priorityInfo.variant} className="text-xs">
            {priorityInfo.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="grid gap-3">
          <div className="relative rounded-md border border-muted-foreground/20 bg-muted/30 p-3">
            <Badge variant="outline" className="-top-2 absolute left-2 bg-background text-xs">
              改善前
            </Badge>
            <p className="mt-1 line-clamp-3 text-xs">{paragraphImprovement.original_text}</p>
          </div>

          {paragraphImprovement.improved_text && (
            <div className="flex justify-center">
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            </div>
          )}

          {paragraphImprovement.improved_text && (
            <div className="relative rounded-md border border-green-500/30 bg-green-50 p-3">
              <Badge
                variant="default"
                className="-top-2 absolute left-2 bg-green-600 text-white text-xs"
              >
                改善後
              </Badge>
              <p className="mt-1 line-clamp-3 text-xs">{paragraphImprovement.improved_text}</p>
            </div>
          )}
        </div>

        {paragraphImprovement.improvements && paragraphImprovement.improvements.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="font-medium text-muted-foreground text-xs">改善ポイント:</p>
            <div className="flex flex-wrap gap-1">
              {paragraphImprovement.improvements.map((improvement, index) => (
                <Badge
                  key={`${index}-${improvement}`}
                  variant="secondary"
                  className="max-w-full whitespace-normal break-words text-xs"
                >
                  {improvement}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {paragraphImprovement.applicable_hooks &&
          paragraphImprovement.applicable_hooks.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="font-medium text-muted-foreground text-xs">関連するメディアフック:</p>
              <div className="flex flex-wrap gap-1">
                {paragraphImprovement.applicable_hooks.map((hook, index) => (
                  <Badge key={`${index}-${hook}`} variant="outline" className="text-xs">
                    {hook}
                  </Badge>
                ))}
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
