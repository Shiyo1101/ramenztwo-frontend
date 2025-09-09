"use client";

import { AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { OverallAssessment } from "@/types/api";

interface OverallAssessmentCardProps {
  assessment: OverallAssessment;
}

export default function OverallAssessmentCard({ assessment }: OverallAssessmentCardProps) {
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-3">
        {assessment.strengths && assessment.strengths.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="font-medium text-muted-foreground text-xs">強み</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {assessment.strengths.map((strength, index) => (
                <Badge
                  key={`${index}-${strength}`}
                  variant="outline"
                  className="border-green-200 bg-green-50/50 text-xs dark:border-green-800 dark:bg-green-950/20"
                >
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {assessment.weaknesses && assessment.weaknesses.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <span className="font-medium text-muted-foreground text-xs">改善が必要な点</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {assessment.weaknesses.map((weakness, index) => (
                <Badge
                  key={`${index}-${weakness}`}
                  variant="outline"
                  className="border-orange-200 bg-orange-50/50 text-xs dark:border-orange-800 dark:bg-orange-950/20"
                >
                  {weakness}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {assessment.top_recommendations && assessment.top_recommendations.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-muted-foreground text-xs">優先改善提案</span>
            </div>
            <ul className="space-y-1">
              {assessment.top_recommendations.map((recommendation, index) => (
                <li key={`${index}-${recommendation}`} className="flex items-start gap-2 text-xs">
                  <span className="mt-0.5 text-blue-600 dark:text-blue-400">•</span>
                  <span className="flex-1 text-muted-foreground">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
