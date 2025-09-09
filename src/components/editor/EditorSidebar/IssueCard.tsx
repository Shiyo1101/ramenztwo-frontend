"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { EditorIssue } from "@/types/editor";

interface IssueCardProps {
  issue: EditorIssue;
  onClick: () => void;
}

export default function IssueCard({ issue, onClick }: IssueCardProps) {
  const getIssueTypeColor = (type: string) => {
    switch (type) {
      case "誤字脱字":
        return "destructive";
      case "表記ゆれ":
        return "secondary";
      case "冗長表現":
        return "outline";
      case "文法":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-all duration-150 hover:bg-accent/50 hover:shadow-md active:scale-[0.98]"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span>
            {issue.id}. {issue.type}
          </span>
          <Badge variant={getIssueTypeColor(issue.type)} className="text-xs">
            {issue.type}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-0">
        <p className="text-muted-foreground text-sm leading-relaxed">{issue.message}</p>
        {issue.suggestion && (
          <div className="mt-2 rounded-md bg-muted/50 p-2">
            <p className="font-medium text-foreground text-sm">提案: {issue.suggestion}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-4 pt-3 text-muted-foreground text-xs">
        <span>開始: {issue.position.start}</span>
        <span>終了: {issue.position.end}</span>
      </CardFooter>
    </Card>
  );
}
