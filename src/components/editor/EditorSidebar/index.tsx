"use client";

import type { Editor } from "@tiptap/react";
import { Badge } from "@/components/ui/badge";
import type { EditorIssue } from "@/types/editor";
import IssueList from "./IssueList";

interface EditorSidebarProps {
  editor: Editor | null;
  issues: EditorIssue[];
}

export default function EditorSidebar({ editor, issues }: EditorSidebarProps) {
  const issueCount = issues.length;
  const issueTypes = [...new Set(issues.map((issue) => issue.type))];

  return (
    <div className="flex h-full flex-col">
      {/* ヘッダー */}
      <div className="border-b bg-background p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold text-lg">指摘事項</h2>
          <Badge variant="secondary">{issueCount}件</Badge>
        </div>
        {issueTypes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {issueTypes.map((type) => (
              <Badge key={type} variant="outline" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* 指摘リスト */}
      <div className="flex-1">
        <IssueList editor={editor} issues={issues} />
      </div>
    </div>
  );
}
